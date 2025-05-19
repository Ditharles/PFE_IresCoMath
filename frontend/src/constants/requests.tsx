import { z } from "zod";
import ArticleRegistrationForm from "../components/form/requests/ArticleRegistrationForm";
import EquipmentLoanForm from "../components/form/requests/EquipementLoanForm";
import EquipmentPurchaseForm from "../components/form/requests/EquipementPurchaseForm";
import InternshipForm from "../components/form/requests/InternshipForm";
import MissionForm from "../components/form/requests/MissionForm";
import ScientificEventForm from "../components/form/requests/ScientificEvent.Form";
import { editInternshipRequestSchema, editScientificEventRequestSchema, editArticleRegistrationRequestSchema, editEquipmentLoanRequestSchema, editEquipmentPurchaseRequestSchema, editMissionRequestSchema } from "../schemas/editRequestSchema";
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


export const SCHEMA_MAP: { [key in RequestType]: z.ZodObject<any> } = {
    [RequestType.INTERNSHIP]: editInternshipRequestSchema,
    [RequestType.CONFERENCE_NATIONAL]: editScientificEventRequestSchema,
    [RequestType.ARTICLE_REGISTRATION]: editArticleRegistrationRequestSchema,
    [RequestType.EQUIPMENT_LOAN]: editEquipmentLoanRequestSchema,
    [RequestType.EQUIPMENT_PURCHASE]: editEquipmentPurchaseRequestSchema,
    [RequestType.MISSION]: editMissionRequestSchema,
    [RequestType.REPAIR_MAINTENANCE]: editScientificEventRequestSchema,// Add this line
};

export const FORM_COMPONENTS: { [key in RequestType]: React.ComponentType<any> } = {
    [RequestType.INTERNSHIP]: InternshipForm,
    [RequestType.CONFERENCE_NATIONAL]: ScientificEventForm,
    [RequestType.ARTICLE_REGISTRATION]: ArticleRegistrationForm,
    [RequestType.EQUIPMENT_LOAN]: EquipmentLoanForm,
    [RequestType.EQUIPMENT_PURCHASE]: EquipmentPurchaseForm,
    [RequestType.MISSION]: MissionForm,
    [RequestType.REPAIR_MAINTENANCE]: ScientificEventForm, // a corriger
};

