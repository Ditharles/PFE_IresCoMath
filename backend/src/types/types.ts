export interface RequestDoctorant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  dateInscription: Date;
  createdAt: Date;
  directeur_these: EnseignantChercheur;
  directeur_these_id: string;
  status: RequestStatus;
  rejectionReason: string | null;
  photo: string | null;
  isConfirm: boolean;
}

export interface RequestMaster {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  dateInscription: Date;
  createdAt: Date;
  encadrant: EnseignantChercheur;
  encadrant_id: string;
  status: RequestStatus;
  rejectionReason: string | null;
  photo: string | null;
  isConfirm: boolean;
}

export interface RequestEnseignantChercheur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  fonction: string;
  grade: Grade;
  etablissement: string;
  status: RequestStatus;
  rejectionReason: string | null;
  photo: string | null;
  createdAt: Date;
  isConfirm: boolean;
}

export interface Doctorant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  dateInscription: Date;
  createdAt: Date;
  directeur_these: EnseignantChercheur;
  directeur_these_id: string;
  sessions_actives: Session[];
  password: string;
  photo: string | null;
  notifications: Notification[];
}

export interface Master {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  dateInscription: Date;
  createdAt: Date;
  encadrant: EnseignantChercheur;
  encadrant_id: string;
  sessions_actives: Session[];
  password: string;
  photo: string | null;
  notifications: Notification[];
}

export interface EnseignantChercheur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  fonction: string;
  grade: Grade;
  etablissement: string;
  doctorants: Doctorant[];
  requestDoctorant: RequestDoctorant[];
  requestMaster: RequestMaster[];
  masters: Master[];
  sessions_actives: Session[];
  password: string;
  photo: string | null;
  notifications: Notification[];
}

export interface Session {
  id: string;
  machine: string;
  createdAt: Date;
  doctorant: Doctorant | null;
  doctorant_id: string | null;
  master: Master | null;
  master_id: string | null;
  enseignant: EnseignantChercheur | null;
  enseignant_id: string | null;
}

export interface Admin {
  id: number;
  nom: string;
  prenom: string;
  password: string;
  notifications: Notification[];
}

export interface Notification {
  id: number;
  message: string;
  recipient: string;
  status: NotificationStatus;
  createdAt: Date;
  admin: Admin | null;
  admin_id: number | null;
  doctorant: Doctorant | null;
  doctorant_id: string | null;
  master: Master | null;
  master_id: string | null;
  enseignant: EnseignantChercheur | null;
  enseignant_id: string | null;
}

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum NotificationStatus {
  UNREAD = "UNREAD",
  READ = "READ",
}

export enum Grade {
  Assistant = "Assistant",
  MaitreAssistant = "MaitreAssistant",
  MaitreDeConference = "MaitreDeConference",
  Professeur = "Professeur",
}
