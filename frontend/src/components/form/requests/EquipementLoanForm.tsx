import React, { useCallback, useMemo, useState } from 'react';
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


const initialLoadingState = {
  categories: false,
  equipments: false
};

const EquipmentLoanForm: React.FC = () => {
  const { control, formState: { errors }, setValue, trigger } = useFormContext();
  const equipmentService = useMemo(() => new EquipmentService(), []);

  // États consolidés
  const [categories, setCategories] = useState<EquipmentCategory[]>([]);
  const [equipments, setEquipments] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(initialLoadingState);


  const [selectedType, setSelectedType] = useState<EquipmentType | null>(null);

  // Utilisation de useWatch pour obtenir les valeurs actuelles du formulaire
  const selectedCategoryId = useWatch({ control, name: 'categoryId' });
  const selectedEquipmentId = useWatch({ control, name: 'equipmentId' });

  // Mémorisation des listes filtrées pour éviter les recalculs inutiles
  const filteredCategories = useMemo(() => {
    if (!selectedType) return [];

    return categories.filter(cat => cat.type == selectedType);
  }, [categories, selectedType]);

  const filteredEquipments = useMemo(async () => {
    if (!selectedCategoryId) return [];
    const response = await equipmentService.getEquipmentsByCategory(selectedCategoryId);
    const equipments = response.data;
    setEquipments(equipments);
  }, [selectedCategoryId]);

  const maxQuantity = useMemo(() => {
    if (!selectedCategoryId) return null;
    const category = categories.find(cat => cat.id === selectedCategoryId);
    return category?.quantity || null;
  }, [selectedCategoryId, categories]);

  // Fonctions de fetch optimisées
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, categories: true }));
      const response = await equipmentService.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(prev => ({ ...prev, categories: false }));
    }
  }, [equipmentService]);

  const fetchEquipmentsByCategoryId = useCallback(async (categoryId: string) => {
    if (!categoryId) {
      setEquipments([]);
      return;
    }

    try {
      setLoading(prev => ({ ...prev, equipments: true }));

      const response = await equipmentService.getEquipmentsByCategory(categoryId);
      console.log("response", response);
      setEquipments(response.data);
    } catch (error) {
      console.error('Failed to fetch equipments:', error);
    } finally {
      setLoading(prev => ({ ...prev, equipments: false }));
    }
  }, [equipmentService]);

  // Gestionnaires d'événements
  const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {

    const newType = e.target.value as EquipmentType;
    console.log("valeur", newType);
    setSelectedType(newType || null);
    setValue('categoryId', '');
    setValue('equipmentId', '');
    setValue('quantity', 1);
  }, [setValue]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    if (categoryId) {
      setValue('equipmentId', '');
      fetchEquipmentsByCategoryId(categoryId);
      trigger('quantity');
    } else {
      setEquipments([]);
    }
  }, [setValue, fetchEquipmentsByCategoryId, trigger]);

  // Handler pour la quantité avec validation
  const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = value === '' ? 0 : Number(value);

    if (maxQuantity !== null && numValue > maxQuantity) {
      setValue('quantity', maxQuantity);
    } else {
      setValue('quantity', numValue > 0 ? numValue : (value === '' ? '' : 0));
    }

    if (errors.quantity) {
      trigger('quantity');
    }
  }, [maxQuantity, setValue, trigger, errors.quantity]);

  // Effet pour charger les catégories au chargement du composant
  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Effet pour gérer les changements de catégorie
  React.useEffect(() => {
    if (selectedCategoryId) {
      handleCategoryChange(selectedCategoryId);
    }
  }, [selectedCategoryId, handleCategoryChange]);

  // Fonction utilitaire pour les classes CSS
  const getFieldClass = useCallback((fieldName: string) => {
    return errors[fieldName] ? 'border-red-500 focus:border-red-500' : '';
  }, [errors]);

  // Création d'un composant pour les champs de date pour éviter la duplication
  const DateField = useCallback(({ name, label }: { name: string, label: string }) => (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type="date"
                {...field}
                className={getFieldClass(name)}
              />
              <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ), [control, getFieldClass]);

  return (
    <div className="space-y-4">
      {/* Type selection */}
      <FormItem>
        <FormLabel>Type de matériel</FormLabel>
        <FormControl>
          <select
            value={selectedType || ''}
            onChange={handleTypeChange}
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all"
          >
            <option value="">-- Choisir le type de matériel --</option>
            {Object.entries(EquipmentTypeList).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </FormControl>
        <FormMessage />
      </FormItem>

      {/* Category selection */}
      <FormField
        control={control}
        name="categoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Catégorie*</FormLabel>
            <FormControl>
              <div className="relative">
                <select
                  {...field}
                  disabled={loading.categories || !selectedType}
                  className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${getFieldClass('categoryId')} ${loading.categories ? 'opacity-50' : ''}`}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                >
                  <option value="">-- Choisir une catégorie --</option>
                  {filteredCategories.map(category => (
                    <option
                      key={category.id}
                      value={category.id}
                      disabled={category.quantity <= 0}
                    >
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

      {/* Equipment selection - only shown when category is selected */}
      {selectedCategoryId && (
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
                    {equipments.length > 0 ? (
                      equipments.map(equipment => (
                        <option key={equipment.id} value={equipment.id}>
                          {equipment.name} {equipment.specifications &&
                            Object.entries(equipment.specifications)
                              .filter(([_, value]) => value !== null && value !== undefined)
                              .length > 0 ?
                            `(${Object.entries(equipment.specifications)
                              .filter(([_, value]) => value !== null && value !== undefined)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(', ')})` : ''}
                        </option>
                      ))
                    ) : (
                      <option disabled value="">Aucun matériel disponible</option>
                    )}
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

      {/* Quantity field */}
      <FormField
        control={control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Quantité* {maxQuantity !== null && `(Maximum disponible: ${maxQuantity})`}
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min={1}
                max={maxQuantity || undefined}
                {...field}
                onChange={handleQuantityChange}
                onBlur={() => trigger('quantity')}
                value={field.value === 0 ? '' : field.value}
                className={getFieldClass('quantity')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Date fields - using our reusable component */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateField name="startDate" label="Date de début" />
        <DateField name="endDate" label="Date de fin" />
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