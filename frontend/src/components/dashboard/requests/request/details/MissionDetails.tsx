import { useState } from "react";
import { MapPin, FileText } from "lucide-react";
import { Mission, RequestStatus } from "../../../../../types/request";
import { formatDate } from "../../../../../utils/utils";
import { DetailItem } from "../DetailItem";
import { DetailSection } from "../DetailSection";
import { FileListViewer } from "../FileListViewer";
import FileUpload from "../../../../FileUpload";
import { Button } from "../../../../ui/button";
import RequestsService from "../../../../../services/requests.service";
import { toast } from "../../../../Toast";

export const MissionDetails = ({
    fetchData,
    mission,
    onPreview,
    status,
}: {
    fetchData: () => void;
    mission: Mission;
    onPreview: (url: string) => void;
    status: RequestStatus;
}) => {
    const [documentStates, setDocumentStates] = useState<string[]>([]);
    const requestsService = new RequestsService();

    const handleSubmit = async () => {
        try {
            const response = await requestsService.addDocuments(mission.id, documentStates);
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Erreur lors de la soumission de justificatifs');
            console.error(error);
        } finally {
            fetchData();
            setDocumentStates([]);
            window.location.reload();
        }
    };

    const handlePhotosUpload = (urls: string[] | string) => {
        if (Array.isArray(urls)) {
            urls = urls[0];
        }
        setDocumentStates((prev) => [...prev, urls]);
    };

    return (
        <div className="space-y-6">

            <DetailSection
                icon={<MapPin className="h-5 w-5 text-blue-500" />}
                title="Détails de la mission"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem label="Organisation d'accueil" value={mission.hostOrganization} />
                    <DetailItem label="Pays" value={mission.country} />
                    <DetailItem label="Objectif" value={mission.objective} />
                    <DetailItem label="Date de début" value={formatDate(mission.startDate)} />
                    <DetailItem label="Date de fin" value={formatDate(mission.endDate)} />
                </div>
            </DetailSection>

            {mission.specificDocument?.length > 0 && (
                <DetailSection
                    icon={<FileText className="h-5 w-5 text-green-500" />}
                    title="Documents soumis pour appuyer la requête"
                >
                    <div className="mt-2">
                        <FileListViewer files={mission.specificDocument} onPreview={onPreview} />
                    </div>
                </DetailSection>
            )}


            {status === "APPROVED" && (
                <>

                    {mission.document?.length > 0 && (
                        <DetailSection
                            icon={<FileText className="h-5 w-5 text-green-500" />}
                            title="Justificatifs existants"
                        >
                            <div className="mt-2">
                                <FileListViewer files={mission.document} onPreview={onPreview} />
                            </div>
                        </DetailSection>
                    )}

                    <DetailSection
                        icon={<FileText className="h-5 w-5 text-green-500" />}
                        title="Soumettre des justificatifs"
                    >
                        <div className="space-y-4">
                            <div className="text-sm text-gray-600 mb-2">
                                {documentStates.length > 0
                                    ? `${documentStates.length} photo(s) prête(s) à être soumise(s)`
                                    : "Aucun document sélectionné"}
                            </div>

                            <div className="flex flex-col gap-4">
                                {documentStates.length < 10 && mission.document?.length < 10 && (
                                    <div className="w-full">
                                        <FileUpload
                                            endpoint="missionDocuments"
                                            maxFiles={10 - documentStates.length}
                                            acceptedTypes={["image/*"]}
                                            headerText="Téléversement de justificatifs"
                                            subHeaderText={`Maximum ${10 - documentStates.length} fichier(s) autorisé(s)`}
                                            onFileUploaded={handlePhotosUpload}
                                        />
                                    </div>
                                )}

                                {documentStates.length > 0 && (
                                    <div className="flex justify-end mt-2">
                                        <Button
                                            onClick={handleSubmit}
                                            className="px-4 py-2"
                                        >
                                            Soumettre les justificatifs
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </DetailSection>
                </>
            )}
        </div>
    );
};