
import ArticleRegistrationForm from "../components/form/requests/ArticleRegistrationForm";
import EquipmentLoanForm from "../components/form/requests/EquipementLoanForm";
import InternshipForm from "../components/form/requests/InternshipForm";
import MissionForm from "../components/form/requests/MissionForm";
import ScientificEventForm from "../components/form/requests/ScientificEvent.Form";
import { editInternshipRequestSchema, editScientificEventRequestSchema, editArticleRegistrationRequestSchema, editEquipmentLoanRequestSchema, editEquipmentPurchaseRequestSchema, editMissionRequestSchema, editRepairMaitenanceRequestSchema } from "../schemas/editRequestSchema";
import { RequestStatus } from "../types/MemberAddRequest";
import { RequestType } from "../types/request";
import EquipmentPurchaseItem from "../components/form/requests/EquipmentPurchaseItem";


export const REQUEST_TYPE_LABELS = {
    [RequestType.MISSION]: "Mission",
    [RequestType.INTERNSHIP]: "Stage",
    [RequestType.CONFERENCE_NATIONAL]: "Conférence national",
    [RequestType.EQUIPMENT_PURCHASE]: "Achat Matériel",
    [RequestType.EQUIPMENT_LOAN]: "Prêt Matériel",

    [RequestType.REPAIR_MAINTENANCE]: "Réparation & Maintenance",

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
    [RequestStatus.COMPLETED]: "bg-emerald-100 text-emerald-800",
    [RequestStatus.CLOSED]: "bg-gray-100 text-gray-800"
};

export const STATUS_TRANSLATIONS = {
    [RequestStatus.PENDING]: "En attente",
    [RequestStatus.APPROVED]: "Approuvé",
    [RequestStatus.APPROVED_BY_SUPERVISOR]: "Approuvé par superviseur",
    [RequestStatus.APPROVED_BY_DIRECTOR]: "Approuvé par directeur",
    [RequestStatus.REJECTED]: "Rejeté",
    [RequestStatus.REJECTED_BY_SUPERVISOR]: "Rejeté par superviseur",
    [RequestStatus.REJECTED_BY_DIRECTOR]: "Rejeté par directeur",
    [RequestStatus.COMPLETED]: "Complété",
    [RequestStatus.CLOSED]: "Cloturé"
};


export const SCHEMA_MAP = {
    [RequestType.INTERNSHIP]: editInternshipRequestSchema,
    [RequestType.CONFERENCE_NATIONAL]: editScientificEventRequestSchema,
    [RequestType.ARTICLE_REGISTRATION]: editArticleRegistrationRequestSchema,
    [RequestType.EQUIPMENT_LOAN]: editEquipmentLoanRequestSchema,
    [RequestType.EQUIPMENT_PURCHASE]: editEquipmentPurchaseRequestSchema,
    [RequestType.MISSION]: editMissionRequestSchema,
    [RequestType.REPAIR_MAINTENANCE]: editRepairMaitenanceRequestSchema,// Add this line
};

export const FORM_COMPONENTS = {
    [RequestType.INTERNSHIP]: InternshipForm,
    [RequestType.CONFERENCE_NATIONAL]: ScientificEventForm,
    [RequestType.ARTICLE_REGISTRATION]: ArticleRegistrationForm,
    [RequestType.EQUIPMENT_LOAN]: EquipmentLoanForm,
    [RequestType.EQUIPMENT_PURCHASE]: EquipmentPurchaseItem,
    [RequestType.MISSION]: MissionForm,
    [RequestType.REPAIR_MAINTENANCE]: ScientificEventForm, // a corriger
};



export const allowedFieldsByType: Record<RequestType, string[]> = {
  [RequestType.EQUIPMENT_PURCHASE]: [
    "equipmentType", "name", "url", "quantity", "photo", "specifications", "costEstimation"
  ],
  [RequestType.EQUIPMENT_LOAN]: [
    "categoryId", "equipmentId", "quantity", "startDate", "endDate"
  ],
  [RequestType.REPAIR_MAINTENANCE]: [
    "description", "photos"
  ],
  [RequestType.INTERNSHIP]: [
    "organization", "organizationEmail", "organizationUrl",
    "supervisor", "supervisorEmail", "supervisorPhone",
    "letter", "country", "startDate", "endDate"
  ],
  [RequestType.MISSION]: [
    "hostOrganization", "objective", "country", "startDate", "endDate", "specificDocument", "document"
  ],
  [RequestType.CONFERENCE_NATIONAL]: [
    "location", "urlEvent", "mailAcceptation", "title",
    "articlesAccepted", "articleCover", "startDate", "endDate"
  ],
  [RequestType.ARTICLE_REGISTRATION]: [
    "title", "conference", "urlConference", "articleCover", "amount"
  ],
}
