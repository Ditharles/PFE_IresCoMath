import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { FileIcon, DownloadIcon, X } from "lucide-react";

interface FilePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileUrl: string;
    fileName?: string;
}

const FilePreviewModal = ({
    isOpen,
    onClose,
    fileUrl,
    fileName,
}: FilePreviewModalProps) => {
    const [isImage, setIsImage] = useState(true);

    const renderPreview = () => {
        if (!fileUrl) return null;

        if (isImage) {
            return (
                <div className="flex flex-col items-center justify-center w-full h-full p-4">
                    <div className="max-h-[70vh] max-w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-md overflow-hidden">
                        <img
                            src={fileUrl}
                            alt={fileName || "Image preview"}
                            className="object-contain max-h-[70vh] w-auto"
                            onError={() => setIsImage(false)}
                        />
                    </div>
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="flex items-center gap-2 text-blue-600 hover:underline mt-4"
                    >
                        <DownloadIcon className="h-4 w-4" />
                        Télécharger le fichier
                    </a>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center w-full h-full p-4">
                <iframe
                    src={fileUrl}
                    title={fileName || "File preview"}
                    className="w-full h-[70vh] rounded-lg border border-gray-300 dark:border-gray-700 shadow-md"
                />
                <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center gap-2 text-blue-600 hover:underline mt-4"
                >
                    <DownloadIcon className="h-4 w-4" />
                    Télécharger le fichier
                </a>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] max-h-[90vh] w-full bg-transparent border-0 shadow-none p-0 overflow-hidden">
                <div className="relative z-10 h-full w-full bg-background text-foreground backdrop-blur-md rounded-2xl shadow-xl p-6 flex justify-center items-center overflow-hidden">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    {fileUrl ? (
                        renderPreview()
                    ) : (
                        <div className="text-center p-8">
                            <FileIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-gray-600">Aucun fichier à afficher</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FilePreviewModal;
