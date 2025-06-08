import {
  downloadFile,
  extractTextFromDocx,
  findPlaceHolders,
  updateAllForm,
  validateTemplate,
} from "../services/template.service";
import { AuthRequest } from "../types/auth";
import { Response } from "express";
import { ERROR_MESSAGES, validateRequestBody } from "../utils/authUtils";
import prisma from "../utils/db";
import logger from "../logger";

// Cette fonction permet de récupérer tous les templates
export const getTemplates = async (req: AuthRequest, res: Response) => {
  try {
    const templates = await prisma.template.findMany();
    res.status(200).json(templates);
  } catch (error) {
    logger.error(
      { context: "GET_TEMPLATES", error, userId: req.user?.userId },
      "Erreur lors de la récupération des templates"
    );
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    });
  }
};

// Cette fonction permet de récupérer un template par son ID
export const getTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const template = await prisma.template.findUnique({
      where: { id: req.params.id },
    });
    if (!template) {
      logger.warn(
        { context: "GET_TEMPLATE", templateId: req.params.id },
        "Template introuvable"
      );
    }
    res.status(200).json(template);
  } catch (error) {
    logger.error(
      { context: "GET_TEMPLATE", error, templateId: req.params.id },
      "Erreur lors de la récupération d'un template"
    );
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
    logger.error(
      { context: "VERIFY_TEMPLATE", error, userId: req.user?.userId },
      "Erreur lors de la vérification du template"
    );
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

    const findTemplate = await prisma.template.findUnique({
      where: { id: req.params.id },
    });
    if (!findTemplate) {
      logger.warn(
        { context: "UPDATE_TEMPLATE", templateId: req.params.id },
        "Tentative de modification d'un template introuvable"
      );
      res.status(404).json({ message: "Template non trouvé" });
    }
    const template = await prisma.template.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        updatedAt: new Date(),
      },
    });

    if (
      findTemplate!.for !== template.for ||
      findTemplate!.placeholders.length !== template.placeholders.length ||
      findTemplate!.url !== template.url
    ) {
      const { status, message } = await updateAllForm(template);
      if (status !== 200) {
        res.status(status).json({ message });
      }
    }

    logger.info(
      {
        context: "UPDATE_TEMPLATE",
        templateId: req.params.id,
        userId: req.user?.userId,
      },
      "Template mis à jour avec succès"
    );
    res.status(200).json({
      message: "Template mis à jour avec succès",
      template,
    });
  } catch (error: unknown) {
    logger.error(
      {
        context: "UPDATE_TEMPLATE",
        error,
        templateId: req.params.id,
        userId: req.user?.userId,
      },
      "Erreur lors de la mise à jour du template"
    );
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

    logger.info(
      {
        context: "SUBMIT_TEMPLATE",
        templateId: template.id,
        userId: req.user?.userId,
        action: upsert ? "update" : "create",
      },
      `Template ${upsert ? "mis à jour" : "créé"} avec succès`
    );
    res.status(200).json({
      message: upsert
        ? "Template mis à jour avec succès"
        : "Template créé avec succès",
      template,
    });
    return;
  } catch (error) {
    logger.error(
      {
        context: "SUBMIT_TEMPLATE",
        error,
        userId: req.user?.userId,
      },
      "Erreur lors de la soumission du template"
    );
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
    await prisma.request.updateMany({
      where: {
        type: template.for,
        signForm: null,
      },
      data: {
        awaitForm: null,
      },
    });

    logger.info(
      {
        context: "DELETE_TEMPLATE",
        templateId: req.params.id,
        userId: req.user?.userId,
      },
      "Template supprimé avec succès"
    );
    res.status(200).json({
      message: "Template supprimé avec succès",
      template,
    });
  } catch (error) {
    logger.error(
      {
        context: "DELETE_TEMPLATE",
        error,
        templateId: req.params.id,
        userId: req.user?.userId,
      },
      "Erreur lors de la suppression du template"
    );
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    });
  }
};
