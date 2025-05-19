
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import FileUpload from '../../FileUpload';

import { DatePicker } from '../DatePicker';

const MissionForm: React.FC = () => {
  const { control, formState: { errors } } = useFormContext();

  const getFieldClass = (fieldName: string) => {
    return errors[fieldName] ? 'border-red-500 focus:border-red-500' : '';
  };

  return (
    <div className="space-y-6">
      {/* Section Organisation d'accueil */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Organisation d'accueil</h3>
        <FormField
          control={control}
          name="hostOrganization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l'organisation *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={getFieldClass('hostOrganization')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Section Détails de la mission */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Détails de la mission</h3>
        <FormField
          control={control}
          name="objective"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objectif *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  className={getFieldClass('objective')}
                  placeholder="Décrivez les objectifs de la mission..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pays *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={getFieldClass('country')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Section Période */}

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
              <FormLabel>Date de dfin</FormLabel>
              <FormControl>

                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>

      {/* Section Documents */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Documents</h3>

        <FormField
          control={control}
          name="specificDocument"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documents spécifiques</FormLabel>
              <FormControl>
                <FileUpload
                  endpoint="specificDocuments"
                  maxFiles={5}
                  acceptedTypes={['application/pdf', 'image/*']}
                  headerText="Televerser les documents pour appuyer votre demande (optionnel)"
                  subHeaderText="Formats PDF ou images"
                  onFileUploaded={field.onChange}

                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


      </div>
    </div>
  );
};

export default MissionForm;