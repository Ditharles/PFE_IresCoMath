type RequestDoctorant = {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  annee_these: number;
  createdAt: Date;
  directeur_these_id: string;
  status: RequestStatus;
  rejectionReason?: string;
  photo?: string;
  isConfirm: boolean;
};

type RequestMaster = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  annee_master: number;
  createdAt: Date;
  encadrant_id: string;
  status: RequestStatus;
  rejectionReason?: string;
  photo?: string;
  isConfirm: boolean;
};

type RequestEnseignantChercheur = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  fonction: string;
  grade: Grade;
  etablissement: string;
  status: RequestStatus;
  isConfirm: boolean;
  rejectionReason?: string;
  photo?: string;
  createdAt: Date;
};

export type RequestUser =
  | RequestDoctorant
  | RequestMaster
  | RequestEnseignantChercheur;
export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum Grade {
  Assistant,
  MaitreAssistant,
  MaitreDeConference,
  Professeur,
}
