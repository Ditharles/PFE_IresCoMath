import { Pencil, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate, Link } from "react-router-dom";
import { CalendarDays, Clock, Package, User, HashIcon, Image, Settings2, FileText } from "lucide-react";

import { Equipment } from "../../../types/equipment";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { DetailItem } from "../requests/request/DetailItem";
import { DetailSection } from "../requests/request/DetailSection";
import EditEquipment from "./EditEquipment";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import FilePreviewModal from "../../FilePreviewModal";

interface EquipmentDetailsProps {
    equipment: Equipment;
    onUpdate: (equipment: Equipment) => void;
}

const EquipmentDetails = ({ equipment, onUpdate }: EquipmentDetailsProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const [selectedBill, setSelectedBill] = useState<string | null>(null);
    const navigate = useNavigate();

    const STATUS_LABELS: Record<string, string> = {
        AVAILABLE: "Disponible",
        LOANED: "Emprunté",
        PENDING_DELIVERY: "En attente",
        OWNER_POSSESSION: "Propriétaire"
    };

    const TYPE_LABELS: Record<string, string> = {
        EQUIPMENT: "Équipement",
        SUPPLIES: "Fourniture",
        CONSUMABLES: "Consommable",
        TOOLS: "Outil"
    };

    const getStatusBadgeVariant = (): "default" | "secondary" | "destructive" | "outline" => {
        switch (equipment.status) {
            case "AVAILABLE":
                return "default";
            case "LOANED":
                return "secondary";
            case "PENDING_DELIVERY":
                return "outline";
            case "OWNER_POSSESSION":
                return "destructive";
            default:
                return "default";
        }
    };

    const getTypeBadgeVariant = (): "default" | "secondary" | "outline" => {
        switch (equipment.category.type) {
            case "EQUIPMENT":
                return "default";
            case "SUPPLIES":
                return "secondary";
            case "CONSUMABLES":
                return "outline";
            case "TOOLS":
                return "default";
            default:
                return "default";
        }
    };

    if (!equipment) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <p className="text-muted-foreground">Aucune donnée disponible</p>
                <Button
                    variant="ghost"
                    className="mt-4"
                    onClick={() => navigate('/materiels')}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour à la liste
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 bg-background text-foreground p-6 rounded-lg shadow-md">
            <Button
                variant="ghost"
                className="cursor-pointer text-foreground hover:text-primary"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
            </Button>

            <Card className="w-full bg-card text-card-foreground border-border">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 bg-muted/50">
                    <CardTitle className="text-2xl font-bold text-foreground">Détails de l'équipement</CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditModalOpen(true)}
                        aria-label="Modifier l'équipement"
                        className="bg-background hover:bg-muted"
                    >
                        <Pencil className="h-4 w-4 mr-2" />
                        Modifier
                    </Button>
                </CardHeader>

                <CardContent className="grid gap-6">
                    <DetailSection
                        icon={<Package size={18} className="text-primary" />}
                        title="Informations générales"
                    >
                        <DetailItem label="Nom" value={equipment.name} />
                        <DetailItem label="Statut">
                            <Badge variant={getStatusBadgeVariant()}>
                                {STATUS_LABELS[equipment.status] || equipment.status}
                            </Badge>
                        </DetailItem>
                        <DetailItem label="Catégorie">
                            <Link
                                to={`/materiels/categories/${equipment.category.id}`}
                                className="text-primary hover:text-primary/80 hover:underline transition-colors"
                            >
                                {equipment.category.name}
                            </Link>
                        </DetailItem>
                        <DetailItem label="Type">
                            <Badge variant={getTypeBadgeVariant()}>
                                {TYPE_LABELS[equipment.category.type] || equipment.category.type}
                            </Badge>
                        </DetailItem>
                    </DetailSection>

                    <DetailSection
                        icon={<CalendarDays size={18} className="text-primary" />}
                        title="Dates"
                    >
                        {equipment.acquisitionDate && (
                            <DetailItem
                                label="Date d'acquisition"
                                value={format(new Date(equipment.acquisitionDate), "PPP", { locale: fr })}
                            />
                        )}
                    </DetailSection>

                    {equipment.specifications && Object.keys(equipment.specifications).length > 0 && (
                        <DetailSection
                            icon={<Settings2 size={18} className="text-primary" />}
                            title="Spécifications techniques"
                        >
                            {Object.entries(equipment.specifications).map(([key, value]) => (
                                <DetailItem
                                    key={key}
                                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                    value={value != null ? String(value) : "Non spécifié"}
                                />
                            ))}
                        </DetailSection>
                    )}

                    {equipment.photo && equipment.photo.length > 0 && (
                        <DetailSection
                            icon={<Image size={18} className="text-primary" />}
                            title="Photos"
                        >
                            <div className="col-span-2">
                                <div className="flex flex-wrap gap-4">
                                    {equipment.photo.map((photo, index) => (
                                        <div
                                            key={index}
                                            className="w-32 h-32 rounded-md overflow-hidden border border-border hover:shadow-md transition-shadow cursor-pointer"
                                            onClick={() => setSelectedPhoto(photo)}
                                        >
                                            <img
                                                src={photo}
                                                alt={`Photo ${index + 1} de ${equipment.name}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DetailSection>
                    )}

                    {equipment.bill && (
                        <DetailSection
                            icon={<FileText size={18} className="text-primary" />}
                            title="Facture"
                        >
                            <div className="col-span-2">
                                <div
                                    className="flex items-center gap-2 p-4 rounded-md border border-border hover:shadow-md transition-shadow cursor-pointer bg-muted/50 hover:bg-muted"
                                    onClick={() => setSelectedBill(equipment.bill || null)}
                                >
                                    <FileText className="h-6 w-6 text-muted-foreground" />
                                    <span className="text-foreground">Voir la facture</span>
                                </div>
                            </div>
                        </DetailSection>
                    )}

                    {equipment.history && equipment.history.length > 0 && (
                        <DetailSection
                            icon={<Clock size={18} className="text-primary" />}
                            title="Historique"
                        >
                            <div className="col-span-2 space-y-4">
                                {equipment.history.map((historyItem) => (
                                    <div key={historyItem.id} className="bg-muted/50 p-4 rounded-lg hover:bg-muted/70 transition-colors border border-border">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <DetailItem
                                                label="Date d'emprunt"
                                                value={format(new Date(historyItem.borrowDate), "PPP", { locale: fr })}
                                            />
                                            {historyItem.returnDate && (
                                                <DetailItem
                                                    label="Date de retour"
                                                    value={format(new Date(historyItem.returnDate), "PPP", { locale: fr })}
                                                />
                                            )}
                                            <DetailItem
                                                label="Utilisateur"
                                                value={
                                                    <div className="flex items-center">
                                                        <User size={16} className="inline mr-2 text-muted-foreground" />
                                                        {historyItem.userId}
                                                    </div>
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DetailSection>
                    )}

                    <DetailSection
                        icon={<HashIcon size={18} />}
                        title="Identifiants"
                    >
                        <DetailItem label="ID de l'équipement" value={equipment.id} />
                        <DetailItem label="ID de la catégorie" value={equipment.categoryId} />
                    </DetailSection>
                </CardContent>
            </Card>

            {isEditModalOpen && (
                <EditEquipment
                    equipment={equipment}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={onUpdate}
                />
            )}

            {selectedPhoto && (
                <FilePreviewModal
                    fileUrl={selectedPhoto}
                    onClose={() => setSelectedPhoto(null)}
                />
            )}

            {selectedBill && (
                <FilePreviewModal
                    fileUrl={selectedBill}
                    onClose={() => setSelectedBill(null)}
                />
            )}
        </div>
    );
};

export default EquipmentDetails;