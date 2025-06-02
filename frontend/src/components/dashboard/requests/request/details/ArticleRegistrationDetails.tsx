/* eslint-disable @typescript-eslint/no-unused-vars */
import { FileText } from "lucide-react";
import { ArticleRegistration } from "../../../../../types/request";

import { DetailItem } from "../DetailItem";
import { DetailSection } from "../DetailSection";
import { FileListViewer } from "../FileListViewer";
import { BookOpen } from "lucide-react";
import FileUpload from "../../../../FileUpload";
import TemplateService from "../../../../../services/templates.service";
import { toast } from "sonner";
import { useState } from "react";

export const ArticleRegistrationDetails = ({ articleRegistration, isDirector = false, onPreview }: {
    articleRegistration: ArticleRegistration;
    isDirector?: boolean;
    onPreview: (url: string) => void
}) => {
    const [isUploadingSignForm, setIsUploadingSignForm] = useState(false);
    const templateService = new TemplateService();

    const handleSignFormUpload = async (urls: string[] | string) => {
        setIsUploadingSignForm(true);
        const url = Array.isArray(urls) ? urls[0] : urls;
        try {
            await templateService.sendSignForm(articleRegistration.id, url);
            toast.success("Formulaire signé envoyé avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire signé:", error);
            toast.error("Erreur lors de l'envoi du formulaire signé");
        } finally {
            setIsUploadingSignForm(false);
        }
    };

    return (
        <>
            <DetailSection
                icon={<BookOpen className="h-5 w-5 text-primary" />}
                title="Détails de l'article"
            >
                <DetailItem label="Titre" value={articleRegistration.title} />
                {articleRegistration.conference && (
                    <DetailItem label="Conférence" value={articleRegistration.conference} />
                )}
                {articleRegistration.urlConference && (
                    <DetailItem label="URL de la conférence" value={articleRegistration.urlConference} />
                )}
                <DetailItem label="Montant" value={`${articleRegistration.amount} DH`} />
            </DetailSection>

            {articleRegistration.articleCover && (
                <DetailSection
                    icon={<FileText className="h-5 w-5 text-success" />}
                    title="Documents associés"
                >
                    <DetailItem label="Couverture de l'article">
                        <FileListViewer
                            files={[articleRegistration.articleCover]}
                            onPreview={onPreview}
                        />
                    </DetailItem>
                </DetailSection>
            )}

            {(() => {
                let formSectionContent;
                if (!articleRegistration.signForm) {
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
                        <FileListViewer files={[articleRegistration.signForm]} onPreview={onPreview} />
                    );
                }
                return (
                    <DetailSection icon={<FileText className="h-5 w-5 text-blue-500" />} title="Formulaire">
                        {isDirector && articleRegistration.awaitForm && (
                            <>
                                <FileListViewer files={[articleRegistration.awaitForm]} onPreview={onPreview} />
                                <div className="flex flex-col gap-4 md:col-span-2">
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={articleRegistration.awaitForm}
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