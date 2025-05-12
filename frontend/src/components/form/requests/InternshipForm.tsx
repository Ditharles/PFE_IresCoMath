import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Calendar, FileText, X, Globe } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel } from '../../ui/form';
import FileUpload from '../../FileUpload';

const InternshipForm: React.FC = () => {
  const { control, setValue, formState: { errors } } = useFormContext();
  const [uploadedLetter, setUploadedLetter] = useState<string | null>(null);

  const getFieldClass = (fieldName: string) => {
    return errors[fieldName] ? 'border-red-500 focus:border-red-500' : '';
  };

  const handleLetterUpload = (fileUrl: string[] | string) => {
    if (fileUrl) {
      setUploadedLetter(Array.isArray(fileUrl) ? fileUrl[0] : fileUrl);
      setValue('letter', Array.isArray(fileUrl) ? fileUrl[0] : fileUrl);
    }
  };

  const removeLetter = () => {
    setUploadedLetter(null);
    setValue('letter', '');
  };

  return (
    <div className="space-y-8">
      {/* Section Infos organisation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Informations de l'organisation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisation</FormLabel>
                <FormControl>
                  <Input {...field} className={getFieldClass('organization')} />
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
                  <Input {...field} className={getFieldClass('country')} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Section Coordonnées organisation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Coordonnées de l'organisation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="organizationEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email organisation *</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className={getFieldClass('organizationEmail')} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="organizationUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site web</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type="url" {...field} className={getFieldClass('organizationUrl')} />
                    <Globe className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

     {/* Section Dates */}
     <div className="space-y-4">
        <h3 className="text-lg font-medium">Période de stage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* Section Responsable (optionnel) */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Responsable (optionnel)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField
            control={control}
            name="supervisor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom responsable</FormLabel>
                <FormControl>
                  <Input {...field} className={getFieldClass('supervisor')} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="supervisorEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email responsable</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className={getFieldClass('supervisorEmail')} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="supervisorPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone responsable</FormLabel>
                <FormControl>
                  <Input {...field} className={getFieldClass('supervisorPhone')} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

 
      {/* Section Lettre d'invitation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Lettre d'invitation *</h3>
        <div className="space-y-4">
          {uploadedLetter ? (
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 shadow-sm">
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
              <button 
                type="button"
                onClick={removeLetter} 
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>
          ) : (
            <FileUpload
              endpoint="stageLetter"
              maxFiles={1}
              acceptedTypes={['application/pdf', 'image/*']}
              headerText="Téléverser la lettre d'invitation (obligatoire)"
              subHeaderText="Format PDF ou image"
              onFileUploaded={handleLetterUpload}
            
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipForm;