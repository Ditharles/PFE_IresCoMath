import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Textarea } from '../../ui/textarea';

import FileUpload from '../../FileUpload';

const RepairMaintenanceForm: React.FC = () => {
    const { control, setValue, getValues } = useFormContext();
    const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(getValues('photo') || []);

    const handlePhotoUpload = (fileUrls: string[] | string) => {
        const newPhotos = Array.isArray(fileUrls) ? fileUrls : [fileUrls];
        setUploadedPhotos(newPhotos);
        setValue('photo', newPhotos);
    };


    return (
        <div className="space-y-6">
            {/* Description Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Description du problème</h3>
                <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description détaillée</FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={4}
                                    {...field}
                                    placeholder="Décrivez en détail le problème rencontré..."
                                    className="resize-none"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Photos Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Photos (optionnel)</h3>
                <FormField
                    control={control}
                    name="photo"
                    render={() => (
                        <FormItem>
                            <FormLabel>Ajouter des photos</FormLabel>
                            <FormControl>
                                <div className="space-y-4">

                                    {uploadedPhotos.length < 5 && (
                                        <FileUpload
                                            endpoint="repairMaintenance"
                                            maxFiles={5 - uploadedPhotos.length}
                                            acceptedTypes={['image/*']}
                                            headerText="Téléverser des photos du problème"
                                            subHeaderText="Maximum 5 photos. Formats acceptés : JPG, PNG, GIF"
                                            onFileUploaded={handlePhotoUpload}
                                        />
                                    )}
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

export default RepairMaintenanceForm;
