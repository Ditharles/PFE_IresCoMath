import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Calendar, Loader2 } from 'lucide-react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { EquipmentType, EquipmentTypeList } from '../../../types/request';
import EquipmentService from '../../../services/equipment.service';


interface EquipmentCategory {
  id: string;
  name: string;
  type: EquipmentType;
  quantity: number;
}

interface EquipmentItem {
  id: string;
  name: string;
  categoryId: string;
  specifications: Record<string, unknown>;
}

const EquipmentLoanForm: React.FC = () => {
  const { control, formState: { errors }, setValue, trigger } = useFormContext();

  // State for categories and equipments
  const [categories, setCategories] = useState<EquipmentCategory[]>([]);
  const [equipments, setEquipments] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState({
    categories: false,
    equipments: false
  });
  const equipmentService = new EquipmentService();

  const selectedType = useWatch({ control, name: 'equipmentType' });
  const selectedCategoryId = useWatch({ control, name: 'categoryId' });
  const selectedEquipmentId = useWatch({ control, name: 'equipmentId' });

  //filtre les categories par type
  const filteredCategories = useMemo(() => {
    if (!selectedType) return [];
    return categories.filter(cat => cat.type === selectedType);
  }, [categories, selectedType]);

  // equipement 
  const filteredEquipments = useMemo(() => {
    if (!selectedCategoryId) return [];
    return equipments.filter(eq => eq.categoryId === selectedCategoryId);
  }, [equipments, selectedCategoryId]);

  // quantitié maximum d'une catéguorie d'objets 
  const maxQuantity = useMemo(() => {
    if (selectedEquipmentId) {
      // If specific equipment is selected, get its available quantity
      // This would need to be fetched from the API in a real scenario
      return null; // Placeholder - implement based on your API
    } else if (selectedCategoryId) {
      const category = categories.find(cat => cat.id === selectedCategoryId);
      return category?.quantity || null;
    }
    return null;
  }, [selectedCategoryId, selectedEquipmentId, categories]);

  // Fetch all categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(prev => ({ ...prev, categories: true }));
        const response = await equipmentService.getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(prev => ({ ...prev, categories: false }));
      }
    };

    fetchCategories();
  }, []);

  // Fetch equipments when type changes
  useEffect(() => {
    const fetchEquipments = async () => {
      if (!selectedType) {
        setEquipments([]);
        return;
      }

      try {
        setLoading(prev => ({ ...prev, equipments: true }));
        const response = await api.get(`/equipment/type/${selectedType}`);
        setEquipments(response.data);
      } catch (error) {
        console.error('Failed to fetch equipments:', error);
      } finally {
        setLoading(prev => ({ ...prev, equipments: false }));
      }
    };

    fetchEquipments();
  }, [selectedType]);

  // Reset category and equipment when type changes
  useEffect(() => {
    setValue('categoryId', '');
    setValue('equipmentId', '');
  }, [selectedType, setValue]);

  // Reset equipment when category changes
  useEffect(() => {
    setValue('equipmentId', '');
  }, [selectedCategoryId, setValue]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = value === '' ? 0 : Number(value);

    if (maxQuantity !== null && numValue > maxQuantity) {
      setValue('quantity', maxQuantity);
    } else {
      setValue('quantity', value);
    }

    trigger('quantity');
  };

  const getFieldClass = (fieldName: string) => {
    return errors[fieldName] ? 'border-red-500 focus:border-red-500' : '';
  };

  return (
    <div className="space-y-4">
      {/* Type selection */}
      <FormField
        control={control}
        name="equipmentType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type de matériel</FormLabel>
            <FormControl>
              <select
                {...field}
                className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${getFieldClass('equipmentType')}`}
              >
                <option value="">-- Choisir le type de matériel --</option>
                {Object.entries(EquipmentTypeList).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Category selection - only shown when type is selected */}
      {selectedType && (
        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <div className="relative">
                  <select
                    {...field}
                    disabled={loading.categories}
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${getFieldClass('categoryId')} ${loading.categories ? 'opacity-50' : ''}`}
                  >
                    <option value="">-- Choisir une catégorie --</option>
                    {filteredCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.quantity} disponibles)
                      </option>
                    ))}
                  </select>
                  {loading.categories && (
                    <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin" />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Equipment selection - only shown when category is selected */}
      {selectedCategoryId && filteredEquipments.length > 0 && (
        <FormField
          control={control}
          name="equipmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matériel spécifique (optionnel)</FormLabel>
              <FormControl>
                <div className="relative">
                  <select
                    {...field}
                    disabled={loading.equipments}
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${getFieldClass('equipmentId')} ${loading.equipments ? 'opacity-50' : ''}`}
                  >
                    <option value="">-- Choisir un matériel spécifique --</option>
                    {filteredEquipments.map(equipment => (
                      <option key={equipment.id} value={equipment.id}>
                        {equipment.name} ({JSON.stringify(equipment.specifications)})
                      </option>
                    ))}
                  </select>
                  {loading.equipments && (
                    <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin" />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Quantity with max quantity indicator */}
      <FormField
        control={control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Quantité {maxQuantity !== null && `(Maximum disponible: ${maxQuantity})`}
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min={1}
                max={maxQuantity || undefined}
                {...field}
                onChange={handleQuantityChange}
                className={getFieldClass('quantity')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Date fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de début</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="date"
                    {...field}
                    className={getFieldClass('startDate')}
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
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
                <div className="relative">
                  <Input
                    type="date"
                    {...field}
                    className={getFieldClass('endDate')}
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Notes */}
      <FormField
        control={control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Commentaire</FormLabel>
            <FormControl>
              <Textarea
                rows={3}
                {...field}
                placeholder="Précisez ici toute information supplémentaire sur votre demande..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EquipmentLoanForm;