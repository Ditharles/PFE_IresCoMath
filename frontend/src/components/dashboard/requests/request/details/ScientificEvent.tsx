
import { FileText, Calendar } from "lucide-react";
import { ScientificEvent as ScientificEventType } from "../../../../../types/request";
import { DetailItem } from "../DetailItem";
import { DetailSection } from "../DetailSection";
import { FileListViewer } from "../FileListViewer";
import FileUpload from "../../../../FileUpload";
import TemplateService from "../../../../../services/templates.service";
import { toast } from "sonner";

import { formatDate } from "../../../../../utils/utils";
import { Mail } from "lucide-react";

interface ScientificEventProps {
    scientificEvent: ScientificEventType;
    isDirector?: boolean;
    onPreview: (url: string) => void;
}

const ScientificEvent = ({ scientificEvent, isDirector = false, onPreview }: ScientificEventProps) => {

    const templateService = new TemplateService();

    const handleSignFormUpload = async (urls: string[] | string) => {

        const url = Array.isArray(urls) ? urls[0] : urls;
        try {
            await templateService.sendSignForm(scientificEvent.id, url);
            toast.success("Formulaire signé envoyé avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire signé:", error);
            toast.error("Erreur lors de l'envoi du formulaire signé");
        }
    };

    return (
        <>
            <DetailSection
                icon={<Calendar className="h-5 w-5 text-red-500" />}
                title="Détails de la conférence">
                <DetailItem label="Titre" value={scientificEvent.title} />
                <DetailItem label="Lieu" value={scientificEvent.location} />
                {scientificEvent.urlEvent && (
                    <DetailItem
                        label="URL de l'événement"
                        value={scientificEvent.urlEvent}
                    />
                )}
                <DetailSection
                    icon={<Mail className="h-5 w-5 text-green-500" />}
                    title="Email d'acceptation">
                    <DetailItem label="Couverture de l'article">
                        <FileListViewer
                            files={[scientificEvent.mailAcceptation]}
                            onPreview={onPreview}
                        />
                    </DetailItem>
                </DetailSection>
                <DetailItem
                    label="Articles acceptés"
                    value={scientificEvent.articlesAccepted ? "Oui" : "Non"}
                />
                <DetailItem
                    label="Date de début"
                    value={formatDate(scientificEvent.startDate)}
                />
                <DetailItem
                    label="Date de fin"
                    value={formatDate(scientificEvent.endDate)}
                />
            </DetailSection>

            {scientificEvent.articleCover && (
                <DetailSection
                    icon={<FileText className="h-5 w-5 text-green-500" />}
                    title="Documents associés">
                    <DetailItem label="Couverture de l'article">
                        <FileListViewer
                            files={[scientificEvent.articleCover]}
                            onPreview={onPreview}
                        />
                    </DetailItem>
                </DetailSection>
            )}

            {(() => {
                let formSectionContent;
                if (!scientificEvent.signForm) {
                    if (isDirector) {
                        formSectionContent = (
                            <div>
                                <span className="text-sm text-gray-600 mb-2 block">
                                    Téléverser le formulaire signé (format Word ou PDF)
                                </span>
                                <FileUpload
                                    endpoint="templateSign"
                                    maxFiles={1}
                                    acceptedTypes={[
                                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                        "application/msword",
                                        "application/pdf",
                                    ]}
                                    headerText="Téléversement du formulaire signé"
                                    subHeaderText="Format accepté : .docx, .doc, .pdf"
                                    onFileUploaded={handleSignFormUpload}
                                />
                            </div>
                        );
                    } else {
                        formSectionContent = (
                            <div className="text-sm text-gray-600 mb-2 block">
                                Le formulaire signé sera disponible après approbation par le
                                directeur.
                            </div>
                        );
                    }
                } else {
                    formSectionContent = (
                        <FileListViewer
                            files={[scientificEvent.signForm]}
                            onPreview={onPreview}
                        />
                    );
                }
                return (
                    <DetailSection
                        icon={<FileText className="h-5 w-5 text-blue-500" />}
                        title="Formulaire">
                        {isDirector && scientificEvent.awaitForm && (
                            <>
                                <FileListViewer
                                    files={[scientificEvent.awaitForm]}
                                    onPreview={onPreview}
                                />
                                <div className="flex flex-col gap-4 md:col-span-2">
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={scientificEvent.awaitForm}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary underline font-medium"
                                            download>
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
        </>
    );
};

export default ScientificEvent;