import { useState } from "react";
import { FileText } from "lucide-react";
import { RepairMaintenance as RepairMaintenanceType, RequestStatus } from "../../../../../types/request";
import { DetailItem } from "../DetailItem";
import { DetailSection } from "../DetailSection";
import { FileListViewer } from "../FileListViewer";
import FileUpload from "../../../../FileUpload";
import { Button } from "../../../../ui/button";
import RequestsService from "../../../../../services/requests.service";
import TemplateService from "../../../../../services/templates.service";
import { toast } from "sonner";

interface RepairMaintenanceProps {
    fetchData: () => void;
    repairMaintenance: RepairMaintenanceType;
    onPreview: (url: string) => void;
    status: RequestStatus;
    isDirector?: boolean;
}

const RepairMaintenance = ({
    fetchData,
    repairMaintenance,
    onPreview,
    status,
    isDirector = false
}: RepairMaintenanceProps) => {
    const [documentStates, setDocumentStates] = useState<string[]>([]);
    const [isUploadingSignForm, setIsUploadingSignForm] = useState(false);
    const requestsService = new RequestsService();
    const templateService = new TemplateService();

    const handleSubmit = async () => {
        try {
            const response = await requestsService.addDocuments(repairMaintenance.id, documentStates);
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Erreur lors de la soumission des photos');
            console.error(error);
        } finally {
            fetchData();
            setDocumentStates([]);
            window.location.reload();
        }
    };

    const handlePhotosUpload = (urls: string[] | string) => {
        const url = Array.isArray(urls) ? urls[0] : urls;
        setDocumentStates((prev) => [...prev, url]);
    };

    const handleSignFormUpload = async (urls: string[] | string) => {
        setIsUploadingSignForm(true);
        const url = Array.isArray(urls) ? urls[0] : urls;
        try {
            await templateService.sendSignForm(repairMaintenance.id, url);
            toast.success("Formulaire signé envoyé avec succès !");
        } catch (error) {
            toast.error("Erreur lors de l'envoi du formulaire signé");
        } finally {
            setIsUploadingSignForm(false);
            fetchData();
        }
    };

    return (
        <div className="space-y-6 bg-background text-foreground">
            <DetailSection icon={<FileText className="h-5 w-5 text-primary" />} title="Détails de la réparation/maintenance">
                <div className="grid grid-cols-1 gap-4">
                    <DetailItem label="Description" value={repairMaintenance.description} />
                </div>
            </DetailSection>

            {repairMaintenance.photos?.length > 0 && (
                <DetailSection icon={<FileText className="h-5 w-5 text-primary" />} title="Photos soumises">
                    <div className="mt-2">
                        <FileListViewer files={repairMaintenance.photos} onPreview={onPreview} />
                    </div>
                </DetailSection>
            )}

            {status === "APPROVED" && (
                <>
                    {!isDirector && (
                        <DetailSection icon={<FileText className="h-5 w-5 text-primary" />} title="Soumettre des photos">
                            <div className="space-y-4">
                                <div className="text-sm text-muted-foreground mb-2">
                                    {documentStates.length > 0
                                        ? `${documentStates.length} photo(s) prête(s) à être soumise(s)`
                                        : "Aucune photo sélectionnée"}
                                </div>

                                <div className="flex flex-col gap-4">
                                    {documentStates.length < 10 && repairMaintenance.photos?.length < 10 && (
                                        <FileUpload
                                            endpoint="repairMaintenancePhotos"
                                            maxFiles={10 - documentStates.length}
                                            acceptedTypes={["image/*"]}
                                            headerText="Téléversement de photos"
                                            subHeaderText={`Maximum ${10 - documentStates.length} fichier(s) autorisé(s)`}
                                            onFileUploaded={handlePhotosUpload}
                                        />
                                    )}

                                    {documentStates.length > 0 && (
                                        <div className="flex justify-end mt-2">
                                            <Button onClick={handleSubmit} className="px-4 py-2">
                                                Soumettre les photos
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </DetailSection>
                    )}
                </>
            )}

            {/* Section Formulaire */}
            {(() => {
                let formSectionContent;
                if (!repairMaintenance.signForm) {
                    if (isDirector) {
                        formSectionContent = (
                            <div>
                                <span className="text-sm text-muted-foreground mb-2 block">
                                    Téléverser le formulaire signé (format Word ou PDF)
                                </span>
                                <FileUpload
                                    endpoint="templateSign"
                                    maxFiles={1}
                                    acceptedTypes={[
                                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                        "application/msword",
                                        "application/pdf"
                                    ]}
                                    headerText="Téléversement du formulaire signé"
                                    subHeaderText="Format accepté : .docx, .doc, .pdf"
                                    onFileUploaded={handleSignFormUpload}
                                />
                            </div>
                        );
                    } else {
                        formSectionContent = (
                            <div className="text-sm text-muted-foreground mb-2 block">
                                Le formulaire signé sera disponible après approbation par le directeur.
                            </div>
                        );
                    }
                } else {
                    formSectionContent = (
                        <FileListViewer files={[repairMaintenance.signForm]} onPreview={onPreview} />
                    );
                }
                return (
                    <DetailSection icon={<FileText className="h-5 w-5 text-primary" />} title="Formulaire">
                        {isDirector && repairMaintenance.awaitForm && (
                            <>
                                <FileListViewer files={[repairMaintenance.awaitForm]} onPreview={onPreview} />
                                <div className="flex flex-col gap-4 md:col-span-2">
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={repairMaintenance.awaitForm}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:text-primary/80 underline font-medium transition-colors"
                                            download
                                        >
                                            Télécharger le formulaire à signer
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}
                        {formSectionContent}
                    </DetailSection>
                );
            })()}
        </div>
    );
};

export default RepairMaintenance;