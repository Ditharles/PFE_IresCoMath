import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { FileImage, X, Link } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import FileUpload from '../../FileUpload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { EquipmentType, EquipmentTypeList } from '../../../types/equipment';
import Specifications from './Specifications';

interface EquipmentPurchaseItemProps {
    index?: number;
    showDelete?: boolean;
    onDelete?: () => void;
}

const EquipmentPurchaseItem: React.FC<EquipmentPurchaseItemProps> = ({
    index,
    showDelete = false,
    onDelete
}) => {
    const { control, setValue, formState: { errors } } = useFormContext();
    const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

    const getFieldClass = (fieldName: string) => {
        const fieldError = index !== undefined ? (errors.items as Array<Record<string, unknown>> | undefined)?.[index]?.[fieldName] : errors[fieldName];
        return fieldError ? 'border-red-500 focus:border-red-500' : '';
    };

    const getFieldName = (fieldName: string) => {
        return index !== undefined ? `items[${index}].${fieldName}` : fieldName;
    };

    const handlePhotosUpload = (fileUrls: string[] | string) => {
        const urls = Array.isArray(fileUrls) ? fileUrls : [fileUrls];
        const newPhotos = [...uploadedPhotos, ...urls].slice(0, 5);
        setUploadedPhotos(newPhotos);
        setValue(getFieldName('photo'), newPhotos[0]);
    };

    const removePhoto = (photoIndex: number) => {
        const newPhotos = uploadedPhotos.filter((_, i) => i !== photoIndex);
        setUploadedPhotos(newPhotos);
        setValue(getFieldName('photo'), newPhotos[0] || '');
    };

    const handleSpecificationsChange = (specObject: Record<string, string>) => {
        setValue(getFieldName('specifications'), specObject);
    };

    return (
        <div className="border rounded-lg p-6 space-y-6 relative">
            {showDelete && onDelete && (
                <button
                    type="button"
                    onClick={onDelete}
                    className="absolute top-2 right-2 text-red-500 p-2 rounded-full hover:bg-gray-100"
                >
                    <X className="h-4 w-4" />
                </button>
            )}

            <h3 className="text-lg font-medium">
                Matériel
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={control}
                    name={getFieldName('equipmentType')}
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Type de matériel *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className={getFieldClass('equipmentType')}>
                                        <SelectValue placeholder="Sélectionnez un type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(EquipmentType).map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {EquipmentTypeList[type]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={getFieldName('name')}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom du matériel *</FormLabel>
                            <FormControl>
                                <Input {...field} className={getFieldClass('name')} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={control}
                name={getFieldName('productUrl')}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Lien vers le produit</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Link className="h-4 w-4 text-gray-400" />
                                </div>
                                <Input
                                    {...field}
                                    placeholder="https://example.com/produit"
                                    className={`pl-10 ${getFieldClass('productUrl')}`}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Specifications
                onChange={handleSpecificationsChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={control}
                    name={getFieldName('quantity')}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantité *</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min="1"
                                    {...field}
                                    className={getFieldClass('quantity')}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={getFieldName('costEstimation')} //cout unitaire //demande signé 
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimation de coût (DT)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    {...field}
                                    className={getFieldClass('costEstimation')}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Photos du matériel (max 5)</h3>
                <div className="space-y-4">
                    {uploadedPhotos.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {uploadedPhotos.map((photo, photoIndex) => (
                                <div key={photoIndex} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 shadow-sm">
                                    <div className="flex items-center space-x-3">
                                        <FileImage className="h-5 w-5 text-blue-500" />
                                        <a
                                            href={photo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            Photo {photoIndex + 1}
                                        </a>
                                    </div>
                                    <button
                                        onClick={() => removePhoto(photoIndex)}
                                        className="p-1 rounded-full hover:bg-gray-200"
                                    >
                                        <X className="h-4 w-4 text-red-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {uploadedPhotos.length < 5 && (
                        <FileUpload
                            endpoint="equipmentPhotos"
                            maxFiles={5 - uploadedPhotos.length}
                            acceptedTypes={['image/*']}
                            headerText={uploadedPhotos.length === 0 ?
                                "Téléverser des photos du matériel" :
                                "Ajouter des photos supplémentaires"}
                            subHeaderText={`Formats JPG, PNG, etc. (${5 - uploadedPhotos.length} max)`}
                            onFileUploaded={handlePhotosUpload}
                        />
                    )}
                </div>
            </div>

            <FormField
                control={control}
                name={getFieldName('notes')}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Notes complémentaires</FormLabel>
                        <FormControl>
                            <Textarea
                                {...field}
                                rows={3}
                                placeholder="Ajoutez des notes ou commentaires supplémentaires..."
                                className={getFieldClass('notes')}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default EquipmentPurchaseItem;