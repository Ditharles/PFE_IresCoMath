export enum RequestType {
  MISSION = "MISSION",
  INTERNSHIP = "INTERNSHIP",
  CONFERENCE = "CONFERENCE",
  EQUIPMENT_PURCHASE = "EQUIPMENT_PURCHASE",
  EQUIPMENT_LOAN = "EQUIPMENT_LOAN",
  TRAVEL_ACCOMMODATION = "TRAVEL_ACCOMMODATION",
  REPAIR_MAINTENANCE = "REPAIR_MAINTENANCE",
  CONTRACTUAL = "CONTRACTUAL",
  ARTICLE_REGISTRATION = "ARTICLE_REGISTRATION",
}

export const requestUrl: Record<RequestType, string> = {
  [RequestType.MISSION]: "mission",
  [RequestType.INTERNSHIP]: "internship",
  [RequestType.CONFERENCE]: "conference",
  [RequestType.EQUIPMENT_PURCHASE]: "equipment/purchase",
  [RequestType.EQUIPMENT_LOAN]: "equipment/rent",
  [RequestType.TRAVEL_ACCOMMODATION]: "travel-accommodation",
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
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
  };
};

// Specific request types
type PurchaseRequest = {
  id: string;
  
  equipmentType: EquipmentType;
  name: string;
  quantity: number;
  photo?: string;
  specifications: Record<string, unknown>;
  costEstimation: number;
};

type EquipmentLoanRequest = {
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

type RequestStage = {
  id: string;
  company: string;
  companyEmail: string;
  companyPhone: string;
  supervisor: string;
  supervisorEmail: string;
  supervisorPhone: string;
  letter: string;
  country: string;
  startDate: Date;
  endDate: Date;
};

type Mission = {
  id: string;
  location: string;
  objective: string;
  country: string;
  startDate: Date;
  endDate: Date;
};

type ScientificEvent = {
  id: string;
  location: string;
  title: string;
  articlesAccepted: boolean;
  articleCover?: string;
  startDate: Date;
  endDate: Date;
};

type ArticleRegistration = {
  id: string;
  conference: string;
  amount: string;
};

// Main Request type that combines all possibilities
export type Request = BaseRequest & {
  purchaseRequest?: PurchaseRequest;
  equipmentLoanRequest?: EquipmentLoanRequest;
  requestStage?: RequestStage;
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
  loanRequests: EquipmentLoanRequest[];
  stages: RequestStage[];
  missions: Mission[];
  scientificEvents: ScientificEvent[];
  articleRegistrations: ArticleRegistration[];
};
