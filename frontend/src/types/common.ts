export type Role =
  | "DOCTORANT"
  | "MASTER"
  | "ENSEIGNANT"
  | "DIRECTEUR"
  | "ADMIN"
  | "";

export enum RoleEnum {
  DOCTORANT = "DOCTORANT",
  MASTER = "MASTER",
  ENSEIGNANT = "ENSEIGNANT",
  DIRECTEUR = "DIRECTEUR",
  ADMIN = "ADMIN",
}
export interface CommonFields {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  cin: string;
  password: string; 
}

export interface BaseSpecificFields {
  photo: string | null;
}

export interface DoctorantFields extends BaseSpecificFields {
  etablissement: string;
  anneeThese: string;
  directeurThese: string;
}

export interface EtudiantFields extends BaseSpecificFields {
  etablissement: string;
  encadrant: string;
}

export interface EnseignantFields extends BaseSpecificFields {
  grade: string;
  specialite: string;
}

export interface SpecificFieldsProps {
  data: BaseSpecificFields & { [key: string]: any };
  onChange: (data: { [key: string]: any }) => void;
}

export interface FileItem {
  url: string;
  name: string;
  type?: string;
}

export type UploadFileRoute = "profileImage";
