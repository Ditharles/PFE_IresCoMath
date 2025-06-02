import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import FileUpload from '../../FileUpload';
import { DatePicker } from '../DatePicker';

const ScientificEventForm: React.FC = () => {
  const { control, watch, setValue, formState: { errors } } = useFormContext();
  const articlesAccepted = watch('articlesAccepted') || false;

  const getFieldClass = (fieldName: string) => {
    return errors[fieldName] ? 'border-red-500 focus:border-red-500' : '';
  };

  const handleFileUpload = (fileUrl: string[] | string, fieldName: string) => {
    if (fileUrl) {
      setValue(fieldName, Array.isArray(fileUrl) ? fileUrl[0] : fileUrl);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Informations de base */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Informations de l'événement</h3>

        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu *</FormLabel>
              <FormControl>
                <Input {...field} className={getFieldClass('location')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="urlEvent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de l'événement</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  {...field}
                  className={getFieldClass('urlEvent')}
                  placeholder="https://"
                />
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
                <Input {...field} className={getFieldClass('title')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="mailAcceptation"
          render={() => (
            <FormItem>
              <FormLabel>Email d'acceptation *</FormLabel>
              <FormControl>
                <FileUpload
                  endpoint="mailAcceptation"
                  maxFiles={1}
                  acceptedTypes={['application/pdf', 'image/*']}
                  headerText="Téléverser l'email d'acceptation"
                  subHeaderText="PDF ou image (max 5MB)"
                  onFileUploaded={(fileUrl) => handleFileUpload(fileUrl, 'mailAcceptation')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Section Article */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Article scientifique</h3>

        <FormField
          control={control}
          name="articlesAccepted"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 px-4 py-2 ">
              <FormControl>
                <Input
                  type="checkbox"
                  checked={field.value}
                  onChange={e => field.onChange(e.target.checked)}
                  className="w-5 h-5 accent-blue-600"
                />
              </FormControl>
              <FormLabel className="text-sm font-medium text-gray-700">
                Article accepté
              </FormLabel>
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
                    subHeaderText="PDF ou image (max 5MB)"
                    onFileUploaded={(fileUrl) => handleFileUpload(fileUrl, 'articleCover')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>

      {/* Section Période de la mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormLabel>Date de début</FormLabel>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormLabel>Date de fin</FormLabel>
              <FormControl>
                <DatePicker {...field} />
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