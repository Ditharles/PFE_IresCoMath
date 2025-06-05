import { z } from "zod";

// Schéma de base pour les champs communs
const commonFieldsSchema = z.object({
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  phone: z
    .string()
    .regex(/^[0-9]{8}$/, "Le numéro de téléphone doit contenir 8 chiffres"),
  email: z.string().email("Email invalide"),
  cin: z.string().min(5, "Le CIN doit contenir au moins 5 caractères"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string(),
});

// Schéma pour les doctorants
const doctorantSchema = z.object({
  ...commonFieldsSchema.shape,
  role: z.literal("DOCTORANT"),
  thesisYear: z.string().min(1, "L'année de thèse est requise"),
  thesisSupervisorId: z.string().min(1, "Le directeur de thèse est requis"),
  institution: z.string().min(1, "L'institution est requise"),
  photo: z.string().nullable(),
});

// Schéma pour les étudiants en master
const masterSchema = z.object({
  ...commonFieldsSchema.shape,
  role: z.literal("MASTER"),
  masterYear: z.string().min(1, "L'année de master est requise"),
  supervisorId: z.string().min(1, "L'encadrant est requis"),
  institution: z.string().min(1, "L'institution est requise"),
  photo: z.string().nullable(),
});

// Schéma pour les enseignants-chercheurs
const enseignantSchema = z.object({
  ...commonFieldsSchema.shape,
  role: z.literal("ENSEIGNANT"),
  grade: z.enum(
    ["Assistant", "MaitreAssistant", "MaitreDeConference", "Professeur"],
    {
      required_error: "Le grade est requis",
    }
  ),
  position: z.string().min(1, "La position est requise"),
  institution: z.string().min(1, "L'institution est requise"),
  photo: z.string().nullable(),
});

// Schéma d'union pour tous les types d'utilisateurs
export const inscriptionSchema = z
  .discriminatedUnion("role", [doctorantSchema, masterSchema, enseignantSchema])
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type InscriptionFormData = z.infer<typeof inscriptionSchema>;
