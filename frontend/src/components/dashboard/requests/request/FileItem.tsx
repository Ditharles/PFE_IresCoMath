import { useState, useEffect } from "react";
import FilePreviewModal from "../../../FilePreviewModal";
import { FileTextIcon, DownloadIcon, FileIcon } from "lucide-react";

interface FileItemProps {
    fileUrl: string;
    fileName?: string;
    mimeType?: string;
    onPreview?: (url: string) => void;
}

const FileItem = ({ fileUrl, fileName, mimeType, onPreview }: FileItemProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewState, setPreviewState] = useState<'loading' | 'available' | 'unsupported' | 'error'>('loading');

    useEffect(() => {
        const checkFileType = async () => {
            try {
                const response = await fetch(fileUrl, { method: 'HEAD' });
                const contentType = response.headers.get('content-type') || mimeType;

                if (contentType?.startsWith('image/')) {
                    setPreviewState('available');
                } else if (contentType && ['application/pdf', 'text/plain'].includes(contentType)) {
                    setPreviewState('available');
                } else {
                    setPreviewState('unsupported');
                }
            } catch (error) {
                console.error("Erreur lors de la vérification du type de fichier:", error);
                setPreviewState('error');
            }
        };

        checkFileType();
    }, [fileUrl, mimeType]);

    const handlePreviewClick = () => {
        if (previewState === 'unsupported') {
            window.open(fileUrl, '_blank');
            return;
        }

        setIsModalOpen(true);
        onPreview?.(fileUrl);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        onPreview?.("");
    };

    const renderFileIcon = () => {
        switch (previewState) {
            case 'available':
                return <FileTextIcon className="h-6 w-6 text-blue-500" />;
            case 'unsupported':
                return <DownloadIcon className="h-6 w-6 text-gray-500" />;
            case 'error':
                return <FileIcon className="h-6 w-6 text-red-500" />;
            default:
                return <FileIcon className="h-6 w-6 text-gray-400 animate-pulse" />;
        }
    };

    const getFileTypeLabel = () => {
        switch (previewState) {
            case 'available':
                return 'Fichier consultable';
            case 'unsupported':
                return 'Fichier à télécharger';
            case 'error':
                return 'Erreur de chargement';
            default:
                return 'Chargement...';
        }
    };

    const displayName = fileName || 'Fichier';

    return (
        <div className="mt-1">
            <button
                onClick={handlePreviewClick}
                className="w-full text-left hover:bg-gray-100 transition-colors"
                aria-label={`Ouvrir ${displayName}`}
                disabled={previewState === 'loading'}
            >
                <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 flex items-center justify-center bg-white rounded shadow-sm border border-gray-200">
                            {renderFileIcon()}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-700 truncate max-w-xs">
                                {displayName}
                            </span>
                            <span className="text-sm text-gray-500">
                                {getFileTypeLabel()}
                            </span>
                        </div>
                    </div>
                </div>
            </button>

            {previewState === 'available' && (
                <FilePreviewModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    fileUrl={fileUrl}
                    fileName={fileName}
                    mimeType={mimeType}
                />
            )}
        </div>
    );
};

export default FileItem;