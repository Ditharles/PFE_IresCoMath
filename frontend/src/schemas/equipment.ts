import { z } from "zod";
import { categorieSchema } from "./categorie";

export const equipmentSchema = z
  .object({
    categoryId: z.string().min(1, { message: "La catégorie est requise" }),

    // si categoryId est autre, categories est obligatoire
    categories: z.optional(categorieSchema),

    name: z.string().min(1, { message: "Le nom du matériel est requis" }),

    specifications: z.record(z.string(), z.any()).optional(),
    status: z.string().optional(),
    acquisitionDate: z.date().optional(),
    cost: z.union([z.number(), z.string()]).optional(),
    photo: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.categoryId === "autre" && !data.categories) {
      ctx.addIssue({
        path: ["categories"],
        code: z.ZodIssueCode.custom,
        message:
          "Vous devez renseigner la catégorie si vous choisissez 'autre'.",
      });
    }
  });

export const editEquipmentSchema = z
  .object({
    id: z.string().min(1, { message: "L'id est requis" }),
    categoryId: z.string().min(1, { message: "La catégorie est requise" }),
    categories: z.optional(categorieSchema),
    name: z
      .string()
      .min(1, { message: "Le nom du matériel est requis" })
      .optional(),
    specifications: z.record(z.string(), z.any()).optional().default({}),
    acquisitionDate: z.date().optional(),
    cost: z
      .string()
      .min(1, {
        message: "L'estimation de coût est requise",
      })
      .optional(),
    status: z.string().optional(),
    photo: z.array(z.string()).optional(),
  })
  .partial()
  .superRefine((data, ctx) => {
    if (data.categoryId === "autre" && !data.categories) {
      ctx.addIssue({
        path: ["categories"],
        code: z.ZodIssueCode.custom,
        message:
          "Vous devez renseigner la catégorie si vous choisissez 'autre'.",
      });
    }
  });
