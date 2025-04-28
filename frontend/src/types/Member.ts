export type User = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  annee_these?: number;
  annee_master?: number;
  encadrant_id?: string;
  directeur_these_id?: string;
  etablissement?: string;
};
