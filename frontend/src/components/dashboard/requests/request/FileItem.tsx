import { useState } from "react";
import FilePreviewModal from "../../../FilePreviewModal";

interface FileItemProps {
    fileUrl: string;
    onPreview: (url: string) => void;
}

const FileItem = ({ fileUrl, onPreview }: FileItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handlePreview = () => {
        setIsOpen(true);
        onPreview(fileUrl);
    };

    const handleClose = () => {
        setIsOpen(false);
        onPreview("");
    };

    return (
        <div className="flex items-center gap-2 mt-1">
            <button
                onClick={handlePreview}
                className="text-blue-600 hover:underline flex items-center gap-1"
            >
                {fileUrl && (
                    <div className="w-full flex items-center justify-between p-3 border rounded-lg bg-gray-50 shadow-sm">
                        <div className="flex items-center space-x-3">
                            <img
                                src={fileUrl}
                                alt="Couverture de l'article"
                                className="h-12 w-12 object-cover rounded"
                            />
                            <span>Voir le fichier</span>
                        </div>
                    </div>
                )}
            </button>
            <FilePreviewModal isOpen={isOpen} onClose={handleClose} fileUrl={fileUrl} />
        </div>
    );
};

export default FileItem;