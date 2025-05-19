import { Pencil, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

import { CalendarDays, Clock, Package, User, HashIcon } from "lucide-react";

import { Equipment } from "../../../types/equipment";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { DetailItem } from "../requests/request/DetailItem";
import { DetailSection } from "../requests/request/DetailSection";
import EditEquipment from "./EditEquipment";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Image } from "lucide-react";
import { Settings2 } from "lucide-react";


interface EquipmentDetailsProps {
    equipment: Equipment;
    onUpdate: (equipment: Equipment) => void;
}

const EquipmentDetails = ({ equipment, onUpdate }: EquipmentDetailsProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate();

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
        return <div>Aucune données disponibles</div>;
    }

    return (
        <>
            <Button
                variant="ghost"
                className="mb-4 cursor-pointer"
                onClick={() => navigate('/materiels')}
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la liste
            </Button>

            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">Détails de l'équipement</CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditModalOpen(true)}
                        aria-label="Modifier l'équipement"
                    >
                        <Pencil className="h-4 w-4 mr-2" />
                        Modifier
                    </Button>
                </CardHeader>

                <CardContent className="grid gap-6">
                    <DetailSection
                        icon={<Package size={18} />}
                        title="Informations générales"
                    >
                        <DetailItem label="Nom" value={equipment.name} />
                        <DetailItem label="Statut">
                            <Badge variant={getStatusBadgeVariant()}>
                                {equipment.status}
                            </Badge>
                        </DetailItem>
                        <DetailItem label="Catégorie" value={equipment.category.name} />
                        <DetailItem label="Type">
                            <Badge variant={getTypeBadgeVariant()}>
                                {equipment.category.type}
                            </Badge>
                        </DetailItem>
                    </DetailSection>

                    <DetailSection
                        icon={<CalendarDays size={18} />}
                        title="Dates"
                    >
                        {equipment.acquisitionDate && (
                            <DetailItem
                                label="Date d'acquisition"
                                value={format(new Date(equipment.acquisitionDate), "PPP", { locale: fr })}
                            />
                        )}
                        {/* <DetailItem
                            label="Date de création"
                            value={equipment.history.length > 0 ?
                                format(new Date(equipment.history[0].createdAt), "PPP", { locale: fr }) :
                                "Non disponible"}
                        /> */}
                    </DetailSection>

                    {equipment.specifications && Object.keys(equipment.specifications).length > 0 && (
                        <DetailSection
                            icon={<Settings2 size={18} />}
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
                            icon={<Image size={18} />}
                            title="Photos"
                        >
                            <div className="col-span-2">
                                <div className="flex flex-wrap gap-4">
                                    {equipment.photo.map((photo, index) => (
                                        <div key={index} className="w-32 h-32 rounded-md overflow-hidden border">
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

                    {equipment.history && equipment.history.length > 0 && (
                        <DetailSection
                            icon={<Clock size={18} />}
                            title="Historique d'emprunt"
                        >
                            <div className="col-span-2 space-y-4">
                                {equipment.history.map((historyItem) => (
                                    <div key={historyItem.id} className="bg-muted/50 p-4 rounded-lg">
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
                                            <User size={16} className="inline mr-1" /> <DetailItem
                                                label="Utilisateur"
                                                value={historyItem.userId}
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

            <EditEquipment
                equipment={equipment}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={() => {
                    setIsEditModalOpen(false);
                    onUpdate(equipment);
                }}
            />
        </>
    );
};

export default EquipmentDetails;