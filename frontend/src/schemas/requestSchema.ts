import { z } from "zod";

// Validation commune pour les dates
const dateValidation = {
  startDate: z.string().min(1, { message: "La date de début est requise" }),
  endDate: z
    .string()
    .min(1, { message: "La date de fin est requise" })
    .refine(
      (date, ctx) => {
        const { startDate } = ctx.parent;
        if (!startDate) return true;
        return new Date(date) >= new Date(startDate);
      },
      { message: "La date de fin doit être après la date de début" }
    ),
};

// Schéma pour la demande de stage
export const stageSchema = z.object({
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
export const missionSchema = z.object({
  objective: z.string().min(1, { message: "L'objectif est requis" }),
  country: z.string().min(1, { message: "Le pays est requis" }),
  location: z.string().min(1, { message: "Le lieu est requis" }),
  ...dateValidation,
});

// Schéma pour la demande d'événement scientifique
export const scientificEventSchema = z.object({
  location: z.string().min(1, { message: "Le lieu est requis" }),
  title: z.string().min(1, { message: "Le titre de l'événement est requis" }),
  articleAccepted: z.boolean().optional().default(false),
  fileUrl: z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      if (ctx.parent.articleAccepted && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "L'URL de la première page est requise lorsque l'article est accepté",
        });
      }
    }),
  ...dateValidation,
});

// Schéma pour l'inscription d'article
export const articleRegistrationSchema = z.object({
  conference: z.string().min(1, { message: "La conférence est requise" }),
  location: z.string().min(1, { message: "Le lieu est requis" }),
  date: z.string().min(1, { message: "La date est requise" }),
  fees: z.number().min(0, {
    message: "Le montant des frais doit être supérieur ou égal à 0",
  }),
});

// Schéma pour le prêt de matériel
export const equipmentLoanSchema = z.object({
  name: z.string().min(1, { message: "Le nom du matériel est requis" }),
  type: z.string().min(1, { message: "Le type de matériel est requis" }),
  equipmentName: z
    .string()
    .min(1, { message: "Le nom du matériel est requis" }),
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
  note: z.string().optional(),
  ...dateValidation,
});

// Schéma pour l'achat de matériel
export const equipmentPurchaseSchema = z.object({
  name: z.string().min(1, { message: "Le nom du matériel est requis" }),
  type: z.string().min(1, { message: "Le type de matériel est requis" }),
  specifications: z
    .union([
      z.record(z.string(), z.any()), // Format objet libre
      z.array(
        z.object({
          key: z.string(),
          value: z.any(),
        })
      ),
    ])
    .transform((val) => {
      // Normalise en format objet pour le stockage
      if (Array.isArray(val)) {
        return val.reduce((acc, { key, value }) => {
          if (key) acc[key] = value;
          return acc;
        }, {});
      }
      return val;
    })
    .optional()
    .default({}),
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
  note: z.string().optional(),
  ...dateValidation,
});
