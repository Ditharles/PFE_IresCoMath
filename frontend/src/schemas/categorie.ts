import { z } from "zod";

export const categorieSchema = z.object({
  name: z.string().min(1, { message: "Le nom de la categorie est requis" }),
  type: z.string().min(1, { message: "Le type de la categorie est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  photo: z.array(z.string()).optional(),
});

export const editCategorieSchema = z
  .object({
    id: z.string().min(1, { message: "L'id est requis" }),
    name: z
      .string()
      .min(1, { message: "Le nom de la categorie est requis" })
      .optional(),
    type: z
      .string()
      .min(1, { message: "Le type de la categorie est requis" })
      .optional(),
    description: z
      .string()
      .min(1, { message: "La description est requise" })
      .optional(),
    photo: z.array(z.string()).optional(),
  })
  .partial();
