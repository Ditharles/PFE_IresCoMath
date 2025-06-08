import { useEffect, useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { ManageUserService } from "../services/manageUser.service";
import {  useSearchParams, useNavigate } from "react-router-dom";
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
    const [reason, setReason] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const manageUserService = useMemo(() => new ManageUserService(), []);

    const user_id = searchParams.get("id");
    const user_role = searchParams.get("role") as Role | null;


    const formatKey = useCallback((key: string) => {
        const keyMapping: Record<string, string> = {
            email: "Adresse e-mail",
            phone: "Téléphone",
            cin: "CIN",
            createdAt: "Date de la demande",
            status: "Statut",
            institution: "Établissement",
            laboratoire: "Laboratoire",
            grade: "Grade",
            thesisYear: "Année de thèse",
            masterYear: "Année de master",
            supervisor: "Encadrant",
            thesisSupervisor: "Directeur de thèse",
            position: "Fonction",
        };

        return keyMapping[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }, []);

    const formatValue = useCallback((key: string, value: any) => {
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

        if ((key === "supervisor" || key === "thesisSupervisor") && value && typeof value === 'object') {
            return (
                <Button
                    variant="link"
                    className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                    onClick={() => navigate(`/profile/${value.id}`)}>
                    {value.nom} {value.prenom}
                    <ExternalLink className="h-3 w-3" />
                </Button>
            );
        }

        return value.toString();
    }, [navigate]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            if(!user_id || !user_role) return;
            const response = await manageUserService.getRequestInfo(user_id, user_role);
            setRequests(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des informations:", error);
            toast.error("Erreur lors de la récupération des informations.");
        } finally {
            setLoading(false);
        }
    }, [user_id, user_role, manageUserService]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getFieldGroups = useCallback(() => {
        const common = [
            {
                title: "Informations personnelles",
                icon: <UserPlus className="h-5 w-5 text-blue-500" />,
                fields: ["email", "cin", "phone"]
            },
            {
                title: "Informations de la demande",
                icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
                fields: ["createdAt", "status"]
            }
        ];

        if (user_role === RoleEnum.DOCTORANT) {
            return [
                ...common,
                {
                    title: "Informations académiques",
                    icon: <GraduationCap className="h-5 w-5 text-purple-500" />,
                    fields: ["thesisYear", "thesisSupervisor"]
                }
            ];
        } else if (user_role === RoleEnum.MASTER) {
            return [
                ...common,
                {
                    title: "Informations académiques",
                    icon: <GraduationCap className="h-5 w-5 text-purple-500" />,
                    fields: ["masterYear", "supervisor"]
                }
            ];
        } else if (user_role === RoleEnum.ENSEIGNANT || user_role === RoleEnum.DIRECTEUR) {
            return [
                ...common,
                {
                    title: "Informations professionnelles",
                    icon: <Briefcase className="h-5 w-5 text-purple-500" />,
                    fields: ["grade", "position", "institution"],
                },
            ];
        }

        return common;
    }, [user_role]);

    const handleApprove = async () => {
        if(!user_id || !user_role) return;
       
          try {
            setLoading(true);
            await manageUserService.acceptUser(user_id, user_role, true);
            toast.success("Demande approuvée avec succès!");
            await fetchData();
          } catch (error) {
            console.error("Erreur lors de l'approbation:", error);
            toast.error("Erreur lors de l'approbation.");
          } finally {
            setLoading(false);
          }
    };

    const handleReject = async () => {
        if (!reason.trim()) {
            toast.error("Veuillez saisir un motif de rejet");
            return;
        }
        if(!user_id || !user_role) return;

        try {
            setLoading(true);
            await manageUserService.acceptUser(user_id, user_role, false, reason);
            toast.error("Demande rejetée!");
            setIsOpen(false);
            await fetchData();
        } catch (error) {
            console.error("Erreur lors du rejet:", error);
            toast.error("Erreur lors du rejet.");
        } finally {
            setLoading(false);
        }
    };

    const renderRequestFields = useCallback(() => {
        if (!requests || Object.keys(requests).length === 0) {
            return (
                <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                        <XCircle className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium">Aucune information disponible</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Les détails de cette demande ne sont pas disponibles.
                        </p>
                    </div>
                </div>
            );
        }

        const fieldGroups = getFieldGroups();

        return (
            <div className="space-y-6">
                {fieldGroups.map((group) => {
                    const relevantFields = group.fields.filter(
                        (field) => requests[field as keyof RequestUser] !== undefined
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
                                    <div key={`${group.title}-${key}`} className="flex flex-col">
                                        <span className="text-sm text-gray-500 mb-1">{formatKey(key)}</span>
                                        <div className="font-medium">
                                            {formatValue(key, requests[key as keyof RequestUser])}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }, [requests, getFieldGroups, formatKey, formatValue]);

    const translateRole = useCallback((role: string) => {
        const roleMapping: Record<string, string> = {
            ADMIN: "Administrateur",
            ENSEIGNANT: "Enseignant",
            DIRECTEUR: "Directeur",
            DOCTORANT: "Doctorant",
            MASTER: "Master",
        };
        return roleMapping[role] || role;
    }, []);

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
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/placeholder-user.png";
                                    }}
                                />
                                <Badge className="absolute -top-2 -right-2 bg-primary">
                                    {user_role && translateRole(user_role)}
                                </Badge>
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold">
                                    {requests?.firstName || '...'} {requests?.lastName || '...'}
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
                <DialogContent className="sm:max-w-md">
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