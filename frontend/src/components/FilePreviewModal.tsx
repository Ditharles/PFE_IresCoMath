import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { FileIcon, DownloadIcon, X, ExternalLink } from "lucide-react";

interface FilePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileUrl: string;
    fileName?: string;
    mimeType?: string;
}

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

const FilePreviewModal = ({
    isOpen,
    onClose,
    fileUrl,
    fileName,
    mimeType,
}: FilePreviewModalProps) => {
    const [isImage, setIsImage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isOpen) return;

        const detectFileType = async () => {
            setIsLoading(true);

            try {
                let detectedType = mimeType;

                if (!detectedType) {
                    const response = await fetch(fileUrl, { method: 'HEAD' });
                    detectedType = response.headers.get('content-type') || '';
                }

                setIsImage(detectedType ? SUPPORTED_IMAGE_TYPES.includes(detectedType) : false);
            } catch (error) {
                console.error("Erreur de détection du type de fichier:", error);
                setIsImage(false);
            } finally {
                setIsLoading(false);
            }
        };

        detectFileType();
    }, [isOpen, fileUrl, mimeType]);

    const renderPreviewContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="animate-pulse flex flex-col items-center">
                        <FileIcon className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Détection du type de fichier...</p>
                    </div>
                </div>
            );
        }

        if (isImage) {
            return (
                <div className="flex flex-col items-center w-full h-full">
                    <div className="relative max-h-[70vh] max-w-full">
                        <img
                            src={fileUrl}
                            alt={fileName || "Aperçu de l'image"}
                            className="max-h-[70vh] max-w-full object-contain rounded-lg border shadow-sm"
                            onError={() => setIsImage(false)}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <FileIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                    Aperçu non disponible
                </h3>
                <p className="text-muted-foreground mb-6">
                    Ce fichier ne peut pas être prévisualisé ici.
                </p>
                <div className="flex flex-col items-center gap-3">
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground 
                        rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Parcourir
                    </a>
                    <a
                        href={fileUrl}
                        download={fileName || true}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground 
                        rounded-lg hover:bg-secondary/90 transition-colors shadow-sm"
                    >
                        <DownloadIcon className="h-4 w-4" />
                        Télécharger
                    </a>
                </div>
            </div>
        );
    };

    // Pour les images, on garde le bouton télécharger en bas
    const renderDownloadButton = () => {
        if (isLoading || !isImage) return null;

        return (
            <a
                href={fileUrl}
                download={fileName || true}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 
                 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground 
                 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
                <DownloadIcon className="h-4 w-4" />
                Télécharger
            </a>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="max-w-[90vw] max-h-[90vh] w-full h-full p-0 overflow-hidden border-0 bg-transparent"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <div className="relative h-full w-full bg-background rounded-xl shadow-xl overflow-hidden">
                    {/* Bouton fermer */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 
                     text-foreground/70 hover:text-foreground hover:bg-background/90 
                     transition-colors shadow-sm border"
                        aria-label="Fermer la fenêtre"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Zone d'aperçu */}
                    <div className="h-full w-full flex items-center justify-center p-6 pt-14 pb-24">
                        {fileUrl ? renderPreviewContent() : (
                            <div className="text-center">
                                <FileIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-muted-foreground">Aucun fichier à afficher</p>
                            </div>
                        )}
                    </div>

                    {/* Bouton télécharger pour les images */}
                    {renderDownloadButton()}

                    {/* Footer info fichier */}
                    {fileUrl && !isLoading && (
                        <div className="absolute bottom-4 left-0 w-full px-6 text-center">
                            <p className="text-sm text-muted-foreground truncate max-w-full">
                                {fileName || fileUrl.split('/').pop() || 'Fichier'}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FilePreviewModal;