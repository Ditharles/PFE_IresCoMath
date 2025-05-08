import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
    XCircle, Briefcase, MapPin,
    Box, Wrench, FileText, ArrowLeft
} from "lucide-react";
import { formatDate } from "../utils/utils";
import { toast } from "../components/Toast";
import LoadingOverlay from "../components/LoadingOverlay";
import RequestsService from "../services/requests.service";
import {
    RequestType,
    EquipmentTypeList
} from "../types/request";
import RequestActions from "../components/dashboard/requests/RequestActions";
import { REQUEST_TYPE_LABELS, STATUS_BADGE_VARIANTS, STATUS_TRANSLATIONS } from "../constants/requests";
import { User } from "../types/Member";
import { Request } from "../types/request";

// Composant helper pour afficher un détail
const DetailItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-1">{label}</span>
        <span className="font-medium">
            {value != null ? value.toString() : "Non spécifié"}
        </span>
    </div>
);

// Composant générique pour les sections de détails
const DetailSection = ({ icon, title, children }) => (
    <div className="space-y-4">
        <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-semibold">{title}</h3>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
    </div>
);

const RequestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [requestData, setRequestData] = useState<
        { request: Request; user: User }>({ request: {}, user: {} });
    const [loading, setLoading] = useState(true);
    const requestService = useMemo(() => new RequestsService(), []);

    const { request, user } = requestData;

    // Récupération des données de la demande
    const fetchRequest = async () => {
        if (!id) return;

        try {
            setLoading(true);
            const response = await requestService.getRequestDetails(id);
            setRequestData({
                request: response.data.request,
                user: response.data.user
            });
        } catch (error) {
            console.error("Error fetching request details:", error);
            toast.error("Une erreur est survenue lors du chargement de la demande");
        } finally {
            setLoading(false);
        }
    };

    const handleActionComplete = () => {
        fetchRequest();
    };

    useEffect(() => {
        fetchRequest();
    }, [id]);

    // Affichage des détails spécifiques selon le type de demande
    const renderRequestSpecificDetails = () => {
        if (!request) return null;

        switch (request.type) {
            case RequestType.MISSION:
                return request.mission && (
                    <DetailSection
                        icon={<MapPin className="h-5 w-5 text-blue-500" />}
                        title="Détails de la mission"
                    >
                        <DetailItem label="Pays" value={request.mission.country} />
                        <DetailItem label="Localisation" value={request.mission.location} />
                        <DetailItem label="Objectif" value={request.mission.objective} />
                        <DetailItem label="Date de début" value={formatDate(request.mission.startDate)} />
                        <DetailItem label="Date de fin" value={formatDate(request.mission.endDate)} />
                    </DetailSection>
                );

            case RequestType.INTERNSHIP:
                return request.requestStage && (
                    <DetailSection
                        icon={<Briefcase className="h-5 w-5 text-purple-500" />}
                        title="Détails du stage"
                    >
                        <DetailItem label="Entreprise" value={request.requestStage.company} />
                        <DetailItem label="Pays" value={request.requestStage.country} />
                        <DetailItem label="Superviseur" value={request.requestStage.supervisor} />
                        <DetailItem label="Email superviseur" value={request.requestStage.supervisorEmail} />
                        <DetailItem label="Date de début" value={formatDate(request.requestStage.startDate)} />
                        <DetailItem label="Date de fin" value={formatDate(request.requestStage.endDate)} />
                    </DetailSection>
                );

            case RequestType.CONFERENCE:
                return request.scientificEvent && (
                    <DetailSection
                        icon={<FileText className="h-5 w-5 text-green-500" />}
                        title="Détails de la conférence"
                    >
                        <DetailItem label="Titre" value={request.scientificEvent.title} />
                        <DetailItem label="Localisation" value={request.scientificEvent.location} />
                        <DetailItem
                            label="Articles acceptés"
                            value={request.scientificEvent.articlesAccepted ? "Oui" : "Non"}
                        />
                        <DetailItem label="Date de début" value={formatDate(request.scientificEvent.startDate)} />
                        <DetailItem label="Date de fin" value={formatDate(request.scientificEvent.endDate)} />
                    </DetailSection>
                );

            case RequestType.EQUIPMENT_PURCHASE:
                return request.purchaseRequest && (
                    <DetailSection
                        icon={<Box className="h-5 w-5 text-orange-500" />}
                        title="Détails de l'achat"
                    >
                        <DetailItem label="Nom" value={request.purchaseRequest.name} />
                        <DetailItem
                            label="Type"
                            value={EquipmentTypeList[request.purchaseRequest.equipmentType]}
                        />
                        <DetailItem label="Quantité" value={request.purchaseRequest.quantity} />
                        <DetailItem
                            label="Coût estimé"
                            value={`${request.purchaseRequest.costEstimation} €`}
                        />
                        {request.purchaseRequest.specifications && (
                            <DetailItem
                                label="Spécifications"
                                value={typeof request.purchaseRequest.specifications === 'object'
                                    ? JSON.stringify(request.purchaseRequest.specifications)
                                    : request.purchaseRequest.specifications}
                            />
                        )}
                    </DetailSection>
                );

            case RequestType.EQUIPMENT_LOAN:
                return request.equipmentLoanRequest && (
                    <DetailSection
                        icon={<Wrench className="h-5 w-5 text-blue-500" />}
                        title="Détails du prêt"
                    >
                        {request.equipmentLoanRequest.equipment ? (
                            <>
                                <DetailItem label="Équipement" value={request.equipmentLoanRequest.equipment.name} />
                                <DetailItem
                                    label="Catégorie"
                                    value={request.equipmentLoanRequest.equipment.category.name}
                                />
                            </>
                        ) : request.equipmentLoanRequest.category ? (
                            <DetailItem
                                label="Catégorie"
                                value={request.equipmentLoanRequest.category.name}
                            />
                        ) : null}
                        <DetailItem label="Quantité" value={request.equipmentLoanRequest.quantity} />
                        <DetailItem label="Date de début" value={formatDate(request.equipmentLoanRequest.startDate)} />
                        <DetailItem label="Date de fin" value={formatDate(request.equipmentLoanRequest.endDate)} />
                    </DetailSection>
                );

            case RequestType.ARTICLE_REGISTRATION:
                return request.articleRegistration && (
                    <DetailSection
                        icon={<FileText className="h-5 w-5 text-purple-500" />}
                        title="Détails de l'inscription"
                    >
                        <DetailItem label="Conférence" value={request.articleRegistration.conference} />
                        <DetailItem label="Montant" value={`${request.articleRegistration.amount} €`} />
                    </DetailSection>
                );

            default:
                return null;
        }
    };

    // Si la requête n'est pas trouvée
    if (!request && !loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <XCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">Demande non trouvée</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        La demande que vous recherchez n'existe pas ou a été supprimée.
                    </p>
                    <Button className="mt-4" onClick={() => navigate("/requests")}>
                        Retour aux demandes
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {loading && <LoadingOverlay loadingText="Chargement des détails..." />}

            <div className="container mx-auto py-8 px-4">
                <Button
                    variant="ghost"
                    className="mb-4"
                    onClick={() => navigate("/requests")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour aux demandes
                </Button>

                {request && (
                    <Card className="shadow-lg">
                        <CardHeader className="border-b bg-white">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <CardTitle className="text-2xl font-bold">
                                        Demande {REQUEST_TYPE_LABELS[request.type]}
                                    </CardTitle>
                                    <CardDescription className="text-base">
                                        Créée le {formatDate(request.createdAt)}
                                    </CardDescription>
                                </div>
                                <Badge className={STATUS_BADGE_VARIANTS[request.status]}>
                                    {STATUS_TRANSLATIONS[request.status]}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6 space-y-6">
                            {/* Informations de base */}
                            <DetailSection
                                icon={<FileText className="h-5 w-5 text-gray-500" />}
                                title="Informations générales"
                            >
                                {user && (
                                    <>
                                        <DetailItem
                                            label="Demandeur"
                                            value={`${user.firstName} ${user.lastName}`}
                                        />
                                        <DetailItem label="Email" value={user.email} />
                                        <DetailItem label="Rôle" value={user.role} />
                                    </>
                                )}
                                <DetailItem
                                    label="Date de création"
                                    value={formatDate(request.createdAt)}
                                />
                                {request.notes && (
                                    <DetailItem label="Notes" value={request.notes} />
                                )}
                            </DetailSection>

                            {/* Détails spécifiques */}
                            {renderRequestSpecificDetails()}
                        </CardContent>

                        {/* Actions */}
                        <CardFooter className="flex justify-end p-6 bg-gray-50">
                            <RequestActions
                                requestData={requestData}
                                onActionComplete={handleActionComplete}
                            />
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default RequestDetails;
