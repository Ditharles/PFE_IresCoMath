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
import logger from "../logger"; // Correction de l'import du logger
const PLACE_HOLDER_REGEX = /{([^}]+)}/g;
import { Request } from "../../generated/prisma";
interface Placeholder {
  fieldName: string;
  fullMatch: string;
}

export const downloadFile = async (
  url: string
): Promise<{ status: number; message: string; data?: Buffer }> => {
  try {
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

// export const modifyText = async (
//   docxBuffer: Buffer,
//   placeholders: string[],
//   valueMap: Record<string, string>
// ) => {
//   try {
//     console.log("placeholders", placeholders);
//     const validation = validatePlaceholders(placeholders, valueMap);
//     if (!validation.isValid) {
//       throw new Error(
//         `Champs manquants: ${validation.missingFields.join(", ")}`
//       );
//     }
//     const filterValueMap = Object.fromEntries(
//       Object.entries(valueMap).filter(([key, value]) =>
//         placeholders.includes(key)
//       )
//     );
//     console.log("filterValueMap", filterValueMap);
//     const buffer = await createReport({
//       template: docxBuffer,
//       data: filterValueMap,
//       additionalJsContext: {
//         formatDate: (date: Date) => {
//           return date.toLocaleDateString("fr-FR");
//         },
//       },
//     });
//     return Buffer.from(buffer);
//   } catch (error) {
//     throw new Error(`Erreur lors de la modification du texte`);
//   }
// };

export const modifyText = async (
  docxBuffer: Buffer,
  placeholders: string[],
  valueMap: Record<string, string>
) => {
  try {
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

    const templateText = await extractTextFromDocx(docxBuffer);

    const buffer = await createReport({
      template: docxBuffer,
      data: filterValueMap,
      additionalJsContext: {
        formatDate: (date: Date) => {
          return date.toLocaleDateString("fr-FR");
        },
      },
      cmdDelimiter: ["{", "}"],
      noSandbox: false,
    });

    return Buffer.from(buffer);
  } catch (error) {
    throw new Error(
      `Erreur lors de la modification du texte: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const updateAllForm = async (template: Template) => {
  try {
    const requests = await prisma.request.findMany({
      where: {
        type: template.for,
        status: { in: [RequestStatus.PENDING, RequestStatus.APPROVED] },
      },
      select: extendRequestFields,
    });

    logger.info(
      { count: requests.length },
      "Nombre de requêtes à mettre à jour avec le template"
    );

    const docxBuffer = await downloadFile(template.url);
    if (!docxBuffer.data) {
      return {
        status: 400,
        message: "Aucune donnée téléchargée",
      };
    }

    const textMap = await Promise.all(
      requests.map(async (request) => {
        const valueMap = defineValueMap(request, request.type);

        const textModified = await modifyText(
          docxBuffer.data as Buffer,
          template.placeholders,
          valueMap
        );
        return {
          id: request.id,
          textModified,
        };
      })
    );

    const tmpFiles = await Promise.all(
      textMap.map(async ({ id, textModified }) => {
        const file = await tmpFile({ postfix: ".docx" });
        await writeFile(file.path, textModified);
        return {
          id,
          path: file.path,
          cleanup: file.cleanup,
        };
      })
    );

    try {
      const uploadResults = await utapi.uploadFiles(
        tmpFiles.map((file) => {
          const uint8Array = new Uint8Array(fs.readFileSync(file.path));

          return new File([uint8Array], path.basename(file.path), {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
        })
      );

      if (
        !uploadResults ||
        !uploadResults.every((result) => result.data?.ufsUrl)
      ) {
        logger.error("L'upload des fichiers a échoué", { uploadResults });
        return {
          status: 400,
          message: "L'upload des fichiers a échoué",
        };
      }

      const updatedRequests = await Promise.all(
        tmpFiles.map((file, index) => {
          const fileUrl = uploadResults[index].data?.ufsUrl;
          if (!fileUrl) {
            return {
              status: 400,
              message: `Upload manquant pour la requête ${file.id}`,
            };
          }

          return prisma.request.update({
            where: { id: file.id },
            data: {
              awaitForm: fileUrl,
            },
          });
        })
      );

      return {
        status: 200,
        message: "Formulaires mis à jour avec succès",
        data: updatedRequests,
      };
    } finally {
      await Promise.all(tmpFiles.map((file) => file.cleanup()));
    }
  } catch (error) {
    logger.error(error, "Échec de la mise à jour des formulaires");
    return {
      status: 500,
      message: `Échec de la mise à jour des formulaires: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
};

export const createForm = async (requestId: string) => {
  try {
    // Récupérer la requête
    const request = await prisma.request.findUnique({
      where: { id: requestId },
      select: extendRequestFields,
    });

    if (!request) {
      logger.warn({ context: "CREATE_FORM" }, "Requête introuvable");
      return {
        status: 404,
        message: "Requête introuvable",
      };
    }

    // Récupérer le template correspondant au type de requête
    const template = await prisma.template.findFirst({
      where: { for: request.type },
    });

    if (!template) {
      return;
    }

    // Télécharger le template DOCX
    const docxBuffer = await downloadFile(template.url);
    if (!docxBuffer.data) {
      logger.warn(
        { context: "CREATE_FORM" },
        "Tentative de création de formulaire échoué"
      );
      return {
        status: 400,
        message: "Aucune donnée téléchargée depuis l'URL du template",
      };
    }

    // Générer le mapping des valeurs
    const valueMap = defineValueMap(request, request.type);

    // Modifier le document
    const modifiedDocx = await modifyText(
      docxBuffer.data as Buffer,
      template.placeholders,
      valueMap
    );

    // Créer un fichier temporaire
    const tmpFileResult = await tmpFile({ postfix: ".docx" });
    await writeFile(tmpFileResult.path, modifiedDocx);

    try {
      // Préparer le fichier pour l'upload
      const uint8Array = new Uint8Array(fs.readFileSync(tmpFileResult.path));
      const file = new File([uint8Array], path.basename(tmpFileResult.path), {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Upload sur UploadThing
      const uploadResults = await utapi.uploadFiles([file]);

      if (!uploadResults || !uploadResults[0]?.data?.ufsUrl) {
        logger.error("Échec de l'upload du formulaire", { uploadResults });
        return {
          status: 400,
          message: "Échec de l'upload du formulaire",
        };
      }

      // Mettre à jour le champ awaitForm de la requête
      await prisma.request.update({
        where: { id: request.id },
        data: {
          awaitForm: uploadResults[0].data.ufsUrl,
        },
      });

      return {
        status: 200,
        message: "Formulaire créé avec succès",
        data: {
          formUrl: uploadResults[0].data.ufsUrl,
        },
      };
    } finally {
      // Nettoyer le fichier temporaire
      await tmpFileResult.cleanup();
    }
  } catch (error) {
    logger.error(error, "Échec de la création du formulaire");
    return {
      status: 500,
      message: `Échec de la création du formulaire: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
};
