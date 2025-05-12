
import FileItem from "./FileItem";

interface FileListViewerProps {
    files: string[];
    onPreview: (file: string) => void;
}

export const FileListViewer: React.FC<FileListViewerProps> = ({ files, onPreview }) => (
    <div className="space-y-1">
        {files?.map((file, index) => (
            <FileItem key={index} fileUrl={file} onPreview={onPreview} />
        ))}
    </div>
);



