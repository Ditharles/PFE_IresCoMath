import { useState } from "react";
import FilePreviewModal from "../../../FilePreviewModal";
import { FileTextIcon, ImageIcon } from "lucide-react";

interface FileItemProps {
    fileUrl: string;
    onPreview: (url: string) => void;
}

const FileItem = ({ fileUrl, onPreview }: FileItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handlePreview = () => {
        setIsOpen(true);
        onPreview(fileUrl);
    };

    const handleClose = () => {
        setIsOpen(false);
        onPreview("");
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const getFileIcon = () => {
        const extension = fileUrl.split('.').pop()?.toLowerCase();
        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');

        if (isImage) {
            return <ImageIcon className="h-6 w-6 text-blue-500" />;
        }
        return <FileTextIcon className="h-6 w-6 text-blue-500" />;
    };

    return (
        <div className="flex items-center gap-2 mt-1">
            <button
                onClick={handlePreview}
                className="text-blue-600 hover:underline flex items-center gap-1 w-full"
            >
                {fileUrl && (
                    <div className="w-full flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm">
                        <div className="flex items-center space-x-3">
                            {!imageError ? (
                                <img
                                    src={fileUrl}
                                    alt="Couverture de l'article"
                                    className="h-12 w-12 object-cover rounded shadow-sm"
                                    onError={handleImageError}
                                />
                            ) : (
                                <div className="h-12 w-12 flex items-center justify-center bg-white rounded shadow-sm border border-gray-200">
                                    {getFileIcon()}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-700">Voir le fichier</span>

                            </div>
                        </div>
                    </div>
                )}
            </button>
            <FilePreviewModal isOpen={isOpen} onClose={handleClose} fileUrl={fileUrl} />
        </div>
    );
};

export default FileItem;