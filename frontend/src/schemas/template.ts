import { z } from "zod";
import { RequestType } from "../types/request";

export const templateSchema = z.object({
  name: z.string().min(1, { message: "Le nom du template est requis" }),
  url: z.string().url({ message: "L'URL du template est invalide" }),
  for: z.enum(Object.values(RequestType) as [string, ...string[]], {
    errorMap: () => ({ message: "Le type de demande est invalide" })
  }),
  placeholders: z
    .array(z.string())
    .min(1, { message: "Au moins un champ de remplacement est requis" }),
});

export const editTemplateSchema = z.object({
  id: z.string().min(1, { message: "L'identifiant du template est requis" }),
  name: templateSchema.shape.name.optional(),
  url: templateSchema.shape.url.optional(),
  for: templateSchema.shape.for.optional(),
  placeholders: templateSchema.shape.placeholders.optional(),
});
