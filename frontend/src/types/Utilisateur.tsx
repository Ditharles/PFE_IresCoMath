// src/types/Utilisateur.tsx

// Interface représentant un utilisateur en attente de validation
export interface Utilisateur {
    id: string;                 // Identifiant unique
    nom: string;                // Nom de l'utilisateur
    prenom: string;             // Prénom
    email: string;              // Adresse email
    fonction: 'Doctorant' | 'Étudiant Master' | 'Enseignant-chercheur'; // Rôle
    photo?: string;             // (Optionnel) lien vers la photo
    encadrant?: string;         // (Optionnel) nom de l'encadrant
    anneeThese?: number;        // (Doctorant uniquement)
    etablissement?: string;     // (Étudiant Master uniquement)
    statut: 'en_attente' | 'valide' | 'rejete'; // Statut du compte
    motifRejet?: string;        // Motif du rejet, si applicable
  }
  