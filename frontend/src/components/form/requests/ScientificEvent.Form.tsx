import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Calendar } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel } from '../../ui/form';
import FileUpload from '../../FileUpload';

const ScientificEventForm: React.FC = () => {
  const { control, watch, setValue, formState: { errors } } = useFormContext();
  const articlesAccepted = watch('articlesAccepted') || false;

  const getFieldClass = (fieldName: string) => {
    return errors[fieldName] ? 'border-red-500 focus:border-red-500' : '';
  };

  const handleFileUpload = (fileUrl: any) => {
    if (fileUrl) {
      
      setValue('articleCover', fileUrl[0]);
    }
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lieu *</FormLabel>
            <FormControl>
              <Input {...field} className={getFieldClass('location')} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Titre de l'événement *</FormLabel>
            <FormControl>
              <Input {...field} className={getFieldClass('title')} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="articlesAccepted"
        render={({ field }) => (
          <FormItem className="flex items-center gap-3 px-4 py-2 shadow-sm">
            <FormControl>
              <Input
                type="checkbox"
                checked={field.value}
                onChange={e => field.onChange(e.target.checked)}
                className="w-5 h-5 accent-blue-600"
              />
            </FormControl>
            <FormLabel className="text-sm font-medium text-gray-700">Article accepté</FormLabel>
          </FormItem>
        )}
      />

      {articlesAccepted && (
        <FormField
          control={control}
          name="articleCover"
          render={() => (
            <FormItem>
              <FormLabel>Première page de l'article *</FormLabel>
              <FormControl>
                <FileUpload
                  endpoint="articleCover"
                  maxFiles={1}
                  acceptedTypes={['application/pdf', 'image/*']}
                  headerText="Téléverser la première page"
                  subHeaderText="PDF ou image"
                  onFileUploaded={handleFileUpload}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de début *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="date" {...field} className={getFieldClass('startDate')} />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de fin *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="date" {...field} className={getFieldClass('endDate')} />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ScientificEventForm;
