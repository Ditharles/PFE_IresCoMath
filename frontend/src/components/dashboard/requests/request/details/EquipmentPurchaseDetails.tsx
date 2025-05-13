import { ShoppingCart, FileText } from "lucide-react";
import { PurchaseRequest } from "../../../../../types/request"
import { DetailItem } from "../DetailItem";
import { DetailSection } from "../DetailSection";
import { FileListViewer } from "../FileListViewer";

const EquipmentPurchaseDetails = ({ purchaseRequest, onPreview }: { purchaseRequest: PurchaseRequest; onPreview: (url: string) => void }) => {
    return (
        <>
            <DetailSection
                icon={<ShoppingCart className="h-5 w-5 text-orange-500" />}
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
                    icon={<FileText className="h-5 w-5 text-green-500" />}
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
        </>
    )
}

export default EquipmentPurchaseDetails