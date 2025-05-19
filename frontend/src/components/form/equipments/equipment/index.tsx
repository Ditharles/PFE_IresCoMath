import { useFormContext } from 'react-hook-form';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { EquipmentCategory, EquipmentStatus } from '../../../../types/equipment';
import FileUpload from '../../../FileUpload';
import FilePreviewModal from '../../../FilePreviewModal';
import { X } from 'lucide-react';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import CategoryFields from '../categorie';
import Specifications from '../../requests/Specifications';
import EquipmentService from '../../../../services/equipment.service';

import { DatePicker } from '../../DatePicker';

interface PreviewModalState {
    open: boolean;
    url: string;
    name: string;
}

const EquipmentFields = () => {
    const { control, setValue, getValues, watch } = useFormContext();
    const currentPhotos: string[] = getValues('photo') || [];
    const categoryId = watch('categoryId');
    const [categories, setCategories] = useState<EquipmentCategory[]>([]);
    const [previewModal, setPreviewModal] = useState<PreviewModalState>({
        open: false,
        url: '',
        name: ''
    });

    const handlePhotoUpload = useCallback((urls: string[] | string) => {
        const newUrls = Array.isArray(urls) ? urls : [urls];
        setValue('photo', [...currentPhotos, ...newUrls], { shouldValidate: true });
    }, [currentPhotos, setValue]);

    const removePhoto = useCallback((index: number) => {
        const newPhotos = currentPhotos.filter((_, i) => i !== index);
        setValue('photo', newPhotos, { shouldValidate: true });
    }, [currentPhotos, setValue]);

    const openPreview = useCallback((url: string) => {
        const photoIndex = currentPhotos.indexOf(url);
        setPreviewModal({
            open: true,
            url,
            name: `Photo ${photoIndex + 1}`
        });
    }, [currentPhotos]);

    const statusOptions = useMemo(() =>
        Object.entries(EquipmentStatus).map(([key, value]) => (
            <SelectItem key={key} value={key}>
                {value}
            </SelectItem>
        )),
        []);

    const photoPreviews = useMemo(() =>
        currentPhotos.map((url, index) => (
            <div key={url} className="relative group">
                <div
                    className="h-20 w-20 rounded-md overflow-hidden cursor-pointer"
                    onClick={() => openPreview(url)}
                    aria-label={`Preview photo ${index + 1}`}
                >
                    <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(index);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove photo ${index + 1}`}
                >
                    <X size={12} />
                </button>
            </div>
        )),
        [currentPhotos, openPreview, removePhoto]);

    const equipmentService = useMemo(() => new EquipmentService(), []);

    const specificationsToArray = (specs: Record<string, string> = {}): { key: string, value: string }[] => {
        return Object.entries(specs).map(([key, value]) => ({ key, value }));
    };

    const fetchCategories = useCallback(async () => {
        try {
            const response = await equipmentService.getAllCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, [equipmentService]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div className="space-y-6">
            <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex-1 w-full">
                            <FormLabel>Nom de l'équipement</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Entrez le nom de l'équipement"
                                    {...field}
                                    aria-describedby="name-description"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem className="flex-1 w-full">
                            <FormLabel>Catégorie</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value || ''}
                                defaultValue=""
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionnez une catégorie" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="autre">Autre (créer une nouvelle catégorie)</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {categoryId === 'autre' && (
                <div className="space-y-4 p-4 border rounded-lg">
                    <h3 className="font-medium">Nouvelle catégorie</h3>
                    <CategoryFields prefix='categories' />
                </div>
            )}

            <div className="w-full flex flex-col md:flex-row gap-4 justify-between">


                <FormField
                    control={control}
                    name="cost"
                    render={({ field }) => (
                        <FormItem className="flex-1 w-full">
                            <FormLabel>Coût </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Entrez le prix"

                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="flex-1 w-full">
                            <FormLabel>Statut</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value || ''} // Valeur par défaut vide
                                defaultValue=""
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionnez un statut" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {statusOptions}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={control}
                name="acquisitionDate"
                render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                        <FormLabel>Date d'acquisition</FormLabel>
                        <FormControl>

                            <DatePicker {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="specifications"
                render={({ field }) => (<FormItem>
                    {
                        specificationsToArray(field.value).length > 0 ? (
                            <Specifications
                                initialSpecifications={specificationsToArray(field.value)}
                                onChange={(specs) => field.onChange(specs)}
                            />

                        ) : (
                            <Specifications onChange={(specs) => field.onChange(specs)} />
                        )
                    }

                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={control}
                name="photo"
                render={() => (
                    <FormItem>
                        <FormLabel>Photos</FormLabel>
                        <FormControl>
                            <div className="space-y-4">
                                {currentPhotos.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">Photos existantes</p>
                                        <div className="flex flex-wrap gap-2">
                                            {photoPreviews}
                                        </div>
                                    </div>
                                )}

                                <FileUpload
                                    endpoint="equipmentPhotos"
                                    maxFiles={5 - currentPhotos.length}
                                    acceptedTypes={["image/jpeg", "image/png"]}
                                    headerText={currentPhotos.length > 0 ? "Ajouter d'autres photos" : "Téléverser des photos"}
                                    subHeaderText='Formats acceptés : JPG, PNG'
                                    onFileUploaded={handlePhotoUpload}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FilePreviewModal
                isOpen={previewModal.open}
                onClose={() => setPreviewModal(prev => ({ ...prev, open: false }))}
                fileUrl={previewModal.url}
                fileName={previewModal.name}
            />
        </div>
    );
};

export default EquipmentFields;