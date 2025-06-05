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

// Cette fonction permet de récupérer tous les templates
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

// Cette fonction permet de récupérer un template par son ID
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

// Cette fonction permet de vérifier un template.Actuellement, elle télécharge le fichier et vérifie les placeholders.
//TODO: Ajouter la vérification des champs autorisés selon le type de requête
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

// Cette fonction permet de mettre à jour un template par son ID
//Actuellement, elle permet de modifier uniquement le nom
//TODO: Ajouter la possibilité de modifier l'url et ansi les placeholders(le travail est essentiellement coté client)
export const updateTemplate = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "ID du template manquant" });
    }

    const findTemplate = await prisma.template.findUnique({
      where: { id: req.params.id },
    });
    if (!findTemplate) {
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

// Cette fonction permet de soumettre un template  et d'écraser un template existant(logique utilisable actuellement pour la modification d'un template)
export const submitTemplate = async (req: AuthRequest, res: any) => {
  try {
    const requiredFields = ["url", "placeholders", "for", "name"];
    if (!validateRequestBody(req.body, requiredFields)) {
      res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
      return;
    }
    const { upsert, name, for: requestType, url, placeholders } = req.body;
    //On verifie qu'un template de ce nom n'existe pas déjà
    const existingName = await prisma.template.findFirst({
      where: { name: name },
    });

    if (existingName) {
      res.status(400).json({
        message: "Un template avec un nom similaire existe déjà",
      });
      return;
    }
    // On verifie qu'un template de ce type de requete n'existe pas déjà
    const existingTemplate = await prisma.template.findUnique({
      where: { for: requestType },
    });

    if (existingTemplate && !upsert) {
      res.status(400).json({
        message: "Un template existe déjà pour ce type de requête",
      });
      return;
    }
    //Si upsert() est vrai, on met à jour le template existant, sinon on en crée un nouveau
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

// Cette fonction permet de supprimer un template par son ID
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
