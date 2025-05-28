import {
  downloadFile,
  extractTextFromDocx,
  findPlaceHolders,
  modifyText,
  updateAllForm,
  validateTemplate,
} from "../services/template.service";
import { AuthRequest } from "../types/auth";
import { Response } from "express";
import { ERROR_MESSAGES, validateRequestBody } from "../utils/authUtils";
import prisma from "../utils/db";
import { Prisma, RequestType } from "../../generated/prisma";
import { getRequest } from "./requests.controller";
import { getRequestById } from "../services/requests.service";
import { getUserByID } from "../services/auth.service";
import { utapi } from "../uploadthing";
import { defineValueMap } from "../utils/templates";

export const getTemplates = async (req: AuthRequest, res: Response) => {
  try {
    const templates = await prisma.template.findMany();
    res.status(200).json(templates);
  } catch (error) {
    console.error("Error in getTemplates:", error);
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    });
  }
};

export const getTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const template = await prisma.template.findUnique({
      where: { id: req.params.id },
    });
    res.status(200).json(template);
  } catch (error) {
    console.error("Error in getTemplate:", error);
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    });
  }
};
export const verifyTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      res.status(400).json({ message: "Veuillez fournir une url" });
    }

    const response = await downloadFile(url);
    if (response.status !== 200) {
      res.status(response.status).json({ message: response.message });
    }

    if (!response.data) {
      res.status(400).json({ message: "Aucune donnée téléchargée" });
    }
    const text = await extractTextFromDocx(response.data ?? Buffer.alloc(0));
    const placeholders = findPlaceHolders(text);
    const nonAuthorizedPlaceholders = validateTemplate(placeholders);
    console.log(nonAuthorizedPlaceholders);
    if (nonAuthorizedPlaceholders.length > 0) {
      res.status(400).json({
        message: `Des champs non authorisés ont été trouvés : ${nonAuthorizedPlaceholders
          .map((p) => p.fieldName)
          .join(", ")}. Merci de suivre les instructions`,
      });
    }
    res
      .status(200)
      .json({ message: "Template vérifié", placeholders: placeholders });
  } catch (error) {
    console.error("Error in verifyTemplate:", error);
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    });
  }
};

export const updateTemplate = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "ID du template manquant" });
    }

    const template = await prisma.template.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        updatedAt: new Date(),
      },
    });
    const { status, message } = await updateAllForm(template);
    if (status !== 200) {
      res.status(status).json({ message });
    }
    res.status(200).json({
      message: "Template mis à jour avec succès",
      template,
    });
  } catch (error: unknown) {
    console.error("Error in updateTemplate:", error);
    if (error instanceof Error && "code" in error && error.code === "P2025") {
      res.status(404).json({ message: "Template non trouvé" });
    }
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    });
  }
};

export const submitTemplate = async (req: AuthRequest, res: any) => {
  try {
    const requiredFields = ["url", "placeholders", "for", "name"];
    if (!validateRequestBody(req.body, requiredFields)) {
      res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
      return;
    }
    const { upsert, name, for: requestType, url, placeholders } = req.body;
    const existingName = await prisma.template.findFirst({
      where: { name: name },
    });

    if (existingName) {
      res.status(400).json({
        message: "Un template avec un nom similaire existe déjà",
      });
      return;
    }

    const existingTemplate = await prisma.template.findUnique({
      where: { for: requestType },
    });

    if (existingTemplate && !upsert) {
      res.status(400).json({
        message: "Un template existe déjà pour ce type de requête",
      });
      return;
    }

    const templateData = {
      name,
      for: requestType,
      url,
      placeholders: placeholders as string[],
    };
    console.log("test");
    const template = upsert
      ? await prisma.template.update({
          where: { for: requestType },
          data: templateData,
        })
      : await prisma.template.create({ data: templateData });

    if (!upsert || (existingTemplate && existingTemplate.url !== url)) {
      const { status, message } = await updateAllForm(template);
      if (status !== 200) {
        res.status(status).json({ message });
        return;
      }
    }

    res.status(200).json({
      message: upsert
        ? "Template mis à jour avec succès"
        : "Template créé avec succès",
      template,
    });
    return;
  } catch (error) {
    console.error("Error in submitTemplate:", error);
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    });
    return;
  }
};

export const deleteTemplate = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "ID du template manquant" });
    }

    const template = await prisma.template.delete({
      where: { id: req.params.id },
    });
    const request = await prisma.request.updateMany({
      where: {
        type: template.for,
        signForm: null,
      },
      data: {
        awaitForm: null,
      },
    });
    res.status(200).json({
      message: "Template supprimé avec succès",
      template,
    });
  } catch (error) {
    console.error("Error in deleteTemplate:", error);
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    });
  }
};
