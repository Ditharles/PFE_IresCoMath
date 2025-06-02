import { z } from "zod";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
// import { useTheme } from "next-themes"; // Supprimé car non utilisé

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
    // const { theme } = useTheme(); // Supprimé car non utilisé

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

    ;
    const handleVerify = async () => {
        setIsLoading(true);
        try {
            const response = await templateService.verifyTemplate({
                url: getValues("url"),
            });

            setIsVerified(true);
            const fieldName = response.data.placeholders.map(
                (placeholder: { fieldName: string }) => placeholder.fieldName
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
        <div className="space-y-3 p-4 rounded-md bg-muted/30 border border-border/40">
            <h4 className="font-semibold flex items-center gap-2 text-primary">
                {icon}
                {title}
            </h4>
            <ul className="space-y-2 text-sm">
                {items.map((item, index) => (
                    <li key={index} className="flex gap-2 items-baseline">
                        <Badge variant="outline" className="font-mono px-2 py-0.5 text-xs bg-background/50 border-border/40">
                            {item.tag}
                        </Badge>
                        <span className="text-muted-foreground/80 flex-1">
                            {item.desc}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="w-full flex justify-center bg-gradient-to-br from-background via-background/95 to-muted/30 text-foreground min-h-screen p-6">
            <main className="w-full">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 bg-card/50 hover:bg-accent hover:text-accent-foreground"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Retour
                </Button>

                <Card className="w-full shadow-xl border border-border/40 bg-card/50 backdrop-blur-sm text-card-foreground">
                    <CardHeader className="pb-6 border-b border-border/40 bg-card/70">
                        <CardTitle className="text-3xl font-bold flex items-center gap-3 text-primary">
                            <FileTextIcon className="h-7 w-7" />
                            Ajouter un template
                        </CardTitle>
                        <p className="mt-2 text-base text-muted-foreground/80">
                            Créez un nouveau modèle de document pour vos demandes administratives.
                        </p>
                    </CardHeader>

                    <CardContent className="p-6 space-y-8">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="space-y-8"
                            >
                                <div className="rounded-lg border border-border/40 bg-muted/50 p-6">
                                    <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                                        <FileTextIcon className="h-4 w-4" />
                                        Informations du template
                                    </h3>
                                    <TemplateFields isVerified={isVerified} />
                                    <div className="flex justify-end mt-6">
                                        {!isVerified ? (
                                            <Button
                                                type="button"
                                                onClick={handleVerify}
                                                disabled={isLoading || !form.getValues('url')}
                                                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow"
                                            >
                                                {isLoading ? (
                                                    <span className="animate-pulse">Vérification...</span>
                                                ) : (
                                                    "Vérifier le template"
                                                )}
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <span className="animate-pulse">En cours...</span>
                                                ) : (
                                                    "Créer le template"
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {renderPlaceholderSection(
                                        "Informations personnelles",
                                        <UserIcon {...ICON_PROPS} />,
                                        PLACEHOLDERS.personalInfo
                                    )}
                                    {renderPlaceholderSection(
                                        "Champs étudiants",
                                        <GraduationCapIcon {...ICON_PROPS} />,
                                        PLACEHOLDERS.studentFields
                                    )}
                                    {renderPlaceholderSection(
                                        "Champs enseignants",
                                        <UserCogIcon {...ICON_PROPS} />,
                                        PLACEHOLDERS.teacherFields
                                    )}
                                    {renderPlaceholderSection(
                                        "Champs de demande",
                                        <InfoIcon {...ICON_PROPS} />,
                                        PLACEHOLDERS.requestFields
                                    )}
                                    {renderPlaceholderSection(
                                        "Champs de mission",
                                        <PlaneIcon {...ICON_PROPS} />,
                                        PLACEHOLDERS.missionFields
                                    )}
                                    {renderPlaceholderSection(
                                        "Champs d'équipement",
                                        <MicroscopeIcon {...ICON_PROPS} />,
                                        PLACEHOLDERS.equipmentFields
                                    )}
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
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="bg-muted/50 border-t border-border/40" />
                </Card>
            </main>

            <Dialog open={showOverwriteDialog} onOpenChange={setShowOverwriteDialog}>
                <DialogContent className="bg-card text-card-foreground">
                    <DialogHeader>
                        <DialogTitle>Template existant</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Un template existe déjà pour ce type de demande. Voulez-vous le remplacer ?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowOverwriteDialog(false)}
                        >
                            Annuler
                        </Button>
                        <Button onClick={handleOverwrite} disabled={isLoading}>
                            {isLoading ? "En cours..." : "Remplacer"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddTemplate;