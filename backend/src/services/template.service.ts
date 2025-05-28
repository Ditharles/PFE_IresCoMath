import axios from "axios";
import { createReport } from "docx-templates";
import { Buffer } from "buffer";
import * as mammoth from "mammoth";
import { authorizedFields } from "../constants/template";
import { RequestStatus, Template } from "../../generated/prisma";
import { extendRequestFields } from "../constants/requests";
import { userFields } from "../constants/userFields";
import prisma from "../utils/db";
import { defineValueMap } from "../utils/templates";

import fs from "fs";
import { file as tmpFile } from "tmp-promise";
import { utapi } from "../uploadthing";
import path from "path";
import { write } from "fs";
import { writeFile } from "fs/promises";
import { FileEsque } from "uploadthing/types";
import { text } from "body-parser";
const PLACE_HOLDER_REGEX = /{([^}]+)}/g;

interface Placeholder {
  fieldName: string;
  fullMatch: string;
}

export const downloadFile = async (
  url: string
): Promise<{ status: number; message: string; data?: Buffer }> => {
  try {
    console.log(url);
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return {
      status: 200,
      message: "Fichier téléchargé avec succès",
      data: Buffer.from(response.data),
    };
  } catch (error) {
    return {
      status: 500,
      message: "Erreur lors du téléchargement du fichier",
    };
  }
};

export const extractTextFromDocx = async (buffer: Buffer): Promise<string> => {
  try {
    // Utilisation de mammoth pour extraire le texte
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    throw new Error("Erreur lors de l'extraction du texte du document");
  }
};

export const findPlaceHolders = (text: string): Placeholder[] => {
  try {
    const matches = text.matchAll(PLACE_HOLDER_REGEX);
    return Array.from(matches).map((match) => ({
      fieldName: match[1],
      fullMatch: match[0],
    }));
  } catch (error) {
    throw new Error("Erreur lors de la recherche des placeholders");
  }
};

export const validateTemplate = (
  placeholders: Placeholder[]
): Placeholder[] => {
  try {
    const authorizedFieldsSet = new Set(Object.keys(authorizedFields));

    const nonAuthorized = placeholders.filter(
      (placeholder) => !authorizedFieldsSet.has(placeholder.fieldName)
    );

    return nonAuthorized;
  } catch (error) {
    console.log(error);
    throw new Error("Erreur lors de la validation du template");
  }
};
export const validatePlaceholders = (
  placeholders: string[],
  valueMap: Record<string, string>
): { isValid: boolean; missingFields: string[] } => {
  try {
    const missingFields = placeholders
      .filter((placeholder) => !valueMap[placeholder])
      .map((placeholder) => placeholder);

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  } catch (error) {
    throw new Error("Erreur lors de la validation des placeholders");
  }
};

export const modifyText = async (
  docxBuffer: Buffer,
  placeholders: string[],
  valueMap: Record<string, string>
) => {
  try {
    console.log("placeholders", placeholders);
    const validation = validatePlaceholders(placeholders, valueMap);
    if (!validation.isValid) {
      throw new Error(
        `Champs manquants: ${validation.missingFields.join(", ")}`
      );
    }
    const filterValueMap = Object.fromEntries(
      Object.entries(valueMap).filter(([key, value]) =>
        placeholders.includes(key)
      )
    );
    const buffer = await createReport({
      template: docxBuffer,
      data: filterValueMap,
      additionalJsContext: {
        formatDate: (date: Date) => {
          return date.toLocaleDateString("fr-FR");
        },
      },
    });
    return Buffer.from(buffer);
  } catch (error) {
    throw new Error(`Erreur lors de la modification du texte`);
  }
};

export const updateAllForm = async (template: Template) => {
  console.log("Début updateAllForm - Template:", template);
  try {
    // Récupération des requêtes
    console.log("Recherche des requêtes pour le type:", template.for);
    const requests = await prisma.request.findMany({
      where: {
        type: template.for,
        status: { in: [RequestStatus.PENDING, RequestStatus.APPROVED] },
      },
      select: extendRequestFields,
    });
    console.log("Requêtes trouvées:", requests.length);

    // Téléchargement du template
    console.log("Téléchargement du template depuis:", template.url);
    const docxBuffer = await downloadFile(template.url);
    if (!docxBuffer.data) {
      console.log("Erreur: Aucune donnée téléchargée");
      return {
        status: 400,
        message: "Aucune donnée téléchargée",
      };
    }
    console.log("Template téléchargé avec succès");

    // Génération des documents modifiés
    console.log("Début de la modification des textes");
    const textMap = await Promise.all(
      requests.map(async (request) => {
        console.log("Traitement de la requête:", request.id);
        const valueMap = defineValueMap(request, request.type);

        const textModified = await modifyText(
          docxBuffer.data as Buffer,
          template.placeholders,
          valueMap
        );
        console.log("Texte modifié pour requête:", textModified);
        return {
          id: request.id,
          textModified,
        };
      })
    );
    console.log("Textes modifiés pour", textMap.length, "requêtes");

    // Création des fichiers temporaires
    console.log("Création des fichiers temporaires");
    const tmpFiles = await Promise.all(
      textMap.map(async ({ id, textModified }) => {
        console.log("Création fichier temporaire pour requête:", id);
        const file = await tmpFile({ postfix: ".docx" });
        await writeFile(file.path, textModified);
        return {
          id,
          path: file.path,
          cleanup: file.cleanup,
        };
      })
    );
    console.log("Fichiers temporaires créés:", tmpFiles.length);

    try {
      // Upload des fichiers avec UploadThing
      console.log("Début de l'upload des fichiers");
      const uploadResults = await utapi.uploadFiles(
        tmpFiles.map((file) => {
          console.log("Préparation upload pour fichier:", file.path);
          const uint8Array = new Uint8Array(fs.readFileSync(file.path));

          return new File([uint8Array], path.basename(file.path), {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
        })
      );
      console.log("Résultats upload:", uploadResults);

      // Vérification des résultats
      if (
        !uploadResults ||
        !uploadResults.every((result) => result.data?.ufsUrl)
      ) {
        console.log("Erreur: Upload incomplet ou échoué");
        return {
          status: 400,
          message: "L'upload des fichiers a échoué",
        };
      }

      // Mise à jour des requêtes avec les URLs
      console.log("Mise à jour des requêtes avec les URLs");
      const updatedRequests = await Promise.all(
        tmpFiles.map((file, index) => {
          const fileUrl = uploadResults[index].data?.ufsUrl;
          if (!fileUrl) {
            console.log("Erreur: URL manquante pour la requête", file.id);
            return {
              status: 400,
              message: `Upload manquant pour la requête ${file.id}`,
            };
          }

          console.log("Mise à jour requête", file.id, "avec URL:", fileUrl);
          return prisma.request.update({
            where: { id: file.id },
            data: {
              awaitForm: fileUrl,
            },
          });
        })
      );

      console.log("Mise à jour terminée avec succès");
      return {
        status: 200,
        message: "Formulaires mis à jour avec succès",
        data: updatedRequests,
      };
    } finally {
      // Nettoyage des fichiers temporaires
      console.log("Nettoyage des fichiers temporaires");
      await Promise.all(tmpFiles.map((file) => file.cleanup()));
    }
  } catch (error) {
    console.error("Erreur détaillée dans updateAllForm:", error);
    console.error(
      "Stack trace:",
      error instanceof Error ? error.stack : "Pas de stack trace"
    );
    return {
      status: 500,
      message: `Échec de la mise à jour des formulaires: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
};
