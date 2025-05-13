import { FileText } from "lucide-react";
import { ArticleRegistration } from "../../../../../types/request";

import { DetailItem } from "../DetailItem";
import { DetailSection } from "../DetailSection";
import { FileListViewer } from "../FileListViewer";
import { BookOpen } from "lucide-react";



export const ArticleRegistrationDetails = ({ articleRegistration, onPreview }: {
    articleRegistration: ArticleRegistration;
    onPreview: (url: string) => void
}) => (
    <>
        <DetailSection
            icon={<BookOpen className="h-5 w-5 text-indigo-500" />}
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
                icon={<FileText className="h-5 w-5 text-green-500" />}
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
    </>
);