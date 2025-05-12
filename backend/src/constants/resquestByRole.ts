import { RequestType, Role } from "../../generated/prisma";

export const requestByRole: Record<Role, RequestType[]> = {
  [Role.ENSEIGNANT]: [
    RequestType.MISSION,
    RequestType.CONFERENCE_NATIONAL,
    RequestType.EQUIPMENT_PURCHASE,
    RequestType.EQUIPMENT_LOAN,
   
    RequestType.REPAIR_MAINTENANCE,
    RequestType.ARTICLE_REGISTRATION,
  ],
  [Role.DIRECTEUR]: [
    RequestType.MISSION,
    RequestType.CONFERENCE_NATIONAL,
    RequestType.EQUIPMENT_PURCHASE,
    RequestType.EQUIPMENT_LOAN,
    RequestType.REPAIR_MAINTENANCE,
    RequestType.CONTRACTUAL,
    RequestType.ARTICLE_REGISTRATION,
  ],
  [Role.MASTER]: [RequestType.INTERNSHIP],
  [Role.DOCTORANT]: [
    RequestType.INTERNSHIP,
    RequestType.EQUIPMENT_PURCHASE,
    RequestType.EQUIPMENT_LOAN,
    RequestType.CONFERENCE_NATIONAL,
    RequestType.ARTICLE_REGISTRATION,
  ],
  [Role.ADMIN]: [],
};
