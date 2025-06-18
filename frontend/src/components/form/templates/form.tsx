import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '../../ui/form';
import { Input } from '../../ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../ui/select';
import { Badge } from '../../ui/badge';
import { FileText, FileIcon } from 'lucide-react';
import FileUpload from '../../FileUpload';
import FilePreviewModal from '../../FilePreviewModal';
import { REQUEST_TYPE_LABELS } from '../../../constants/requests';
import { Button } from '../../ui/button';
import { Trash2 } from 'lucide-react';

interface TemplateFieldsProps {
    isVerified: boolean;
    defaultValues?: {
        name?: string;
        for?: string;
        url?: string;
        placeholders?: string[];
    };
    mode?: "edit" | "create";
}

const TemplateFields = ({ isVerified, defaultValues, mode = "create" }: TemplateFieldsProps) => {
    const { control, setValue, getValues } = useFormContext();
    const placeholders = getValues('placeholders') || [];


    const [fileUrl, setFileUrl] = useState<string | null>(defaultValues?.url ?? null);
    const [showFileModal, setShowFileModal] = useState(false);
    const [showFileUpload, setShowFileUpload] = useState(mode !== "edit" || !defaultValues?.url);
    const [showChangeFile, setShowChangeFile] = useState(false);

    // Appliquer les valeurs par défaut si fournies
    useEffect(() => {
        if (defaultValues) {
            if (defaultValues.name) setValue('name', defaultValues.name);
            if (defaultValues.for) setValue('for', defaultValues.for);
            if (defaultValues.url) setValue('url', defaultValues.url);
            if (defaultValues.placeholders) setValue('placeholders', defaultValues.placeholders);
            if (mode === "edit") {
                setFileUrl(defaultValues.url ?? null);
                setShowFileUpload(!defaultValues.url);
            }
        }
        // eslint-disable-next-line
    }, [defaultValues]);

    const handleFileUpload = (fileUrls: string[] | string) => {
        const url = Array.isArray(fileUrls) ? fileUrls[0] : fileUrls;
        setValue('url', url);
        
        setFileUrl(url);
        // On garde la logique de visibilité pour le mode édition
        if (mode === "edit") {
            setShowFileUpload(false);
            setShowChangeFile(false);
        }
    };

    const handleRemoveFile = () => {
        setValue('url', '', {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
        setFileUrl(null);
        setShowFileUpload(true);
        setShowChangeFile(false);
    };

    return (
        <div className="space-y-6">
            <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Nom du template</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Entrez le nom du template"

                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="for"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Cible du formulaire</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}

                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Type de requête" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(REQUEST_TYPE_LABELS).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Gestion du fichier template */}
            {!isVerified && (
                <div className="space-y-4">
                    {mode === "edit" && fileUrl && !showFileUpload && !showChangeFile ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-gray-50 border rounded px-3 py-2">
                                <FileIcon className="text-gray-500" />
                                <span className="text-sm truncate max-w-[160px]">{defaultValues?.name || "Fichier"}</span>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                className="flex items-center gap-2"
                                onClick={() => setShowFileModal(true)}
                            >
                                Voir
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                className="flex items-center gap-2"
                                onClick={() => setShowChangeFile(true)}
                            >
                                Changer
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                className="flex items-center gap-2"
                                onClick={handleRemoveFile}
                            >
                                <Trash2 className="h-4 w-4" />
                                Supprimer
                            </Button>
                            <FilePreviewModal
                                isOpen={showFileModal}
                                onClose={() => setShowFileModal(false)}
                                fileUrl={fileUrl}
                                fileName={defaultValues?.name}
                            />
                        </div>
                    ) : (
                        (showChangeFile || showFileUpload) && (
                            <FormField
                                control={control}
                                name="url"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Fichier template</FormLabel>
                                        <FormControl>
                                            <FileUpload
                                                endpoint="template"
                                                maxFiles={1}
                                                acceptedTypes={['application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                                                headerText="Déposer votre template"
                                                subHeaderText="Fichiers DOCX uniquement"
                                                onFileUploaded={handleFileUpload}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )
                    )}
                </div>)
            }
            {isVerified && placeholders.length > 0 && (
                <div className="space-y-2">
                    <FormLabel>Champs détectés dans le template</FormLabel>
                    <div className="flex flex-wrap gap-2">
                        {placeholders.map((placeholder: string, index: number) => (
                            <Badge
                                key={`${placeholder}-${index}`}
                                variant="outline"
                                className="flex items-center gap-1"
                            >
                                <FileText className="h-3 w-3" />
                                {placeholder}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
};

export default TemplateFields;