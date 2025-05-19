import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Link } from 'lucide-react';
import { Input } from '../../ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../ui/form';

import { X } from 'lucide-react';
import FileUpload from '../../FileUpload';

const ArticleRegistrationForm: React.FC = () => {
  const { control, setValue, formState: { errors }, getValues } = useFormContext();
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(getValues('articleCover') || null);


  const getFieldClass = (fieldName: string) => {
    return errors[fieldName] ? 'border-red-500 focus:border-red-500' : '';
  };

  const handlePhotoUpload = (fileUrls: string[] | string) => {
    if (Array.isArray(fileUrls)) fileUrls = fileUrls[0];

    setUploadedPhoto(fileUrls);
    setValue('articleCover', fileUrls, { shouldValidate: true });

  };

  const removePhoto = () => {
    setUploadedPhoto(null);
    setValue('articleCover', '', { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Titre de l'article</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Titre de l'article"
                className={getFieldClass('title')}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="conference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de la conférence</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Nom de la conférence ou de la revue"
                className={getFieldClass('conference')}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="urlConference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lien de la conférence (optionnel)</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type="url"
                  placeholder="https://example.com"
                  className={`pl-8 ${getFieldClass('urlConference')}`}
                />
                <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="articleCover"
        render={() => (
          <FormItem>
            <FormLabel>Couverture de l'article*</FormLabel>
            <FormControl>
              <div className="space-y-4">
                {uploadedPhoto ? (
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <img
                        src={uploadedPhoto}
                        alt="Couverture de l'article"
                        className="h-12 w-12 object-cover rounded"
                      />
                      <span className="text-sm text-gray-700">Couverture téléversée</span>
                    </div>
                    <button
                      onClick={removePhoto}
                      className="p-1 rounded-full hover:bg-gray-200"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <FileUpload
                    endpoint="articleCover"
                    maxFiles={1}
                    acceptedTypes={["image/*"]}
                    headerText="Téléverser la première page de l'article"
                    subHeaderText="Format accepté: JPG, PNG (max 4MB)"
                    onFileUploaded={handlePhotoUpload}
                  />
                )}
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Frais d'inscription (DT)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                min="0"
                {...field}
                placeholder="Montant en dinars tunisiens"
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