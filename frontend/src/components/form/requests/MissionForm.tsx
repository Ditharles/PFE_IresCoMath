import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';
import { Calendar } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../ui/form';

const MissionForm: React.FC = () => {
  const { control, formState: { errors } } = useFormContext();

  // Fonction pour obtenir la classe CSS en fonction des erreurs
  const getFieldClass = (fieldName: string) => {
    return errors[fieldName] ? 'border-red-500 focus:border-red-500' : '';
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="objective"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Objectif</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                rows={3} 
                className={getFieldClass('objective')}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pays</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className={getFieldClass('country')}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lieu</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className={getFieldClass('location')}
              />
            </FormControl>
          </FormItem>
        )}
      />

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
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default MissionForm;