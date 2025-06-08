import { useState } from "react";
import { X, CheckCircle2, Loader2, ImageIcon, FileText, FileAudio, FileVideo } from "lucide-react";
import { UploadDropzone } from "../utils/uploadthing";

interface FileUploadProps {
    endpoint: string;
    maxFiles?: number;
    acceptedTypes?: string[];
    headerText?: string;
    subHeaderText?: string;
    onFileUploaded?: (fileUrls: string[] | string) => void;
}

interface FileItem {
    url: string;
    name: string;
    type?: string;
}

const FileUpload = ({
    endpoint,
    maxFiles = 1,
    acceptedTypes = ["image/*"],
    headerText = "Téléversement de fichiers",
    subHeaderText = "Glissez-déposez vos fichiers ou cliquez pour parcourir",
    onFileUploaded
}: FileUploadProps) => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleUploadComplete = (res: any) => {
        console.log(res);
        if (!res || res.length === 0) {
            setError("Aucun fichier reçu du serveur.");
            setIsLoading(false);
            return;
        }

        const uploadedFiles = res.map((file: any) => ({
            url: file.appUrl,
            name: file.name ?? "Fichier téléchargé",
            type: file.type ?? getFileTypeFromUrl(file.url)
        }));

        setFiles(uploadedFiles);
        setIsLoading(false);
        setUploadProgress(0);

        if (uploadedFiles.length > 0 && onFileUploaded) {
            console.log("Fichiers téléchargés:", uploadedFiles);
            onFileUploaded(uploadedFiles.map((f: FileItem) => f.url));
        }
    };

    const getFileTypeFromUrl = (url: string): string => {
        const extension = url.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension ?? '')) return 'image';
        if (['mp4', 'webm', 'ogg', 'mov'].includes(extension ?? '')) return 'video';
        if (['mp3', 'wav', 'ogg', 'aac'].includes(extension ?? '')) return 'audio';
        return 'document';
    };

    const getFileIcon = (type: string | undefined) => {
        switch (type) {
            case 'image':
                return <ImageIcon className="text-primary" />;
            case 'video':
                return <FileVideo className="text-primary" />;
            case 'audio':
                return <FileAudio className="text-primary" />;
            default:
                return <FileText className="text-muted-foreground" />;
        }
    };

    const handleUploadProgress = (progress: number) => {
        setUploadProgress(progress);
    };

    const handleError = (error: Error) => {
        setError(`Erreur: ${error.message}`);
        setIsLoading(false);
        setUploadProgress(0);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        if (onFileUploaded) {
            onFileUploaded([]);
        }
    };

    return (
        <div className="max-w-md mx-auto space-y-4 bg-card text-card-foreground rounded-lg p-6 shadow-sm">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground">{headerText}</h2>
                <p className="text-sm text-muted-foreground">{subHeaderText}</p>
            </div>

            {files.length < maxFiles && (
                <UploadDropzone
                    data-cy="file-dropzone"
                    endpoint={endpoint as unknown}
                    onClientUploadComplete={handleUploadComplete}
                    onUploadProgress={handleUploadProgress}
                    onUploadError={handleError}
                    onUploadBegin={() => {
                        setIsLoading(true);
                        setError(null);
                    }}
                    config={{
                        mode: "auto",
                        maxFileCount: maxFiles - files.length,
                        acceptedTypes
                    }}
                    appearance={{
                        container: `border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-primary transition-all bg-background ${isLoading ? 'h-32' : 'h-48'}`,
                        uploadIcon: isLoading ? "hidden" : "text-primary",
                        label: isLoading ? "hidden" : "text-foreground",
                        allowedContent: isLoading ? "hidden" : "text-muted-foreground text-sm",
                        button: isLoading ? "hidden" : "bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    }}
                />
            )}

            {isLoading && (
                <div className="space-y-3">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
                            Téléchargement en cours...
                        </span>
                        <span className="font-semibold">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-primary h-3 rounded-full transition-all duration-300 ease-in-out"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex items-center p-3 text-destructive bg-destructive/10 rounded-lg">
                    <X className="mr-2" />
                    {error}
                </div>
            )}

            {files.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center text-success">
                        <CheckCircle2 className="mr-2 text-primary" />
                        <span>Fichier téléchargé avec succès</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {files.map((file, index) => (
                            <div key={file.url} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors">
                                <div className="flex items-center space-x-3 truncate">
                                    {file.type === 'image' ? (
                                        <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0 border border-border">
                                            <img
                                                src={file.url}
                                                alt={file.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center flex-shrink-0 border border-border">
                                            {getFileIcon(file.type)}
                                        </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                        <a
                                            href={file.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-primary hover:text-primary/80 hover:underline truncate block transition-colors"
                                            title={file.name}
                                        >
                                            {file.name}
                                        </a>
                                        <p className="text-xs text-muted-foreground capitalize">
                                            {file.type ?? 'Fichier'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="text-muted-foreground hover:text-destructive flex-shrink-0 p-1 rounded-full hover:bg-muted transition-colors"
                                    aria-label="Supprimer le fichier"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;

