import { Role } from "../types/request";

export const ROLE_TRANSLATIONS = {
    [Role.DOCTORANT]: "Doctorant",
    [Role.ENSEIGNANT]: "Enseignant Chercheur",
    [Role.MASTER]: "Étudiant Master",
    [Role.ADMIN]: "Administrateur",
    [Role.DIRECTEUR]: "Directeur",
};