import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

import { templateSchema } from "../../schemas/template";
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
import { Badge } from "../../components/ui/badge";
import {
    InfoIcon,
    UserIcon,
    GraduationCapIcon,
    UserCogIcon,
    FileTextIcon,
    PlaneIcon,
    MicroscopeIcon,
    ArrowLeftIcon,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog";

type TemplateForm = z.infer<typeof templateSchema>;

const PLACEHOLDERS = {
    personalInfo: [
        { tag: "{nom_complet}", desc: "Nom et prénom" },
        { tag: "{email}", desc: "Adresse email" },
        { tag: "{telephone}", desc: "Numéro de téléphone" },
        { tag: "{cin}", desc: "Numéro CIN" },
        {
            tag: "{role}",
            desc: "Rôle (Doctorant, Enseignant, etc.). Spécifie également les infos sur le grade pour les enseignants, ou l'année de thèse/master pour les étudiants.",
        },
    ],
    studentFields: [
        { tag: "{superviseur}", desc: "Directeur de thèse/Encadrant académique" },
    ],
    teacherFields: [
        { tag: "{grade}", desc: "Grade académique" },
        { tag: "{etablissement}", desc: "Établissement d'affiliation" },
    ],
    requestFields: [
        { tag: "{date_demande}", desc: "Date de soumission" },
        { tag: "{reference}", desc: "Référence de la demande" },
        { tag: "{statut}", desc: "Statut de la demande" },
        { tag: "{motif}", desc: "Motif de la demande" },
    ],
    missionFields: [
        { tag: "{organisme_accueil}", desc: "Organisme d'accueil" },
        { tag: "{pays}", desc: "Pays de destination" },
        { tag: "{ville}", desc: "Ville de destination" },
        { tag: "{date_debut}", desc: "Date de début" },
        { tag: "{date_fin}", desc: "Date de fin" },
        { tag: "{objectif}", desc: "Objectif de la mission" },
    ],
    equipmentFields: [
        { tag: "{nom_equipement}", desc: "Désignation équipement" },
        { tag: "{categorie_equipement}", desc: "Catégorie" },
        { tag: "{quantite}", desc: "Quantité demandée" },
    ],
};

const ICON_PROPS = {
    className: "h-4 w-4 text-muted-foreground",
};

const AddTemplate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [showOverwriteDialog, setShowOverwriteDialog] = useState(false);
    const [pendingData, setPendingData] = useState<TemplateForm | null>(null);
    const templateService = new TemplateService();
    const navigate = useNavigate();
    const { theme } = useTheme(); // récupération du thème courant

    const form = useForm<TemplateForm>({
        resolver: zodResolver(templateSchema),
        defaultValues: {
            name: "",
            for: "",
            url: "",
            placeholders: [],
        },
    });

    const { setValue, getValues, formState: { isValid }, reset } = form;

    const handleVerify = async () => {
        setIsLoading(true);
        try {
            const response = await templateService.verifyTemplate({
                url: getValues("url"),
            });

            setIsVerified(true);
            const fieldName = response.data.placeholders.map(
                (placeholder: any) => placeholder.fieldName
            );
            setValue("placeholders", fieldName, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
            });

            toast.success(response.data.message);
        } catch (error: any) {
            setIsVerified(false);
            if (
                error?.response?.data?.message?.includes(
                    "Des champs non authorisés ont été trouvés"
                )
            ) {
                toast.warning(error.response.data.message);
            } else if (
                error?.response?.data?.message?.includes(
                    "Un template existe déjà pour ce type de requête"
                )
            ) {
                setShowOverwriteDialog(true);
            } else if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Une erreur est survenue");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data: TemplateForm) => {
        try {
            setIsLoading(true);
            const response = await templateService.createTemplate(data);
            toast.success(response.data.message);
            reset();
            setIsVerified(false);
            navigate("/templates");
        } catch (error: any) {
            if (
                error?.response?.data?.message?.includes(
                    "Un template existe déjà pour ce type"
                )
            ) {
                setPendingData(data);
                setShowOverwriteDialog(true);
            } else {
                toast.error(error?.response?.data?.message || "Une erreur est survenue");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOverwrite = async () => {
        if (!pendingData) return;

        try {
            setIsLoading(true);
            const response = await templateService.upsertTemplate(pendingData);
            toast.success(response.data.message);
            reset();
            setIsVerified(false);
            setShowOverwriteDialog(false);
            setPendingData(null);
            navigate("/templates");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Une erreur est survenue");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        reset();
        setIsVerified(false);
    };

    const renderPlaceholderSection = (
        title: string,
        icon: React.ReactNode,
        items: { tag: string; desc: string }[]
    ) => (
        <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2 text-sm">
                {icon}
                {title}
            </h4>
            <ul className="space-y-2.5 text-sm">
                {items.map((item, index) => (
                    <li key={index} className="flex gap-2 items-baseline">
                        <Badge variant="outline" className="font-mono px-2 py-1 text-xs">
                            {item.tag}
                        </Badge>
                        <span className="text-muted-foreground flex-1">
                            {item.desc}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="flex justify-center bg-background text-foreground min-h-screen">
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

                <Card className="w-full shadow-xl border-0 bg-background text-foreground">
                    <CardHeader className="h-full pb-6">
                        <CardTitle className="h-full text-3xl font-bold  flex items-center gap-3">
                            <FileTextIcon className="h-7 w-7" />
                            Ajouter un template
                        </CardTitle>
                        <p className=" mt-2 text-base">
                            Créez un nouveau modèle de document pour vos demandes administratives.
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
                                        <InfoIcon className="h-4 w-4" />
                                        {!isVerified ?
                                            (<span>Étape 1 : Informations du template</span>) :
                                            (<span>Étape 2 :Soumettre le template</span>)}
                                    </h3>
                                    <TemplateFields isVerified={isVerified} />
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">
                                    <Button
                                        type="button"
                                        className="w-full sm:w-auto"
                                        variant="outline"
                                        onClick={handleCancel}
                                    >
                                        Annuler
                                    </Button>

                                    {isVerified ? (
                                        <Button
                                            type="submit"
                                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-foreground"
                                            disabled={!isValid || isLoading}
                                        >
                                            {isLoading ? (
                                                <span className="animate-pulse">En cours...</span>
                                            ) : (
                                                "Ajouter le template"
                                            )}
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-foreground"
                                            onClick={handleVerify}
                                            disabled={isLoading || !getValues("url")}
                                        >
                                            {isLoading ? (
                                                <span className="animate-pulse">Vérification...</span>
                                            ) : (
                                                "Vérifier le template"
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </CardContent>

                    <CardFooter
                        className={`border-t pt-8 pb-8 rounded-b-lg ${theme === 'dark' ? 'bg-background' : 'bg-card'
                            }`}
                    >
                        <div className="w-full">
                            <div className="flex items-center gap-2 mb-6 text-sm">
                                <InfoIcon {...ICON_PROPS} />
                                <span className="text-muted-foreground">
                                    Liste des placeholders disponibles
                                </span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {renderPlaceholderSection(
                                    "Informations Personnelles",
                                    <UserIcon {...ICON_PROPS} />,
                                    PLACEHOLDERS.personalInfo
                                )}
                                {renderPlaceholderSection(
                                    "Champs Spécifiques Doctorants/Étudiants",
                                    <GraduationCapIcon {...ICON_PROPS} />,
                                    PLACEHOLDERS.studentFields
                                )}
                                {renderPlaceholderSection(
                                    "Champs Enseignants-Chercheurs",
                                    <UserCogIcon {...ICON_PROPS} />,
                                    PLACEHOLDERS.teacherFields
                                )}
                                {renderPlaceholderSection(
                                    "Champs Génériques Demandes",
                                    <FileTextIcon {...ICON_PROPS} />,
                                    PLACEHOLDERS.requestFields
                                )}
                                {renderPlaceholderSection(
                                    "Champs Missions/Stages",
                                    <PlaneIcon {...ICON_PROPS} />,
                                    PLACEHOLDERS.missionFields
                                )}
                                {renderPlaceholderSection(
                                    "Champs Équipements",
                                    <MicroscopeIcon {...ICON_PROPS} />,
                                    PLACEHOLDERS.equipmentFields
                                )}
                            </div>
                        </div>
                    </CardFooter>
                </Card>

                <Dialog
                    open={showOverwriteDialog}
                    onOpenChange={setShowOverwriteDialog}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Template existant</DialogTitle>
                            <DialogDescription>
                                Un template existe déjà pour ce type. Voulez-vous l'écraser ?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setShowOverwriteDialog(false)}
                            >
                                Annuler
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleOverwrite}
                                disabled={isLoading}
                            >
                                {isLoading ? "En cours..." : "Écraser"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default AddTemplate;