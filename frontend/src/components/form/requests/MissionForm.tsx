import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';
import { X } from 'lucide-react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import FileUpload from '../../FileUpload';
import FilePreviewModal from '../../FilePreviewModal';
import { DatePicker } from '../DatePicker';

const MissionForm: React.FC = () => {
  const { control, setValue, formState: { errors }, getValues } = useFormContext();
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>(getValues('specificDocument') || []);
  const [previewFile, setPreviewFile] = useState<{ url: string; name?: string } | null>(null);

  const getFieldClass = (fieldName: string) => {
    return errors[fieldName] ? 'border-red-500 focus:border-red-500' : '';
  };

  const handleDocumentUpload = (fileUrls: string[] | string) => {
    const newUrls = Array.isArray(fileUrls) ? fileUrls : [fileUrls];
    setUploadedDocuments(prev => [...prev, ...newUrls]);
    setValue('specificDocument', [...uploadedDocuments, ...newUrls], { shouldDirty: true });
  };

  const removeDocument = (index: number) => {
    const newDocuments = uploadedDocuments.filter((_, i) => i !== index);
    setUploadedDocuments(newDocuments);
    setValue('specificDocument', newDocuments, { shouldDirty: true });
    console.log(getValues('specificDocument'));
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
              <FormLabel>Date de fin</FormLabel>
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
          render={() => (
            <FormItem>
              <FormLabel>Documents spécifiques</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {uploadedDocuments.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {uploadedDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 shadow-sm">
                          <div
                            className="flex items-center space-x-3 cursor-pointer"
                            onClick={() => setPreviewFile({ url: doc })}
                          >
                            <img
                              src={doc}
                              alt={`Document ${index + 1}`}
                              className="h-12 w-12 object-cover rounded"
                            />
                            <span className="text-sm text-gray-700">Document {index + 1}</span>
                          </div>
                          <button
                            onClick={() => removeDocument(index)}
                            className="p-1 rounded-full hover:bg-gray-200"
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <FileUpload
                    endpoint="specificDocuments"
                    maxFiles={5}
                    acceptedTypes={['application/pdf', 'image/*']}
                    headerText="Téléverser les documents pour appuyer votre demande (optionnel)"
                    subHeaderText="Formats PDF ou images"
                    onFileUploaded={handleDocumentUpload}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FilePreviewModal
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        fileUrl={previewFile?.url || ''}
        fileName={previewFile?.name}
      />
    </div>
  );
};

export default MissionForm;