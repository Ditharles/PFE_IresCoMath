import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Calendar } from 'lucide-react';
import { Input } from '../../ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,

} from '../../ui/form';

const ArticleRegistrationForm: React.FC = () => {
  const { control, formState: { errors } } = useFormContext();

  const getFieldClass = (fieldName: string) => {
    return errors[fieldName] ? 'border-red-500 focus:border-red-500' : '';
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="conference"
        key="conference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Conférence</FormLabel>
            <FormControl>
              <Input {...field} className={getFieldClass('conference')} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location"
        key="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lieu</FormLabel>
            <FormControl>
              <Input {...field} className={getFieldClass('location')} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="date"
        key="date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="date"
                  {...field}
                  className={getFieldClass('date')}
                />
                <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="amount"
        key="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Frais d'inscription (DT)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                min="0"
                {...field}
                className={getFieldClass('amount')}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ArticleRegistrationForm;