import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    FileText, ArrowLeft, Calendar
} from "lucide-react";

import { DetailItem } from "../../components/dashboard/requests/request/DetailItem";
import { ArticleRegistrationDetails } from "../../components/dashboard/requests/request/details/ArticleRegistrationDetails";
import EquipmentLoanDetails from "../../components/dashboard/requests/request/details/EquipmentLoanDetails";
import EquipmentPurchaseDetails from "../../components/dashboard/requests/request/details/EquipmentPurchaseDetails";
import { InternshipDetails } from "../../components/dashboard/requests/request/details/InternshipDetails";
import { MissionDetails } from "../../components/dashboard/requests/request/details/MissionDetails";
import { DetailSection } from "../../components/dashboard/requests/request/DetailSection";
import { FileListViewer } from "../../components/dashboard/requests/request/FileListViewer";
import { NotFoundComponent } from "../../components/dashboard/requests/request/NotFoundComponent";
import RequestActions from "../../components/dashboard/requests/request/RequestActions";
import LoadingOverlay from "../../components/LoadingOverlay";
import { REQUEST_TYPE_LABELS, STATUS_BADGE_VARIANTS, STATUS_TRANSLATIONS } from "../../constants/requests";
import { useAuth } from "../../contexts/AuthContext";
import RequestsService from "../../services/requests.service";
import { RequestStatus } from "../../types/MemberAddRequest";
import { RequestType, Role } from "../../types/request";
import { formatDate } from "../../utils/utils";

import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";


const RequestDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [requestData, setRequestData] = useState<{ request: any; user: any }>({ request: {}, user: {} });
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [previewFile, setPreviewFile] = useState<string | null>(null);
    const requestService = useMemo(() => new RequestsService(), []);

    const { request } = requestData;

    const fetchRequest = async () => {
        if (!id) return;

        try {
            setLoading(true);
            const response = await requestService.getRequestDetails(id);
            let requestDetails = response.data.request;
            switch (requestDetails.type) {
                case RequestType.MISSION:
                    requestDetails.mission.awaitForm = requestDetails.awaitForm;
                    requestDetails.mission.signForm = requestDetails.signForm;
                    break;
                case RequestType.INTERNSHIP:
                    requestDetails.stage.awaitForm = requestDetails.awaitForm;
                    requestDetails.stage.signForm = requestDetails.signForm;
                    break;
                case RequestType.EQUIPMENT_PURCHASE:
                    requestDetails.purchaseRequest.awaitForm = requestDetails.awaitForm;
                    requestDetails.purchaseRequest.signForm = requestDetails.signForm;
                    break;
                case RequestType.EQUIPMENT_LOAN:
                    requestDetails.loanRequest.awaitForm = requestDetails.awaitForm;
                    requestDetails.loanRequest.signForm = requestDetails.signForm;
                    break;
                case RequestType.ARTICLE_REGISTRATION:
                    requestDetails.articleRegistration.awaitForm = requestDetails.awaitForm;
                    requestDetails.articleRegistration.signForm = requestDetails.signForm;
                    break;
                default:
                    break;
            }
            setRequestData({
                request: requestDetails,
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

    const renderRequestSpecificDetails = () => {
        if (!request) return null;

        switch (request.type) {
            case RequestType.MISSION:
                return request.mission && (
                    <MissionDetails mission={request.mission} onPreview={setPreviewFile} status={request.status} fetchData={fetchRequest} />
                );

            case RequestType.INTERNSHIP:
                return request.stage && (
                    <InternshipDetails stage={request.stage} onPreview={setPreviewFile} />
                );

            case RequestType.EQUIPMENT_PURCHASE:
                return request.purchaseRequest && <EquipmentPurchaseDetails purchaseRequest={request.purchaseRequest} onPreview={setPreviewFile} />

            case RequestType.EQUIPMENT_LOAN:
                return request.loanRequest && (
                    <EquipmentLoanDetails loanRequest={request.loanRequest} />
                );

            case RequestType.ARTICLE_REGISTRATION:
                return request.articleRegistration && (
                    <ArticleRegistrationDetails articleRegistration={request.articleRegistration} onPreview={setPreviewFile} />
                );

            case RequestType.CONFERENCE_NATIONAL:
                return request.scientificEvent && (
                    <>
                        <DetailSection
                            icon={<Calendar className="h-5 w-5 text-red-500" />}
                            title="Détails de la conférence"
                        >
                            <DetailItem label="Titre" value={request.scientificEvent.title} />
                            <DetailItem label="Lieu" value={request.scientificEvent.location} />
                            {request.scientificEvent.urlEvent && (
                                <DetailItem label="URL de l'événement" value={request.scientificEvent.urlEvent} />
                            )}
                            <DetailItem label="Email d'acceptation" value={request.scientificEvent.mailAcceptation} />
                            <DetailItem label="Articles acceptés" value={request.scientificEvent.articlesAccepted ? "Oui" : "Non"} />
                            <DetailItem label="Date de début" value={formatDate(request.scientificEvent.startDate)} />
                            <DetailItem label="Date de fin" value={formatDate(request.scientificEvent.endDate)} />
                        </DetailSection>

                        {request.scientificEvent.articleCover && (
                            <DetailSection
                                icon={<FileText className="h-5 w-5 text-green-500" />}
                                title="Documents associés"
                            >
                                <DetailItem label="Couverture de l'article">
                                    <FileListViewer
                                        files={[request.scientificEvent.articleCover]}
                                        onPreview={setPreviewFile}
                                    />
                                </DetailItem>
                            </DetailSection>
                        )}
                    </>
                );

            default:
                return null;
        }
    };

    if (!request && !loading) {
        return <NotFoundComponent />;
    }

    return (
        <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
            {loading && <LoadingOverlay loadingText="Chargement des détails..." />}

            <div className="container mx-auto py-8 px-4">
                <Button
                    variant="ghost"
                    className="mb-4"
                    onClick={() => user?.role === Role.DIRECTEUR ? navigate("/demandes") : navigate("/historique")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour aux demandes
                </Button>

                {request && (
                    <Card className="shadow-lg mb-6">
                        <CardHeader className="border-b bg-background">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <CardTitle className="text-2xl font-bold">
                                        Demande {REQUEST_TYPE_LABELS[request.type as RequestType]}
                                    </CardTitle>
                                    <CardDescription className="text-base">
                                        Créée le {formatDate(request.createdAt)}
                                    </CardDescription>
                                </div>
                                <Badge className={STATUS_BADGE_VARIANTS[request.status as RequestStatus]}>
                                    {STATUS_TRANSLATIONS[request.status as RequestStatus]}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6 space-y-6">
                            <DetailSection
                                icon={<FileText className="h-5 w-5 text-gray-500" />}
                                title="Informations générales"
                            >
                                {requestData.user && (
                                    <>
                                        <DetailItem
                                            label="Demandeur"
                                            value={`${requestData.user.firstName} ${requestData.user.lastName}`}
                                        />
                                        <DetailItem label="Email" value={requestData.user.email} />
                                        <DetailItem label="Rôle" value={requestData.user.role} />
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

                            {renderRequestSpecificDetails()}
                        </CardContent>

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