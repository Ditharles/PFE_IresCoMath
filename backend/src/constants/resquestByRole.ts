import { RequestType, Role } from "../../generated/prisma";

export const requestByRole: Record<Role, RequestType[]> = {
  [Role.ENSEIGNANT]: [
    RequestType.MISSION,
    RequestType.CONFERENCE,
    RequestType.EQUIPMENT_PURCHASE,
    RequestType.EQUIPMENT_LOAN,
    RequestType.TRAVEL_ACCOMMODATION,
    RequestType.REPAIR_MAINTENANCE,
    RequestType.CONTRACTUAL,
    RequestType.ARTICLE_REGISTRATION,
  ],
  [Role.DIRECTEUR]: [
    RequestType.MISSION,
    RequestType.CONFERENCE,
    RequestType.EQUIPMENT_PURCHASE,
    RequestType.EQUIPMENT_LOAN,
    RequestType.TRAVEL_ACCOMMODATION,
    RequestType.REPAIR_MAINTENANCE,
    RequestType.CONTRACTUAL,
    RequestType.ARTICLE_REGISTRATION,
  ],
  [Role.MASTER]: [RequestType.INTERNSHIP],
  [Role.DOCTORANT]: [
    RequestType.INTERNSHIP,
    RequestType.EQUIPMENT_PURCHASE,
    RequestType.EQUIPMENT_LOAN,
    RequestType.TRAVEL_ACCOMMODATION,
  ],
  [Role.ADMIN]: [],
};
