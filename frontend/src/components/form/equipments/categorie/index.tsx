import { X } from 'lucide-react';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import FileUpload from '../../../FileUpload';
import { useFormContext } from 'react-hook-form';
import { useCallback, useState, useMemo } from 'react';
import FilePreviewModal from '../../../FilePreviewModal';
import { EquipmentTypeList } from '../../../../types/equipment';


interface PreviewModalState {
  open: boolean;
  url: string;
  name: string;
}
interface CategoryFieldsProps {
  prefix?: string;
}
const CategoryFields = ({ prefix }: CategoryFieldsProps) => {
  const { control, setValue, getValues } = useFormContext();

  const getFieldName = (name: string) => prefix ? `${prefix}.${name}` : name;

  const currentPhotos: string[] = getValues(getFieldName('photo')) || [];

  const [previewModal, setPreviewModal] = useState<PreviewModalState>({
    open: false,
    url: '',
    name: ''
  });

  const handlePhotoUpload = useCallback((urls: string[] | string) => {
    const newUrls = Array.isArray(urls) ? urls : [urls];
    setValue(getFieldName('photo'), [...currentPhotos, ...newUrls], { shouldValidate: true });
  }, [currentPhotos, setValue, getFieldName]);


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

  const equipmentTypeOptions = useMemo(() =>
    Object.entries(EquipmentTypeList).map(([key, value]) => (
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
          className="absolute -top-2 -right-2 bg-red-500 text-foreground rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Remove photo ${index + 1}`}
        >
          <X size={12} />
        </button>
      </div>
    )),
    [currentPhotos, openPreview, removePhoto]);

  return (
    <div className="space-y-6">
      <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
        <FormField
          control={control}
          name={getFieldName('type')}
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-foreground">Type de catégorie</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full bg-background border-border">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-background border-border">
                  {equipmentTypeOptions}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={getFieldName("name")}
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormLabel className="text-foreground">Nom de la catégorie</FormLabel>
              <FormControl>
                <Input
                  placeholder="Entrez le nom de la catégorie"
                  className="bg-background border-border"
                  {...field}
                  aria-describedby="name-description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name={getFieldName("description")}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Entrez une description"
                className="min-h-[120px] bg-background border-border"
                {...field}
                aria-describedby="description-description"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={getFieldName("photo")}
        render={() => (
          <FormItem>
            <FormLabel className="text-foreground">Photos</FormLabel>
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
                  endpoint="categoryPhotos"
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

export default CategoryFields;
