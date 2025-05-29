import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { ManageUserService } from "../services/manageUser.service";
import { Navigate, useSearchParams, useNavigate } from "react-router-dom";
import { Role, RoleEnum } from "../types/common";
import { toast } from "sonner";
import LoadingOverlay from "../components/LoadingOverlay";
import { RequestUser } from "../types/MemberAddRequest";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { CheckCircle2, UserPlus, XCircle, Briefcase, GraduationCap, ExternalLink } from "lucide-react";
import { formatDate } from "../utils/utils";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
const MemberAddRequest = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [requests, setRequests] = useState<RequestUser | null>(null);
    const [loading, setLoading] = useState(true);
    const darkMode = false;
    const [reason, setReason] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const manageUserService = new ManageUserService();


    const user_id = searchParams.get("id");
    const user_role = searchParams.get("role") as Role | null;


    if (!user_id || !user_role) {
        return <Navigate to="/NotFound" />;
    }



    // Fonction pour formater les clés
    const formatKey = (key: string) => {
        const keyMapping: Record<string, string> = {
            email: "Adresse e-mail",
            telephone: "Téléphone",
            cin: "CIN",
            specialite: "Spécialité",
            createdAt: "Date de la demande",
            status: "Statut",
            etablissement: "Établissement",
            laboratoire: "Laboratoire",
            grade: "Grade",
            annee_these: "Année de thèse",
            annee_master: "Année de master",
            encadrant: "Encadrant",
            directeur: "Directeur de thèse",
            fonction: "Fonction"
        };

        return keyMapping[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    // Fonction pour formater les valeurs
    const formatValue = (key: string, value: any) => {
        if (value === null || value === undefined) return "Non spécifié";

        if (key.includes("date") || key === "createdAt") {
            return formatDate(value);
        }

        if (key === "status") {
            return (
                <Badge className={
                    value === "PENDING" ? "bg-amber-500" :
                        value === "APPROVED" ? "bg-green-500" :
                            value === "REJECTED" ? "bg-red-500" :
                                "bg-gray-500"
                }>
                    {value === "PENDING" ? "En attente" :
                        value === "APPROVED" ? "Approuvé" :
                            value === "REJECTED" ? "Rejeté" :
                                value}
                </Badge>
            );
        }

        if (key === "encadrant" || key === "directeur") {
            return (
                //button de redirection vers le profil du superviseur
                <Button
                    variant="link"
                    className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                    onClick={() => navigate(`/profile/${value.id}`)}
                >
                    {value.nom} {value.prenom}
                    <ExternalLink className="h-3 w-3" />
                </Button>
            );
        }

        return value.toString();
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await manageUserService.getRequestInfo(user_id, user_role);
            let userData = response.data;
            console.log("userData", userData);
            // Récupération des informations supplémentaires selon le role

            if (user_role === RoleEnum.DOCTORANT && userData.directeur_these_id) {

                const directeurResponse = await manageUserService.getUser(userData.directeur_these_id);
                userData = {
                    ...userData,
                    directeur: {
                        nom: directeurResponse.data.nom,
                        prenom: directeurResponse.data.prenom,
                        id: directeurResponse.data.id
                    }
                };
            } else if ((user_role === RoleEnum.MASTER) && userData.encadrant_id) {
                console.log("encadrant_id", userData.encadrant_id);
                const encadrantResponse = await manageUserService.getUser(userData.encadrant_id);
                userData = {
                    ...userData,
                    encadrant: {
                        nom: encadrantResponse.data.nom,
                        prenom: encadrantResponse.data.prenom,
                        id: encadrantResponse.data.id
                    }
                };
            }
            setRequests(userData);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des informations:", error);
            toast.error("Une erreur s'est produite lors de la récupération des informations.");
        } finally {
            setLoading(false);
        }
    };

    // useEffect pour charger les données
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (user_id && user_role) {
            fetchData();
        }
    }, [user_id, user_role]);

    // Préparer les groupes de champs selon le rôle
    const getFieldGroups = () => {
        // Champs communs à tous les rôles
        const common = [
            {
                title: "Informations personnelles",
                icon: <UserPlus className="h-5 w-5 text-blue-500" />,
                fields: ["email", "cin", "telephone"]
            },
            {
                title: "Informations de la demande",
                icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
                fields: ["createdAt", "status"]
            }
        ];

        // Champs spécifiques selon le rôle
        if (user_role === RoleEnum.DOCTORANT) {
            return [
                ...common,
                {
                    title: "Informations académiques",
                    icon: <GraduationCap className="h-5 w-5 text-purple-500" />,
                    fields: ["specialite", "laboratoire", "annee_these", "directeur"]
                }
            ];
        } else if (user_role === RoleEnum.MASTER) {
            return [
                ...common,
                {
                    title: "Informations académiques",
                    icon: <GraduationCap className="h-5 w-5 text-purple-500" />,
                    fields: ["specialite", "annee_master", "encadrant"]
                }
            ];
        } else if (user_role === RoleEnum.ENSEIGNANT || user_role === RoleEnum.DIRECTEUR) {
            return [
                ...common,
                {
                    title: "Informations professionnelles",
                    icon: <Briefcase className="h-5 w-5 text-purple-500" />,
                    fields: ["grade", "fonction", "specialite", "etablissement"]
                }
            ];
        }

        return common;
    };

    const handleApprove = async () => {
        try {
            setLoading(true);

            await manageUserService.acceptUser(user_id, user_role, true);
            toast.success("Demande approuvée avec succès!");

            fetchData();
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'approbation:", error);
            toast.error("Une erreur s'est produite lors de l'approbation.");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        try {
            setLoading(true);
            // Supposons qu'il y a une méthode pour rejeter la demande
            await manageUserService.acceptUser(user_id, user_role, false, reason);
            toast.error("Demande rejetée!");


            fetchData();
        } catch (error) {
            console.error("Une erreur s'est produite lors du rejet:", error);
            toast.error("Une erreur s'est produite lors du rejet.");
        } finally {
            setLoading(false);
        }
    };

    const renderRequestFields = () => {
        if (!requests || Object.keys(requests).length === 0) {
            return (
                <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                        <XCircle className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium">Aucune information disponible</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Les détails de cette demande ne sont pas disponibles pour le moment.
                        </p>
                    </div>
                </div>
            );
        }

        const fieldGroups = getFieldGroups();

        return (
            <div className="space-y-6">
                {fieldGroups.map((group) => {
                    // Filtrer les champs qui existent dans les données
                    const relevantFields = group.fields.filter(
                        field => requests[field] !== undefined ||
                            (field === "directeur" && requests.directeur) ||
                            (field === "encadrant" && requests.encadrant)
                    );

                    if (relevantFields.length === 0) return null;

                    return (
                        <div key={group.title} className="rounded-lg bg-gray-50 p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                {group.icon}
                                <h3 className="font-semibold text-gray-800">{group.title}</h3>
                            </div>
                            <Separator className="mb-4" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {relevantFields.map((key) => (
                                    <div key={key} className="flex flex-col">
                                        <span className="text-sm text-gray-500 mb-1">{formatKey(key)}</span>
                                        <div className="font-medium">
                                            {formatValue(key,
                                                key === "directeur" ? requests.directeur :
                                                    key === "encadrant" ? requests.encadrant :
                                                        requests[key]
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    //traduction du role 
    const translateRole = (role: string) => {
        const roleMapping: Record<string, string> = {
            ADMIN: "Administrateur",
            ENSEIGNANT: "Enseignant",
            DIRECTEUR: "Directeur",
            DOCTORANT: "Doctorant",
            MASTER: "Master",

        };

        return roleMapping[role] || role;
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {loading && <LoadingOverlay loadingText="Chargement des données..." />}

            <div className="container mx-auto py-8 px-4">
                <Card className="shadow-lg bg-card text-card-foreground">
                    <CardHeader className="border-b bg-muted">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex-shrink-0 relative">
                                <img
                                    src={requests?.photo || "/placeholder-user.png"}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-background shadow"
                                    alt="Photo de profil"
                                />
                                <Badge className="absolute -top-2 -right-2 bg-primary">
                                    {user_role && translateRole(user_role)}
                                </Badge>
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold">
                                    {requests?.nom || '...'} {requests?.prenom || '...'}
                                </CardTitle>
                                <CardDescription className="text-base">
                                    Demande d'adhésion - {user_role && translateRole(user_role)}
                                </CardDescription>
                                {requests?.status && (
                                    <div className="mt-2">
                                        {formatValue("status", requests.status)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
                        {renderRequestFields()}
                    </CardContent>

                    {requests?.status === "PENDING" && (
                        <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 p-6 bg-muted">
                            <Button variant="outline" onClick={() => setIsOpen(true)} className="w-full sm:w-auto">
                                <XCircle className="mr-2 h-4 w-4" />
                                Rejeter la demande
                            </Button>
                            <Button onClick={handleApprove} className="w-full sm:w-auto">
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Approuver la demande
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <div className={`${isOpen ? 'fixed inset-0 bg-black/20 backdrop-blur-sm z-40' : ''}`} />
                <DialogContent className="sm:max-w-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-card text-card-foreground rounded-lg p-6 shadow-lg">
                    <DialogHeader>
                        <DialogTitle>Motif du rejet</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Entrez le motif du rejet"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <DialogFooter className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={() => setIsOpen(false)}>
                            Annuler
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleReject}
                            disabled={!reason.trim()}
                        >
                            Confirmer le rejet
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MemberAddRequest;