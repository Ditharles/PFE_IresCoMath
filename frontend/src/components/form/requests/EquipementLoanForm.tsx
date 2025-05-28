import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from '../../ui/form';
import { Loader2 } from 'lucide-react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import EquipmentService from '../../../services/equipment.service';
import { EquipmentType } from '../../../types/equipment';
import { DatePicker } from '../DatePicker';
import { EQUIPMENT_TYPE_LABELS } from '../../../constants/equipments';

interface EquipmentCategory {
  id: string;
  name: string;
  type: EquipmentType;
  quantity: number;
  equipments: EquipmentItem[];
}

interface EquipmentItem {
  id: string;
  name: string;
  specifications: Record<string, unknown>;
}

const EquipmentLoanForm: React.FC = () => {
  const { control, formState: { errors }, setValue, trigger } = useFormContext();
  const equipmentService = useMemo(() => new EquipmentService(), []);

  const [categories, setCategories] = useState<EquipmentCategory[]>([]);
  const [equipments, setEquipments] = useState<EquipmentItem[]>([]);
  const [isLoading, setIsLoading] = useState({
    categories: false,
    equipments: false
  });

  const selectedType = useWatch({ control, name: 'type' });
  const selectedCategoryId = useWatch({ control, name: 'categoryId' });
  const selectedEquipmentId = useWatch({ control, name: 'equipmentId' });

  const filteredCategories = useMemo(() => {
    if (!selectedType) return categories;
    return categories.filter(cat => cat.type === selectedType);
  }, [categories, selectedType]);

  const selectedCategory = useMemo(() =>
    categories.find(cat => cat.id === selectedCategoryId),
    [categories, selectedCategoryId]
  );

  const maxQuantity = selectedCategory?.quantity || null;

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(prev => ({ ...prev, categories: true }));
      const response = await equipmentService.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, categories: false }));
    }
  }, [equipmentService]);

  const handleTypeChange = useCallback((type: EquipmentType) => {
    setValue('categoryId', '');
    setValue('equipmentId', '');
    setValue('quantity', '');
    setEquipments([]);
  }, [setValue]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    if (!categoryId) {
      setEquipments([]);
      return;
    }

    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      setValue('type', category.type);
      setEquipments(category.equipments || []);
      setValue('equipmentId', '');
      trigger('quantity');
    }
  }, [categories, setValue, trigger]);

  const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value) || 0;

    if (maxQuantity && numValue > maxQuantity) {
      setValue('quantity', maxQuantity);
    } else {
      setValue('quantity', numValue > 0 ? numValue : '');
    }

    if (errors.quantity) {
      trigger('quantity');
    }
  }, [maxQuantity, setValue, trigger, errors.quantity]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="space-y-6">
      {/* Equipment Selection Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Sélection de l'équipement</h3>
        <div className='w-full space-y-2'>
          {/* Type selection */}
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type d'équipement</FormLabel>
                <Select
                  onValueChange={(value: EquipmentType) => {
                    field.onChange(value);
                    handleTypeChange(value);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(EQUIPMENT_TYPE_LABELS).map(([type, label]) => (
                      <SelectItem key={type} value={type}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </FormItem>
            )}
          />

          {/* Category selection */}
          <FormField
            control={control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie d'équipement</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCategoryChange(value);
                  }}
                  value={field.value}
                  disabled={isLoading.categories}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      {isLoading.categories ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Chargement...</span>
                        </div>
                      ) : (
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredCategories.map(category => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                        disabled={category.quantity <= 0}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className="text-muted-foreground ml-2">
                            {category.quantity} disponible{category.quantity > 1 ? 's' : ''}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </FormItem>
            )}
          />
        </div>



        {/* Equipment selection - only shown if category is selected */}
        {selectedCategoryId && (
          <FormField
            control={control}
            name="equipmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modèle spécifique (optionnel)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoading.equipments}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un modèle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {equipments.length > 0 ? (
                      equipments.map(equipment => (
                        <SelectItem key={equipment.id} value={equipment.id}>
                          <div>
                            <div className="font-medium">{equipment.name}</div>
                            {equipment.specifications && (
                              <div className="text-xs text-muted-foreground">
                                {Object.entries(equipment.specifications)
                                  .filter(([_, value]) => value != null)
                                  .map(([key, value]) => `${key}: ${value}`)
                                  .join(', ')}
                              </div>
                            )}
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="text-sm p-2 text-muted-foreground">
                        Aucun équipement disponible dans cette catégorie
                      </div>
                    )}
                  </SelectContent>
                </Select>

              </FormItem>
            )}
          />
        )}

        {/* Quantity field - only shown if category is selected */}
        {selectedCategoryId && (
          <FormField
            control={control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Quantité demandée {maxQuantity !== null && (
                    <span className="text-muted-foreground ml-2">
                      (Stock disponible: {maxQuantity})
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={maxQuantity || undefined}
                    {...field}
                    onChange={handleQuantityChange}
                    value={field.value}
                    placeholder="Nombre d'unités nécessaires"
                  />
                </FormControl>

              </FormItem>
            )}
          />
        )}
      </div>

      {/* Loan Period Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Période d'emprunt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de début</FormLabel>
                <FormControl>
                  <DatePicker
                    {...field}
                  />
                </FormControl>

              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de fin</FormLabel>
                <FormControl>
                  <DatePicker
                    {...field}
                  />
                </FormControl>

              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Informations complémentaires</h3>
        <FormField
          control={control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  rows={4}
                  {...field}
                  placeholder="Précisez ici toute information utile concernant votre demande..."
                  className="resize-none"
                />
              </FormControl>

            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default EquipmentLoanForm;