import { z } from "zod";

// Validation commune pour les dates
const dateValidation = {
  startDate: z.string().min(1, { message: "La date de début est requise" }),
  endDate: z
    .string()
    .min(1, { message: "La date de fin est requise" })
    .refine(
      (endDate) => {
        const startDate = z.string().parse(endDate);
        return new Date(endDate) >= new Date(startDate);
      },
      { message: "La date de fin doit être après la date de début" }
    ),
};

// Schéma pour la demande de stage
export const internshipRequestSchema = z.object({
  company: z.string().min(1, { message: "Le nom de l'entreprise est requis" }),
  companyEmail: z
    .string()
    .min(1, { message: "L'adresse email est requise" })
    .email({ message: "Adresse email invalide" }),
  companyPhone: z
    .string()
    .min(1, { message: "Le numéro de l'entreprise est requis" }),
  supervisor: z
    .string()
    .min(1, { message: "Le nom du responsable est requis" }),
  supervisorEmail: z
    .string()
    .min(1, { message: "L'adresse email est requise" })
    .email({ message: "Adresse email invalide" }),
  supervisorPhone: z
    .string()
    .min(1, { message: "Le numéro de l'entreprise est requis" }),
  letter: z.string().optional(),
  country: z.string().min(1, { message: "Le pays est requis" }),
  ...dateValidation,
});

// Schéma pour la demande de mission
export const missionRequestSchema = z.object({
  objective: z.string().min(1, { message: "L'objectif est requis" }),
  country: z.string().min(1, { message: "Le pays est requis" }),
  location: z.string().min(1, { message: "Le lieu est requis" }),
  ...dateValidation,
});

// Schéma pour la demande d'événement scientifique
export const scientificEventRequestSchema = z
  .object({
    location: z.string().min(1, { message: "Le lieu est requis" }),
    title: z.string().min(1, { message: "Le titre de l'événement est requis" }),
    articlesAccepted: z.boolean().optional().default(false),
    articleCover: z.string().optional(),
    ...dateValidation,
  })
  .superRefine((data, ctx) => {
    if (data.articlesAccepted && !data.articleCover) {
      ctx.addIssue({
        path: ["articleCover"],
        code: z.ZodIssueCode.custom,
        message:
          "L'URL de la première page est requise lorsque l'article est accepté",
      });
    }
  });

// Schéma pour l'inscription d'article
export const articleRegistrationRequestSchema = z.object({
  conference: z.string().min(1, { message: "La conférence est requise" }),

  amount: z.string().min(0, {
    message: "Le montant des frais doit être supérieur ou égal à 0",
  }),
  date: z.string().min(1, { message: "La date est requise" }),
});

// Schéma pour le prêt de matériel
export const equipmentLoanRequestSchema = z.object({
  categoryId: z
    .string()
    .min(1, { message: "Les infos de l'equipement sont requis " }),
  equipmentId: z.string().optional(),
  quantity: z
    .number()
    .min(1, { message: "La quantité doit être supérieure à 0" })
    .or(
      z
        .string()
        .min(1)
        .transform((val) => Number(val))
    )
    .refine((val) => !isNaN(val) && val > 0, {
      message: "La quantité doit être un nombre supérieur à 0",
    }),
  notes: z.string().optional(),
  ...dateValidation,
});

// Schéma pour l'achat de matériel
export const equipmentPurchaseRequestSchema = z.object({
  equipmentType: z
    .string()
    .min(1, { message: "Le type de matériel est requis" }),
  name: z.string().min(1, { message: "Le nom du matériel est requis" }),
  specifications: z.record(z.string(), z.any()).optional().default({}),
  quantity: z
    .number()
    .min(1, { message: "La quantité doit être supérieure à 0" })
    .or(
      z
        .string()
        .min(1)
        .transform((val) => Number(val))
    )
    .refine((val) => !isNaN(val) && val > 0, {
      message: "La quantité doit être un nombre supérieur à 0",
    }),
  costEstimation: z.string().min(0, {
    message: "L'estimation de coût doit être supérieure ou égale à 0",
  }),
  photo: z.string().optional(),
  notes: z.string().optional(),
});
