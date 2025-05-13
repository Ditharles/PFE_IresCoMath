import React, { useEffect, useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { FileImage, X, Plus, Link, Trash2 } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import FileUpload from '../../FileUpload';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { EquipmentType, EquipmentTypeList } from '../../../types/request';
import Specifications from './Specifications';

interface EquipmentItemState {
  uploadedPhotos: string[];
}

const EquipmentPurchaseForm: React.FC = () => {
  const { control, setValue, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  // État pour gérer les photos de chaque équipement
  const [equipmentStates, setEquipmentStates] = useState<Record<number, EquipmentItemState>>(() => {
    // Initialisation avec un matériel par défaut
    return {
      0: {
        uploadedPhotos: []
      }
    };
  });

  // Ajout d'un matériel par défaut au montage du composant
  useEffect(() => {
    if (fields.length === 0) {
      append({
        equipmentType: '',
        name: '',
        specifications: {},
        quantity: 1,
        costEstimation: '0',
        productUrl: '',
        photo: '',
        notes: ''
      });
    }
  }, [append, fields.length]);

  const getFieldClass = (fieldName: string, index: number) => {
    const fieldError = (errors.items as Array<Record<string, unknown>> | undefined)?.[index]?.[fieldName];
    return fieldError ? 'border-red-500 focus:border-red-500' : '';
  };

  const addNewEquipment = () => {
    const newIndex = fields.length;
    append({
      equipmentType: '',
      name: '',
      specifications: {},
      quantity: 1,
      costEstimation: '0',
      productUrl: '',
      photo: '',
      notes: ''
    });

    
    setEquipmentStates(prev => ({
      ...prev,
      [newIndex]: {
        uploadedPhotos: []
      }
    }));
  };

  const handlePhotosUpload = (index: number, fileUrls: string[] | string) => {
    const urls = Array.isArray(fileUrls) ? fileUrls : [fileUrls];
    const newPhotos = [...equipmentStates[index].uploadedPhotos, ...urls].slice(0, 5);

    setEquipmentStates(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        uploadedPhotos: newPhotos
      }
    }));

    setValue(`items[${index}].photo`, newPhotos[0]);
  };

  const removePhoto = (index: number, photoIndex: number) => {
    const newPhotos = equipmentStates[index].uploadedPhotos.filter((_, i) => i !== photoIndex);

    setEquipmentStates(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        uploadedPhotos: newPhotos
      }
    }));

    setValue(`items[${index}].photo`, newPhotos[0] || '');
  };

  const handleSpecificationsChange = (index: number, specObject: Record<string, string>) => {
    setValue(`items[${index}].specifications`, specObject);
  };

  return (
    <div className="space-y-8">
      {fields.map((field, index) => (
        <div key={field.id} className="border rounded-lg p-6 space-y-6 relative">
          {/* Bouton de suppression pour tous les matériels */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              remove(index);
              // Suppression de l'état associé
              setEquipmentStates(prev => {
                const newStates = { ...prev };
                delete newStates[index];
                return newStates;
              });
            }}
            className="absolute top-2 right-2 text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          {/* Titre sans numérotation pour le premier, avec numérotation pour les suivants */}
          <h3 className="text-lg font-medium">
            {fields.length === 1 ? "Matériel" : `Matériel #${index + 1}`}
          </h3>

          {/* Section Type et Nom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name={`items[${index}].equipmentType`}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Type de matériel *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={getFieldClass('equipmentType', index)}>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(EquipmentType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {EquipmentTypeList[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`items[${index}].name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du matériel *</FormLabel>
                  <FormControl>
                    <Input {...field} className={getFieldClass('name', index)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* URL du produit */}
          <FormField
            control={control}
            name={`items[${index}].productUrl`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lien vers le produit</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      {...field}
                      placeholder="https://example.com/produit"
                      className={`pl-10 ${getFieldClass('productUrl', index)}`}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Utilisation du composant Specifications autonome */}
          <Specifications
            onChange={(specObject) => handleSpecificationsChange(index, specObject)}
          />

          {/* Section Quantité et Coût */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name={`items[${index}].quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantité *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      className={getFieldClass('quantity', index)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`items[${index}].costEstimation`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimation de coût (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      {...field}
                      className={getFieldClass('costEstimation', index)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Section Photos */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Photos du matériel (max 5)</h3>
            <div className="space-y-4">
              {equipmentStates[index]?.uploadedPhotos?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {equipmentStates[index].uploadedPhotos.map((photo, photoIndex) => (
                    <div key={photoIndex} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <FileImage className="h-5 w-5 text-blue-500" />
                        <a
                          href={photo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Photo {photoIndex + 1}
                        </a>
                      </div>
                      <button
                        onClick={() => removePhoto(index, photoIndex)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {(!equipmentStates[index]?.uploadedPhotos || equipmentStates[index].uploadedPhotos.length < 5) && (
                <FileUpload
                  endpoint="equipmentPhotos"
                  maxFiles={5 - (equipmentStates[index]?.uploadedPhotos?.length || 0)}
                  acceptedTypes={['image/*']}
                  headerText={(equipmentStates[index]?.uploadedPhotos?.length || 0) === 0 ?
                    "Téléverser des photos du matériel" :
                    "Ajouter des photos supplémentaires"}
                  subHeaderText={`Formats JPG, PNG, etc. (${5 - (equipmentStates[index]?.uploadedPhotos?.length || 0)} max)`}
                  onFileUploaded={(urls) => handlePhotosUpload(index, urls)}
                />
              )}
            </div>
          </div>

          {/* Section Notes */}
          <FormField
            control={control}
            name={`items[${index}].notes`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes complémentaires</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={3}
                    placeholder="Ajoutez des notes ou commentaires supplémentaires..."
                    className={getFieldClass('notes', index)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addNewEquipment}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Ajouter un autre matériel
      </Button>
    </div>
  );
};

export default EquipmentPurchaseForm;