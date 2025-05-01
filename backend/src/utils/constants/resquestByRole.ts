import { RequestType, Role } from "../../../generated/prisma";

export const requestByRole: Record<Role, RequestType[]> = {
  [Role.ENSEIGNANT]: [
    RequestType.MISSION,
    RequestType.CONFERENCE,
    RequestType.ACHAT_MATERIEL,
    RequestType.PRET_MATERIEL,
    RequestType.DEPLACEMENT_HEBERGEMENT,
    RequestType.REPARATION_MAINTENANCE,
    RequestType.CONTRACTUEL,
    RequestType.INSCRIPTION_ARTICLE,
  ],
  [Role.DIRECTEUR]: [
    RequestType.MISSION,
    RequestType.CONFERENCE,
    RequestType.ACHAT_MATERIEL,
    RequestType.PRET_MATERIEL,
    RequestType.DEPLACEMENT_HEBERGEMENT,
    RequestType.REPARATION_MAINTENANCE,
    RequestType.CONTRACTUEL,
    RequestType.INSCRIPTION_ARTICLE,
  ],
  [Role.MASTER]: [
    RequestType.ACHAT_MATERIEL,
    RequestType.PRET_MATERIEL,
    RequestType.DEPLACEMENT_HEBERGEMENT,
  ],
  [Role.DOCTORANT]: [
    RequestType.STAGE,
    RequestType.ACHAT_MATERIEL,
    RequestType.PRET_MATERIEL,
    RequestType.DEPLACEMENT_HEBERGEMENT,
  ],
  [Role.ADMIN]: [],
};
