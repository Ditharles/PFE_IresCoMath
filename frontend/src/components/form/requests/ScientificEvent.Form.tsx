import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Calendar } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import FileUpload from '../../FileUpload';

const ScientificEventForm: React.FC = () => {
  const { control, watch, setValue } = useFormContext();
  const articleAccepted = watch('articleAccepted') || false;

  const handleFileUpload = (fileUrl: string) => {
    if (fileUrl) {
      setValue('fileUrl', fileUrl);
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
              <Input {...field} />
            </FormControl>
            <FormMessage />
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
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="articleAccepted"
        render={({ field }) => (
          <FormItem className="flex items-center gap-3 px-4 py-2    shadow-sm">
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


      {articleAccepted && (
        <FormField
          control={control}
          name="fileUrl"
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
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="dateDebut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de début *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="date" {...field} />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dateFin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de fin *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="date" {...field} />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ScientificEventForm;
