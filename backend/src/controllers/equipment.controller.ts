import { Response } from "express";
import { AuthRequest } from "../types/auth";
import prisma from "../utils/db";
import { ERROR_MESSAGES, validateRequestBody } from "../utils/authUtils";
import { createCategory, switchCategory } from "../utils/equipment";

export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const equipmentCategories = await prisma.equipmentCategory.findMany();
    res.status(200).json(equipmentCategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "L'id est obligatoire" });

    const category = await prisma.equipmentCategory.findUnique({
      where: { id },
      include: { equipments: true },
    });

    if (!category)
      return res.status(404).json({ message: "Categorie introuvable" });
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getAllEquipments = async (req: AuthRequest, res: Response) => {
  try {
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
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "L'id est obligatoire" });

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

    if (!equipment)
      return res.status(404).json({ message: "Appareil introuvable" });
    res.status(200).json(equipment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const editEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "L'id est obligatoire" });

    const equipment = await prisma.equipment.findUnique({ where: { id } });
    if (!equipment)
      return res.status(404).json({ message: "Appareil introuvable" });

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

    // Utilisation de switchCategory pour gérer le changement de catégorie
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
      return res.status(result.status).json({ message: result.message });
    }

    // Mise à jour des autres champs
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
    console.log(updatedEquipment);
    res.status(200).json({
      message: "Équipement mis à jour",
      equipment: updatedEquipment,
      category: result.category,
    });
  } catch (error) {
    console.error("Erreur lors de la modification de l'équipement:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const addCategory = async (req: AuthRequest, res: Response) => {
  try {
    const requiredFields = ["name", "type"];
    if (!validateRequestBody(req.body, requiredFields)) {
      return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    const { status, message, category } = await createCategory(
      req.body.name,
      req.body.type,
      req.body.photo
    );

    res.status(status).json({ message, category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const editCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "L'id est obligatoire" });

    const category = await prisma.equipmentCategory.findUnique({
      where: { id },
    });
    if (!category)
      return res.status(404).json({ message: "Categorie introuvable" });

    const { name, type, description, photo } = req.body;
    await prisma.equipmentCategory.update({
      where: { id },
      data: { name, type, description, photo },
    });

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
