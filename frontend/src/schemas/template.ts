import { z } from "zod";
import { RequestType } from "../types/request";

export const templateSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  url: z.string().url({ message: "URL invalide" }),
  for: z.enum(Object.values(RequestType) as [string, ...string[]]),
  placeholders: z
    .array( z.string())
    .min(1, { message: "Au moins un placeholder est requis" }),
});

export const editTemplateSchema = z.object({
  id: z.string().min(1, { message: "L'id est requis" }),
  name: templateSchema.shape.name.optional(),
  url: templateSchema.shape.url.optional(),
  for: templateSchema.shape.for.optional(),
  placeholders: templateSchema.shape.placeholders.optional(),
});
