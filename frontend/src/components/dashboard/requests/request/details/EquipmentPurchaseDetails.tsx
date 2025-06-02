/* eslint-disable @typescript-eslint/no-unused-vars */
import { ShoppingCart, FileText } from "lucide-react";
import { PurchaseRequest } from "../../../../../types/request"
import { DetailItem } from "../DetailItem";
import { DetailSection } from "../DetailSection";
import { FileListViewer } from "../FileListViewer";
import FileUpload from "../../../../FileUpload";
import TemplateService from "../../../../../services/templates.service";
import { toast } from "sonner";
import { useState } from "react";

const EquipmentPurchaseDetails = ({ purchaseRequest, onPreview, isDirector = false }: { purchaseRequest: PurchaseRequest; onPreview: (url: string) => void, isDirector?: boolean }) => {
    const [isUploadingSignForm, setIsUploadingSignForm] = useState(false);
    const templateService = new TemplateService();

    const handleSignFormUpload = async (urls: string[] | string) => {
        setIsUploadingSignForm(true);
        const url = Array.isArray(urls) ? urls[0] : urls;
        try {
            await templateService.sendSignForm(purchaseRequest.id, url);
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
                icon={<ShoppingCart className="h-5 w-5 text-primary" />}
                title="Détails de l'achat"
            >
                <DetailItem label="Type d'équipement" value={purchaseRequest.equipmentType} />
                <DetailItem label="Nom" value={purchaseRequest.name} />
                {purchaseRequest.url && (
                    <DetailItem label="URL de référence" value={purchaseRequest.url} />
                )}
                <DetailItem label="Quantité" value={purchaseRequest.quantity} />
                <DetailItem label="Coût estimé" value={`${purchaseRequest.costEstimation} DH`} />
            </DetailSection>


            {purchaseRequest.photo && (
                <DetailSection
                    icon={<FileText className="h-5 w-5 text-success" />}
                    title="Documents associés"
                >
                    <DetailItem label="Photo de l'équipement">
                        <FileListViewer
                            files={[purchaseRequest.photo]}
                            onPreview={onPreview}
                        />
                    </DetailItem>
                </DetailSection>
            )}

            {(() => {
                let formSectionContent;
                if (!purchaseRequest.signForm) {
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
                        <FileListViewer files={[purchaseRequest.signForm]} onPreview={onPreview} />
                    );
                }
                return (
                    <DetailSection icon={<FileText className="h-5 w-5 text-blue-500" />} title="Formulaire">
                        {isDirector && purchaseRequest.awaitForm && (
                            <>
                                <FileListViewer files={[purchaseRequest.awaitForm]} onPreview={onPreview} />
                                <div className="flex flex-col gap-4 md:col-span-2">
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={purchaseRequest.awaitForm}
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
    )
}

export default EquipmentPurchaseDetails