
import { FileText, ClipboardList } from "lucide-react";

import { toast } from "sonner";

import { DetailSection } from "../DetailSection";
import { DetailItem } from "../DetailItem";
import FileUpload from "../../../../FileUpload";


import { RequestStage } from "../../../../../types/request";
import { formatDate } from "../../../../../utils/utils";
import TemplateService from "../../../../../services/templates.service";

import { FileListViewer } from "../FileListViewer";

export const InternshipDetails = ({ stage, onPreview, isDirector = false }: {
    stage: RequestStage;
    onPreview: (url: string) => void;
    isDirector?: boolean;
}) => {

    const templateService = new TemplateService();

    const handleSignFormUpload = async (urls: string[] | string) => {
        const url = Array.isArray(urls) ? urls[0] : urls;
        try {
            await templateService.sendSignForm(stage.id, url);
            toast.success("Formulaire signé envoyé avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire signé:", error);
            toast.error("Erreur lors de l'envoi du formulaire signé");
        } 
    };

    return (
        <>
            <DetailSection
                icon={<ClipboardList className="h-5 w-5 text-primary" />}
                title="Détails du stage"
            >
                <DetailItem label="Organisation" value={stage.organization} />
                <DetailItem label="Email de l'organisation" value={stage.organizationEmail} />
                {stage.organizationUrl && (
                    <DetailItem label="Site web" value={stage.organizationUrl} />
                )}
                <DetailItem label="Superviseur" value={stage.supervisor} />
                <DetailItem label="Email du superviseur" value={stage.supervisorEmail} />
                {stage.supervisorPhone && (
                    <DetailItem label="Téléphone du superviseur" value={stage.supervisorPhone} />
                )}
                <DetailItem label="Pays" value={stage.country} />
                <DetailItem label="Date de début" value={formatDate(stage.startDate)} />
                <DetailItem label="Date de fin" value={formatDate(stage.endDate)} />
            </DetailSection>

            {/* Section Formulaire */}
            {stage.letter && (
                <DetailSection
                    icon={<FileText className="h-5 w-5 text-success" />}
                    title="Documents associés"
                >
                    <DetailItem label="Lettre de stage">
                        <FileListViewer
                            files={[stage.letter]}
                            onPreview={onPreview}
                        />
                    </DetailItem>
                </DetailSection>
            )}
            {(() => {
                let formSectionContent;
                if (!stage.signForm) {
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
                            <div className="text-sm text-gray-600 mb-2 block">
                                Le formulaire signé sera disponible après approbation par le directeur.
                            </div>
                        );
                    }
                } else {
                    formSectionContent = (
                        <FileListViewer files={[stage.signForm]} onPreview={onPreview} />
                    );
                }
                return (
                    <DetailSection icon={<FileText className="h-5 w-5 text-blue-500" />} title="Formulaire">
                        {isDirector && stage.awaitForm && (
                            <>
                                <FileListViewer files={[stage.awaitForm]} onPreview={onPreview} />
                                <div className="flex flex-col gap-4 md:col-span-2">
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={stage.awaitForm}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary underline font-medium"
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

        </>
    );
};