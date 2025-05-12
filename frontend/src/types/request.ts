import { User } from "./Member";

export enum RequestType {
  MISSION = "MISSION",
  INTERNSHIP = "INTERNSHIP",
  CONFERENCE_NATIONAL = "CONFERENCE_NATIONAL",
  EQUIPMENT_PURCHASE = "EQUIPMENT_PURCHASE",
  EQUIPMENT_LOAN = "EQUIPMENT_LOAN",
  REPAIR_MAINTENANCE = "REPAIR_MAINTENANCE",
  CONTRACTUAL = "CONTRACTUAL",
  ARTICLE_REGISTRATION = "ARTICLE_REGISTRATION",
}

export const requestUrl: Record<RequestType, string> = {
  [RequestType.MISSION]: "mission",
  [RequestType.INTERNSHIP]: "internship",
  [RequestType.CONFERENCE_NATIONAL]: "conference-national",
  [RequestType.EQUIPMENT_PURCHASE]: "equipment/purchase",
  [RequestType.EQUIPMENT_LOAN]: "equipment/loan",
  [RequestType.REPAIR_MAINTENANCE]: "repair-maintenance",
  [RequestType.CONTRACTUAL]: "contractual",
  [RequestType.ARTICLE_REGISTRATION]: "article-registration",
};

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  APPROVED_BY_SUPERVISOR = "APPROVED_BY_SUPERVISOR",
  APPROVED_BY_DIRECTOR = "APPROVED_BY_DIRECTOR",
  REJECTED_BY_SUPERVISOR = "REJECTED_BY_SUPERVISOR",
  REJECTED_BY_DIRECTOR = "REJECTED_BY_DIRECTOR",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
}

export enum EquipmentType {
  SUPPLIES = "SUPPLIES",
  CONSUMABLES = "CONSUMABLES",
  EQUIPMENT = "EQUIPMENT",
  TOOLS = "TOOLS",
}

export const EquipmentTypeList: Record<EquipmentType, string> = {
  [EquipmentType.SUPPLIES]: "Fournitures",
  [EquipmentType.CONSUMABLES]: "Consommables",
  [EquipmentType.EQUIPMENT]: "Équipement",
  [EquipmentType.TOOLS]: "Outillage",
};

export enum Role {
  ADMIN = "ADMIN",
  DOCTORANT = "DOCTORANT",
  MASTER = "MASTER",
  ENSEIGNANT = "ENSEIGNANT",
  DIRECTEUR = "DIRECTEUR",
}

// Base request type with common fields
export type BaseRequest = {
  id: string;
  type: RequestType;
  status: RequestStatus;
  createdAt: Date;
  notes?: string;
  user: User;
};

// Specific request types
export type PurchaseRequest = {
  id: string;
  equipmentType: EquipmentType;
  name: string;
  quantity: number;
  url?: string;
  photo?: string;
  specifications: Record<string, unknown>;
  costEstimation: number;
};

export type EquipmentLoanRequest = {
  id: string;
  equipment?: {
    id: string;
    name: string;
    category: {
      id: string;
      name: string;
      type: EquipmentType;
    };
  };
  category?: {
    id: string;
    name: string;
    type: EquipmentType;
  };
  quantity: number;
  startDate: Date;
  endDate: Date;
};

export type RequestStage = {
  id: string;
  organization: string;
  organizationEmail: string;
  organizationUrl?: string;
  supervisor?: string;
  supervisorEmail?: string;
  supervisorPhone?: string;
  letter: string;
  country: string;
  startDate: Date;
  endDate: Date;
};

export type Mission = {
  id: string;
  hostOrganization: string;
  objective: string;
  country: string;
  startDate: Date;
  endDate: Date;
  specificDocument: string[];
  document: string[];
};

export type ScientificEvent = {
  id: string;
  location: string;
  urlEvent?: string;
  mailAcceptation: string;
  title: string;
  articlesAccepted: boolean;
  articleCover?: string;
  startDate: Date;
  endDate: Date;
};

export type ArticleRegistration = {
  id: string;
  title: string;
  conference?: string;
  urlConference?: string;
  articleCover: string;
  amount: string;
};

// Main Request type that combines all possibilities
export type Request = BaseRequest & {
  purchaseRequest?: PurchaseRequest[];
  equipmentLoanRequest?: EquipmentLoanRequest;
  stage?: RequestStage;
  mission?: Mission;
  scientificEvent?: ScientificEvent;
  articleRegistration?: ArticleRegistration;
};

// Type for the Prisma query result
export type PrismaRequestResult = {
  id: string;
  type: RequestType;
  status: RequestStatus;
  createdAt: Date;
  notes?: string | null;
  purchaseRequests: PurchaseRequest[];
  loanRequest: EquipmentLoanRequest | null;
  stage: RequestStage | null;
  mission: Mission | null;
  scientificEvent: ScientificEvent | null;
  articleRegistration: ArticleRegistration | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
  };
};
