import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { AxiosResponse } from "axios";
import { editTemplateSchema } from "../../schemas/template";
import TemplateService from "../../services/templates.service";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Form } from "../../components/ui/form";
import TemplateFields from "../../components/form/templates/form";
import { Button } from "../../components/ui/button";
import { ArrowLeftIcon, FileTextIcon } from "lucide-react";

type EditTemplateForm = z.infer<typeof editTemplateSchema>;

const EditTemplate = () => {
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [isVerified] = useState(true); // Toujours vérifié en édition
    const [defaultValues, setDefaultValues] = useState<Partial<EditTemplateForm>>({});

    const templateService = new TemplateService();
    const navigate = useNavigate();

    const form = useForm<EditTemplateForm>({
        resolver: zodResolver(editTemplateSchema),
        defaultValues,
    });

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        templateService.getTemplate(id)
            .then((res: AxiosResponse) => {
                setDefaultValues({
                    id: res.data.id,
                    name: res.data.name,
                    for: res.data.for,
                    url: res.data.url,
                    placeholders: res.data.placeholders || [],
                });
                form.reset({
                    id: res.data.id,
                    name: res.data.name,
                    for: res.data.for,
                    url: res.data.url,
                    placeholders: res.data.placeholders || [],
                });
            })
            .catch(() => {
                toast.error("Erreur lors du chargement du template");
                navigate("/templates");
            })
            .finally(() => setIsLoading(false));
        // eslint-disable-next-line
    }, [id]);

    const handleSubmit = async (data: EditTemplateForm) => {
        if (!id) return;
        setIsLoading(true);
        try {
            await templateService.updateTemplate(id, { ...data, id });
            toast.success("Template mis à jour avec succès");
            navigate("/templates");
        } catch (error: unknown) {
            toast.error(error!.response?.data?.message || "Erreur lors de la mise à jour");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-full">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Retour
                </Button>
                <Card className="w-full shadow-xl border-0">
                    <CardHeader className="h-full pb-6">
                        <CardTitle className="h-full text-3xl font-bold flex items-center gap-3">
                            <FileTextIcon className="h-7 w-7" />
                            Modifier le template
                        </CardTitle>
                        <p className="mt-2 text-base">
                            Modifiez les informations de votre modèle de document.
                        </p>
                    </CardHeader>
                    <CardContent className="bg-background rounded-b-lg">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="space-y-8"
                            >
                                <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6 mb-4">
                                    <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                                        <FileTextIcon className="h-4 w-4" />
                                        Modifier les informations du template
                                    </h3>
                                    <TemplateFields isVerified={isVerified} defaultValues={defaultValues} mode="edit" />
                                </div>
                                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">
                                    <Button
                                        type="button"
                                        className="w-full sm:w-auto"
                                        variant="outline"
                                        onClick={() => navigate(-1)}
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-foreground"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="animate-pulse">En cours...</span>
                                        ) : (
                                            "Enregistrer les modifications"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter />
                </Card>
            </div>
        </div>
    );
};

export default EditTemplate;
