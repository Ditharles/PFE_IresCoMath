import { Response } from "express";
import { AuthRequest } from "../types/auth";
import prisma from "../utils/db";
import { ERROR_MESSAGES, validateRequestBody } from "../utils/authUtils";
import { createCategory, switchCategory } from "../utils/equipment";
import logger from "../logger";


//Obtenir toutes les catégories
export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    logger.debug({ context: "GET_ALL_CATEGORIES" }, "Récupération des catégories");
    const equipmentCategories = await prisma.equipmentCategory.findMany();
    res.status(200).json(equipmentCategories);
  } catch (error) {
    logger.error({ context: "GET_ALL_CATEGORIES", error }, "Erreur serveur");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

//Obtenir une catégorie
export const getCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "L'id est obligatoire" });

    logger.debug({ context: "GET_CATEGORY", categoryId: id }, "Récupération d'une catégorie");
    const category = await prisma.equipmentCategory.findUnique({
      where: { id },
      include: { equipments: true },
    });

    if (!category) {
      logger.warn({ context: "GET_CATEGORY", categoryId: id }, "Catégorie introuvable");
      return res.status(404).json({ message: "Categorie introuvable" });
    }
    res.status(200).json(category);
  } catch (error) {
    logger.error({ context: "GET_CATEGORY", error }, "Erreur serveur");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};


//Obtenir tous les équipements
export const getAllEquipments = async (req: AuthRequest, res: Response) => {
  try {
    logger.debug({ context: "GET_ALL_EQUIPMENTS" }, "Récupération des équipements");
    const equipments = await prisma.equipment.findMany({
      select: {
        id: true,
        name: true,
        photo: true,
        cost: true,
        specifications: true,
        acquisitionDate: true,
        status: true,
        category: {
          select: {
            id: true,
            name: true,
            type: true,
            photo: true,
            quantity: true,
          },
        },
      },
    });
    res.status(200).json(equipments);
  } catch (error) {
    logger.error({ context: "GET_ALL_EQUIPMENTS", error }, "Erreur serveur");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

//Obtenir les informations  d'un équipement
export const getEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "L'id est obligatoire" });

    logger.debug({ context: "GET_EQUIPMENT", equipmentId: id }, "Récupération d'un équipement");
    const equipment = await prisma.equipment.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        photo: true,
        cost: true,
        specifications: true,
        acquisitionDate: true,
        status: true,
        category: {
          select: {
            id: true,
            name: true,
            type: true,
            photo: true,
            quantity: true,
          },
        },
      },
    });

    if (!equipment) {
      logger.warn({ context: "GET_EQUIPMENT", equipmentId: id }, "Équipement introuvable");
      return res.status(404).json({ message: "Appareil introuvable" });
    }
    res.status(200).json(equipment);
  } catch (error) {
    logger.error({ context: "GET_EQUIPMENT", error }, "Erreur serveur");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

//Modifier un équipement
export const editEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "L'id est obligatoire" });

    logger.debug({ context: "EDIT_EQUIPMENT", equipmentId: id, body: req.body }, "Tentative de modification d'équipement");
    const equipment = await prisma.equipment.findUnique({ where: { id } });
    if (!equipment) {
      logger.warn({ context: "EDIT_EQUIPMENT", equipmentId: id }, "Équipement introuvable");
      return res.status(404).json({ message: "Appareil introuvable" });
    }

    const {
      name,
      categoryId,
      categories,
      photo,
      specifications = {},
      acquisitionDate,
      status,
      cost,
    } = req.body;

    const requiredFields = ["name", "categoryId"];
    if (!validateRequestBody(req.body, requiredFields)) {
      return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    const result = await switchCategory(
      categoryId,
      categories,
      "edit",
      name,
      photo,
      specifications,
      acquisitionDate,
      Number(cost),
      id
    );

    if (result.status !== 200) {
      logger.warn({ 
        context: "EDIT_EQUIPMENT", 
        equipmentId: id,
        error: result.message 
      }, "Échec de la modification de catégorie");
      return res.status(result.status).json({ message: result.message });
    }

    const updatedEquipment = await prisma.equipment.update({
      where: { id },
      data: {
        name,
        photo: photo ?? equipment.photo,
        specifications,
        acquisitionDate,
        status,
        cost: Number(cost),
      },
      include: { category: true },
    });

    logger.info({ 
      context: "EDIT_EQUIPMENT", 
      equipmentId: id,
      userId: req.user?.userId 
    }, "Équipement modifié avec succès");
    res.status(200).json({
      message: "Équipement mis à jour",
      equipment: updatedEquipment,
      category: result.category,
    });
  } catch (error) {
    logger.error({ 
      context: "EDIT_EQUIPMENT", 
      error,
      userId: req.user?.userId 
    }, "Erreur lors de la modification de l'équipement");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

//Ajouter une catégorie
export const addCategory = async (req: AuthRequest, res: Response) => {
  try {
    const requiredFields = ["name", "type"];
    if (!validateRequestBody(req.body, requiredFields)) {
      return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    logger.debug({ context: "ADD_CATEGORY", body: req.body }, "Tentative d'ajout de catégorie");
    const { status, message, category } = await createCategory(
      req.body.name,
      req.body.type,
      req.body.photo
    );

    if (status === 200) {
      logger.info({ 
        context: "ADD_CATEGORY", 
        categoryId: category?.id,
        userId: req.user?.userId 
      }, "Catégorie ajoutée avec succès");
    }

    res.status(status).json({ message, category });
  } catch (error) {
    logger.error({ 
      context: "ADD_CATEGORY", 
      error,
      userId: req.user?.userId 
    }, "Erreur lors de l'ajout de catégorie");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

//Modifier une catégorie
export const editCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "L'id est obligatoire" });

    logger.debug({ context: "EDIT_CATEGORY", categoryId: id, body: req.body }, "Tentative de modification de catégorie");
    const category = await prisma.equipmentCategory.findUnique({
      where: { id },
    });
    if (!category) {
      logger.warn({ context: "EDIT_CATEGORY", categoryId: id }, "Catégorie introuvable");
      return res.status(404).json({ message: "Categorie introuvable" });
    }

    const { name, type, description, photo } = req.body;
    await prisma.equipmentCategory.update({
      where: { id },
      data: { name, type, description, photo },
    });

    logger.info({ 
      context: "EDIT_CATEGORY", 
      categoryId: id,
      userId: req.user?.userId 
    }, "Catégorie modifiée avec succès");
    res.status(200).json({ message: "Catégorie modifiée avec succès" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "L'id est obligatoire" });

    const result = await switchCategory(id, undefined, "removeCat");

    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const addEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const { body } = req;
    const {
      categoryId,
      name,
      categories,
      photo,
      specifications,
      acquisitionDate,
      status,
      cost,
    } = body;

    const requiredFields = ["name", "categoryId", "specifications"];
    if (!validateRequestBody(body, requiredFields)) {
      return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    // Utilisation de switchCategory pour gérer l'ajout
    const result = await switchCategory(
      categoryId,
      categories,
      "add",
      name,
      photo,
      specifications,
      acquisitionDate,
      Number(cost),
      status
    );

    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    res.status(200).json({
      message: "Appareil ajouté avec succès",
      equipment: result.equipment,
    });
  } catch (error) {
    console.error("Error in addEquipment:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const deleteEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "L'id est obligatoire" });

    const equipment = await prisma.equipment.findUnique({ where: { id } });
    if (!equipment)
      return res.status(404).json({ message: "Appareil introuvable" });

    await prisma.equipmentCategory.update({
      where: { id: equipment.categoryId },
      data: { quantity: { decrement: 1 } },
    });

    await prisma.equipment.delete({ where: { id } });
    res.status(200).json({ message: "Appareil supprimé avec succès" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
