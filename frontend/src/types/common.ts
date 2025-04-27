export type Role = "DOCTORANT" | "MASTER" | "ENSEIGNANT" | "DIRECTEUR"| "ADMIN"|"";

export interface CommonFields {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  cin: string;
}

export interface BaseSpecificFields {
  photo: File | null;
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
