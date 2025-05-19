import { EquipmentStatus, EquipmentType } from "../types/equipment";

export const    EQUIPMENT_TYPE_LABELS = {
    [EquipmentType.SUPPLIES]: "Fournitures",
    [EquipmentType.CONSUMABLES]: "Consommables",
    [EquipmentType.EQUIPMENT]: "Équipement",
    [EquipmentType.TOOLS]: "Outillage",
};

export const EQUIPMENT_STATUS_LABELS = {
    [EquipmentStatus.AVAILABLE]: "Disponible",
    [EquipmentStatus.LOANED]: "Emprunté",
    [EquipmentStatus.PENDING_DELIVERY]: "En attente de livraison",
    [EquipmentStatus.OWNER_POSSESSION]: "Possession de l'utilisateur",
};

export const EQUIPMENT_STATUS_BADGES = {
    [EquipmentStatus.AVAILABLE]: "bg-green-100 text-green-800",
    [EquipmentStatus.LOANED]: "bg-yellow-100 text-yellow-800",
    [EquipmentStatus.PENDING_DELIVERY]: "bg-blue-100 text-blue-800",
    [EquipmentStatus.OWNER_POSSESSION]: "bg-emerald-100 text-emerald-800",
};
