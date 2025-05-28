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
import { FileText } from 'lucide-react';
import FileUpload from '../../FileUpload';
import { REQUEST_TYPE_LABELS } from '../../../constants/requests';

interface TemplateFieldsProps {
    isVerified: boolean;
}

const TemplateFields = ({ isVerified }: TemplateFieldsProps) => {
    const { control, setValue, getValues } = useFormContext();
    const placeholders = getValues('placeholders') || [];

    const handleFileUpload = (fileUrls: string[] | string) => {
        const url = Array.isArray(fileUrls) ? fileUrls[0] : fileUrls;
        setValue('url', url, { shouldValidate: true });
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

            {!isVerified && (
                <div className="space-y-4">
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
                </div>)
            }
            {isVerified && placeholders.length > 0 && (
                <div className="space-y-2">
                    <FormLabel>Champs détectés dans le template</FormLabel>
                    <div className="flex flex-wrap gap-2">
                        {placeholders.map((placeholder, index) => (
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