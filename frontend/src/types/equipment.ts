import { extendLoanRequest } from "./request";

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

export enum EquipmentStatus {
  AVAILABLE = "AVAILABLE",
  LOANED = "LOANED",
  PENDING_DELIVERY = "PENDING_DELIVERY",
  OWNER_POSSESSION = "OWNER_POSSESSION",
}
export type Equipment = {
  id: string;
  name: string;
  categoryId: string;
  photo?: string[];
  bill?: string;
  category: {
    id: string;
    name: string;
    type: EquipmentType;
  };
  status: EquipmentStatus;
  specifications: Record<string, unknown>;
  acquisitionDate?: string;
  history: EquipementHistory[];
  equipmentLoanRequests?: extendLoanRequest[];
};

export type EquipementHistory = {
  id: string;

  createdAt: Date;
  updatedAt: Date;
  userId: string;
  borrowDate: Date;
  returnDate?: Date;
};

export type EquipmentCategory = {
  id: string;
  name: string;
  type: EquipmentType;
  quantity: number;
  photo?: string[];
  description?: string;
  equipments: Equipment[];
  equipmentLoanRequests?: extendLoanRequest[];
};
