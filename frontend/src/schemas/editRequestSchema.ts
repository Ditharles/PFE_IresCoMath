import { z } from "zod";

const dateValidation = {
  startDate: z
    .date()
    .min(new Date(), { message: "La date de début est requise" }),
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

export const editInternshipRequestSchema = z
  .object({
    id: z.string().min(1, { message: "L'id est requis" }),
    organization: z
      .string()
      .min(1, { message: "Le nom de l'organisation est requis" })
      .optional(),
    organizationEmail: z
      .string()
      .min(1, { message: "L'adresse email est requise" })
      .email({ message: "Adresse email invalide" })
      .optional(),
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
    letter: z
      .string()
      .min(1, { message: "La lettre d'acceptation est requise" })
      .optional(),
    country: z.string().min(1, { message: "Le pays est requis" }).optional(),
    ...dateValidation,
  })
  .partial();

// Schéma pour éditer une demande de mission
export const editMissionRequestSchema = z
  .object({
    id: z.string().min(1, { message: "L'id est requis" }),
    hostOrganization: z
      .string()
      .min(1, { message: "L'organisation d'accueil est requise" })
      .optional(),
    objective: z
      .string()
      .min(1, { message: "L'objectif est requis" })
      .optional(),
    country: z.string().min(1, { message: "Le pays est requis" }).optional(),
    specificDocument: z.array(z.string()).optional(),
    ...dateValidation,
  })
  .partial();

// Schéma pour éditer une demande d'événement scientifique
export const editScientificEventRequestSchema = z
  .object({
    id: z.string().min(1, { message: "L'id est requis" }),
    location: z.string().min(1, { message: "Le lieu est requis" }).optional(),
    urlEvent: z
      .string()
      .url({ message: "URL invalide" })
      .optional()
      .or(z.literal("")),
    mailAcceptation: z
      .string()
      .min(1, { message: "L'email d'acceptation est requise" })
      .optional(),
    title: z
      .string()
      .min(1, { message: "Le titre de l'événement est requis" })
      .optional(),
    articlesAccepted: z.boolean().optional(),
    articleCover: z.string().optional(),
    ...dateValidation,
  })
  .partial()
  .refine((data) => !data.articlesAccepted || data.articleCover, {
    message:
      "L'URL de la première page est requise lorsque l'article est accepté",
    path: ["articleCover"],
  });

// Schéma pour éditer une inscription d'article
export const editArticleRegistrationRequestSchema = z

  .object({
    title: z.string().min(1, { message: "Le titre est requis" }).optional(),
    id: z.string().min(1, { message: "L'id est requis" }),
    conference: z.string().optional(),
    urlConference: z
      .string()
      .url({ message: "URL invalide" })
      .optional()
      .or(z.literal("")),
    articleCover: z
      .string()
      .min(1, { message: "La couverture de l'article est requise" })
      .optional(),
    amount: z
      .string()
      .min(1, {
        message: "Le montant des frais est requis",
      })
      .optional(),
  })
  .partial();

// Schéma pour éditer un prêt de matériel
export const editEquipmentLoanRequestSchema = z
  .object({
    id: z.string().min(1, { message: "L'id est requis" }),
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
      })
      .optional(),
    notes: z.string().optional(),
    ...dateValidation,
  })
  .partial()
  .refine(
    (data) =>
      !(data.categoryId || data.equipmentId) ||
      data.categoryId ||
      data.equipmentId,
    {
      message:
        "Vous devez sélectionner soit une catégorie, soit un équipement spécifique",
      path: ["categoryId"],
    }
  );

// Schéma pour éditer un item de matériel
export const editEquipmentPurchaseRequestSchema = z
  .object({
    id: z.string().min(1, { message: "L'id est requis" }),
    equipmentType: z
      .string()
      .min(1, { message: "Le type de matériel est requis" })
      .optional(),
    name: z
      .string()
      .min(1, { message: "Le nom du matériel est requis" })
      .optional(),
    specifications: z.record(z.string(), z.any()).optional(),
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
      })
      .optional(),
    costEstimation: z
      .string()
      .min(1, {
        message: "L'estimation de coût est requise",
      })
      .optional(),
    url: z
      .string()
      .url({ message: "URL invalide" })
      .optional()
      .or(z.literal("")),
    photo: z.string().optional(),
  })
  .partial();

export const editRepairMaitenanceRequestSchema = z.object({
  id: z.string().min(1, { message: "L'id est requis" }),
  title: z.string().min(1, { message: "Le titre est requis" }).optional(),
  description: z
    .string()
    .min(1, { message: "La description est requise" })
    .optional(),
  photo: z.array(z.string()).optional(),
});
// Union de tous les schémas d'édition
export const editRequestSchema = z.union([
  editInternshipRequestSchema,
  editMissionRequestSchema,
  editScientificEventRequestSchema,
  editArticleRegistrationRequestSchema,
  editEquipmentLoanRequestSchema,
  editEquipmentPurchaseRequestSchema,
]);

// Type pour TypeScript
export type EditRequestInput = z.infer<typeof editRequestSchema>;
