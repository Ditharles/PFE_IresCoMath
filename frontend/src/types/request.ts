export enum RequestType {
  MISSION = "MISSION",
  STAGE = "STAGE",
  CONFERENCE = "CONFERENCE",
  ACHAT_MATERIEL = "ACHAT_MATERIEL",
  PRET_MATERIEL = "PRET_MATERIEL",
  DEPLACEMENT_HEBERGEMENT = "DEPLACEMENT_HEBERGEMENT",
  REPARATION_MAINTENANCE = "REPARATION_MAINTENANCE",
  CONTRACTUEL = "CONTRACTUEL",
  INSCRIPTION_ARTICLE = "INSCRIPTION_ARTICLE",
}

export const requestUrl = {
  MISSION: "mission",
  STAGE: "stage",
  CONFERENCE: "conference",
  ACHAT_MATERIEL: "material/purchase",
  PRET_MATERIEL: "material/rent",
  DEPLACEMENT_HEBERGEMENT: "deplacement-hebergement",
  REPARATION_MAINTENANCE: "reparation-maintenance",
  CONTRACTUEL: "contractuel",
  INSCRIPTION_ARTICLE: "inscription-article",
};

// Types pour l'affichage des informations de requêtes
export type Request = {
  // Informations de base de la requête
  id: string;
  type: RequestType;
  userId: string;
  creeLe: Date;
  statut: RequestStatus;
  notes: string | null;

  // Informations utilisateur (à inclure si besoin)
  user?: {
    id: string;
    name?: string;
    email?: string;
    // Autres champs d'utilisateur pertinents
  };

  // Informations spécifiques selon le type de requête
  detailsAchat?: {
    id: string;
    typeMateriel: MaterielType;
    nom: string;
    quantite: number;
    photo?: string;
    specificites: Record<string, any>; // Pour le champ Json
    estimationCout: number;
  };

  detailsPret?: {
    id: string;
    materielId: string;
    materiel?: {
      id: string;
      nom: string;
      // Autres champs de MaterialCategory si nécessaires
    };
    quantite: number;
    dateDebut: Date;
    dateFin: Date;
  };
};

enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
}

enum MaterielType {
  EQUIPMENT = "EQUIPMENT",
  CONSUMABLE = "CONSUMABLE",
  TOOL = "TOOL",
}
