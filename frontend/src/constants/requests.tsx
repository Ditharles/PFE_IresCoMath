import { RequestStatus } from "../types/MemberAddRequest";
import { RequestType } from "../types/request";


export const REQUEST_TYPE_LABELS = {
    [RequestType.MISSION]: "Mission",
    [RequestType.INTERNSHIP]: "Stage",
    [RequestType.CONFERENCE_NATIONAL]: "Conférence national",
    [RequestType.EQUIPMENT_PURCHASE]: "Achat Matériel",
    [RequestType.EQUIPMENT_LOAN]: "Prêt Matériel",
    
    [RequestType.REPAIR_MAINTENANCE]: "Réparation & Maintenance",
    [RequestType.CONTRACTUAL]: "Contractuel",
    [RequestType.ARTICLE_REGISTRATION]: "Inscription Article"
};

export const STATUS_BADGE_VARIANTS = {
    [RequestStatus.PENDING]: "bg-yellow-100 text-yellow-800",
    [RequestStatus.APPROVED]: "bg-green-100 text-green-800",
    [RequestStatus.APPROVED_BY_SUPERVISOR]: "bg-blue-100 text-blue-800",
    [RequestStatus.APPROVED_BY_DIRECTOR]: "bg-purple-100 text-purple-800",
    [RequestStatus.REJECTED]: "bg-red-100 text-red-800",
    [RequestStatus.REJECTED_BY_SUPERVISOR]: "bg-orange-100 text-orange-800",
    [RequestStatus.REJECTED_BY_DIRECTOR]: "bg-rose-100 text-rose-800",
    [RequestStatus.COMPLETED]: "bg-emerald-100 text-emerald-800"
};

export const STATUS_TRANSLATIONS = {
    [RequestStatus.PENDING]: "En attente",
    [RequestStatus.APPROVED]: "Approuvé",
    [RequestStatus.APPROVED_BY_SUPERVISOR]: "Approuvé par superviseur",
    [RequestStatus.APPROVED_BY_DIRECTOR]: "Approuvé par directeur",
    [RequestStatus.REJECTED]: "Rejeté",
    [RequestStatus.REJECTED_BY_SUPERVISOR]: "Rejeté par superviseur",
    [RequestStatus.REJECTED_BY_DIRECTOR]: "Rejeté par directeur",
    [RequestStatus.COMPLETED]: "Terminé"
};