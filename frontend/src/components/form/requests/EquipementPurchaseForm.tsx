import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import FileUpload from '../../FileUpload';
import { FileText, X } from 'lucide-react';

const EquipmentPurchaseForm = () => {
  const { control, watch, setValue } = useFormContext();
  const photos = watch('photos') || [];

  const handlePhotosUpload = (fileUrl: string) => {
    setValue('photos', [...photos, fileUrl], { shouldValidate: true });
  };

  const removePhoto = (index: number) => {
    const updated = [...photos];
    updated.splice(index, 1);
    setValue('photos', updated, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom du matériel *</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type *</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantité *</FormLabel>
            <FormControl>
              <Input type="number" min={1} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Note</FormLabel>
            <FormControl>
              <Textarea rows={3} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Téléversement photos */}
      <div className="space-y-4">
        <FormLabel>Photos</FormLabel>

        <FileUpload
          endpoint="equipementPhotosRequest"
          maxFiles={5}
          acceptedTypes={['image/*']}
          headerText="Téléverser les photos"
          subHeaderText="Images uniquement"
          onFileUploaded={handlePhotosUpload}
        />

        {photos.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {photos.map((url: string, index: number) => (
              <div key={index} className="flex items-center justify-between border p-2 rounded bg-white">
                <div className="flex items-center space-x-2">
                  <FileText className="text-blue-500" />
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                    Voir la photo {index + 1}
                  </a>
                </div>
                <button onClick={() => removePhoto(index)} className="p-1 rounded-full hover:bg-gray-200">
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentPurchaseForm;
