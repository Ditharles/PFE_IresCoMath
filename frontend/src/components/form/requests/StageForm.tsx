import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Calendar, FileText, X } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import FileUpload from '../../FileUpload';

const StageForm: React.FC = () => {
  const { control, setValue } = useFormContext();
  const [uploadedLetter, setUploadedLetter] = useState<string | null>(null);

  const handleLetterUpload = (fileUrl: string) => {
    if (fileUrl) {
      setUploadedLetter(fileUrl);
      setValue('letter', fileUrl);
    }
  };

  const removeLetter = () => {
    setUploadedLetter(null);
    setValue('letter', '');
  };

  return (
    <div className="space-y-6">
      {/* Section Entreprise */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entreprise *</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Coordonnées Entreprise */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={control}
          name="companyEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email entreprise *</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="companyPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone entreprise *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Section Responsable */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={control}
          name="supervisor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsable *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="supervisorEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email responsable *</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="supervisorPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone responsable *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="startDate"
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
          name="endDate"
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

      {/* Section Lettre d'invitation */}
      <div className="space-y-4">
        <FormLabel>Lettre d'invitation</FormLabel>

        {uploadedLetter ? (
          <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-500" />
              <a
                href={uploadedLetter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Voir la lettre
              </a>
            </div>
            <button onClick={removeLetter} className="p-1 rounded-full hover:bg-gray-200">
              <X className="h-4 w-4 text-red-500" />
            </button>
          </div>
        ) : (
          <FileUpload
            endpoint="stageLetter"
            maxFiles={1}
            acceptedTypes={['application/pdf', 'image/*']}
            headerText="Téléverser la lettre d'invitation"
            subHeaderText="Format PDF ou image"
            onFileUploaded={handleLetterUpload}
          />
        )}
      </div>
    </div>
  );
};

export default StageForm;