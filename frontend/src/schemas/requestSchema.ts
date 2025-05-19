import { z } from "zod";

const dateValidation = {
  startDate: z
    .date()
    .min(new Date(), {
      message: "La date de début ne peut pas etre avant aujourd'hui",
    }),
  endDate: z
    .date()
    .min(new Date(), { message: "La date de fin est requise" })
    .refine(
      (endDate) => {
        const startDate = z.date().parse(endDate);
        return new Date(endDate) >= new Date(startDate);
      },
      { message: "La date de fin doit être après la date de début" }
    ),
};

// Schéma pour la demande de stage
export const internshipRequestSchema = z.object({
  organization: z
    .string()
    .min(1, { message: "Le nom de l'organisation est requis" }),
  organizationEmail: z
    .string()
    .min(1, { message: "L'adresse email est requise" })
    .email({ message: "Adresse email invalide" }),
  organizationUrl: z
    .string()
    .url({ message: "URL invalide" })
    .optional()
    .or(z.literal("")),
  supervisor: z.string().optional(),
  supervisorEmail: z
    .string()
    .email({ message: "Adresse email invalide" })
    .optional()
    .or(z.literal("")),
  supervisorPhone: z.string().optional(),
  letter: z.string().min(1, { message: "La lettre d'acceptation est requise" }),
  country: z.string().min(1, { message: "Le pays est requis" }),
  ...dateValidation,
});

// Schéma pour la demande de mission
export const missionRequestSchema = z.object({
  hostOrganization: z
    .string()
    .min(1, { message: "L'organisation d'accueil est requise" }),
  objective: z.string().min(1, { message: "L'objectif est requis" }),
  country: z.string().min(1, { message: "Le pays est requis" }),
  specificDocument: z.array(z.string()).optional(),

  ...dateValidation,
});

// Schéma pour la demande d'événement scientifique (conférence nationale)
export const scientificEventRequestSchema = z
  .object({
    location: z.string().min(1, { message: "Le lieu est requis" }),
    urlEvent: z
      .string()
      .url({ message: "URL invalide" })
      .optional()
      .or(z.literal("")),
    mailAcceptation: z
      .string()
      .min(1, { message: "L'email d'acceptation est requis" }),
    title: z.string().min(1, { message: "Le titre de l'événement est requis" }),
    articlesAccepted: z.boolean(),
    articleCover: z.string().optional(),
    ...dateValidation,
  })
  .refine((data) => !data.articlesAccepted || data.articleCover, {
    message:
      "L'URL de la première page est requise lorsque l'article est accepté",
    path: ["articleCover"],
  });

// Schéma pour l'inscription d'article
export const articleRegistrationRequestSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  conference: z.string().optional(),
  urlConference: z
    .string()
    .url({ message: "URL invalide" })
    .optional()
    .or(z.literal("")),
  articleCover: z
    .string()
    .min(1, { message: "La couverture de l'article est requise" }),
  amount: z.string().min(1, {
    message: "Le montant des frais est requis",
  }),
});

// Schéma pour le prêt de matériel
export const equipmentLoanRequestSchema = z
  .object({
    categoryId: z.string().optional(),
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
  })
  .refine((data) => data.categoryId || data.equipmentId, {
    message:
      "Vous devez sélectionner soit une catégorie, soit un équipement spécifique",
    path: ["categoryId"],
  });

export const equipmentItemSchema = z.object({
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
  costEstimation: z.string().min(1, {
    message: "L'estimation de coût est requise",
  }),
  url: z.string().url({ message: "URL invalide" }).optional().or(z.literal("")),
  photo: z.string().optional(),
});

export const equipmentPurchaseRequestSchema = z.object({
  items: z
    .array(equipmentItemSchema)
    .min(1, {
      message: "Au moins un article doit être ajouté",
    })
    .default([
      {
        equipmentType: "",
        name: "",
        specifications: {},
        quantity: 0,
        costEstimation: "0",
      },
    ]),
});
