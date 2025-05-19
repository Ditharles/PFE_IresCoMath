import { Response } from "express";
import { AuthRequest } from "../types/auth";
import prisma from "../utils/db";
import { ERROR_MESSAGES, validateRequestBody } from "../utils/authUtils";

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
    if (!id) res.status(400).json({ message: "L'id est obligatoire" });
    const category = await prisma.equipmentCategory.findUnique({
      where: { id: req.params.id },
      include: {
        equipments: true,
      },
    });
    if (!category) res.status(404).json({ message: "Categorie introuvable" });
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getAllEquipments = async (req: AuthRequest, res: Response) => {
  try {
    const equipments = await prisma.equipment.findMany({
      include: {
        category: true,
      },
    });
    console.log(equipments[0]);
    res.status(200).json(equipments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: "L'id est obligatoire" });
    const equipment = await prisma.equipment.findUnique({
      where: { id: req.params.id },
      include: {
        category: true,
      }
    });
    res.status(200).json(equipment);
  } catch (error) {
    console.log(error);
  }
};

export const editEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "L'id est obligatoire" });
    }

    const equipment = await prisma.equipment.findUnique({ where: { id } });
    if (!equipment) {
      res.status(404).json({ message: "Appareil introuvable" });
    }

    const {
      name,
      categoryId,
      categories,
      photo,
      specifications = {},
      acquisitionDate,
      status,
    } = req.body;

    const requiredFields = ["name", "categoryId"];
    if (!validateRequestBody(req.body, requiredFields)) {
      res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    let finalCategoryId = categoryId;

    // Création d'une nouvelle catégorie si "autre" est sélectionné
    if (categoryId === "autre") {
      if (!categories || !validateRequestBody(categories, ["name", "type"])) {
        res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
      }

      const existingCategory = await prisma.equipmentCategory.findFirst({
        where: { name: { contains: categories.name, mode: "insensitive" } },
      });

      if (existingCategory) {
        res.status(400).json({
          message: "Une catégorie avec un nom similaire existe déjà.",
        });
      }

      const newCategory = await prisma.equipmentCategory.create({
        data: {
          name: categories.name,
          type: categories.type,
          photo: photo ?? [],
          quantity: 0,
        },
      });

      finalCategoryId = newCategory.id;
    }

    if (finalCategoryId !== equipment.categoryId) {
      await prisma.equipment.update({
        where: { id },
        data: {
          category: { connect: { id: finalCategoryId } },
        },
      });

      await prisma.equipmentCategory.update({
        where: { id: equipment.categoryId },
        data: {
          quantity: { decrement: 1 },
        },
      });

      await prisma.equipmentCategory.update({
        where: { id: finalCategoryId },
        data: {
          quantity: { increment: 1 },
        },
      });
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
      },
    });

    res
      .status(200)
      .json({ message: "Équipement mis à jour", equipment: updatedEquipment });
  } catch (error) {
    console.error("Erreur lors de la modification de l'équipement:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const addCategory = async (req: AuthRequest, res: Response) => {
  try {
    const requiredFields = ["name", "type"];
    if (!validateRequestBody(req.body, requiredFields)) {
      res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }
    const existingCategory = await prisma.equipmentCategory.findFirst({
      where: {
        name: {
          contains: req.body.name,
          mode: "insensitive",
        },
      },
    });

    if (existingCategory) {
      res
        .status(400)
        .json({ message: "Une catégorie avec un nom similaire existe déjà" });
    }

    const category = await prisma.equipmentCategory.create({
      data: {
        name: req.body.name,
        type: req.body.type,
        photo: req.body.photo ?? [],
        quantity: 0,
      },
    });
    if (!category) {
      res.status(404).json({ message: "Echec de la création de la catégorie" });
    }
    res.status(200).json({ message: "Catégorie ajoutée avec succès" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const editCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: "L'id est obligatoire" });
    const category = await prisma.equipmentCategory.findUnique({
      where: { id: req.params.id },
    });
    const { name, type, description, photo } = req.body;
    if (!category) res.status(404).json({ message: "Categorie introuvable" });
    await prisma.equipmentCategory.update({
      where: { id: req.params.id },
      data: {
        name,
        type,
        description,
        photo,
      },
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
    if (!id) res.status(400).json({ message: "L'id est obligatoire" });
    const category = await prisma.equipmentCategory.findUnique({
      where: { id: req.params.id },
    });
    if (!category) res.status(404).json({ message: "Categorie introuvable" });
    await prisma.equipmentCategory.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Catégorie supprimée avec succès" });
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
    } = body;

    const requiredFields = ["name", "categoryId", "specifications"];
    if (!validateRequestBody(body, requiredFields)) {
      res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    if (categoryId === "autre") {
      if (!categories) {
        res.status(400).json({
          message:
            "Vous devez enregistrer la catégorie si vous choisissez 'autre'.",
        });
      }

      const requiredCategoryFields = ["name", "type"];
      if (!validateRequestBody(categories, requiredCategoryFields)) {
        res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
      }

      const [existingEquipment, existingCategory] = await Promise.all([
        prisma.equipment.findFirst({
          where: {
            name: { contains: name, mode: "insensitive" },
          },
        }),
        prisma.equipmentCategory.findFirst({
          where: {
            name: { contains: categories.name, mode: "insensitive" },
          },
        }),
      ]);

      if (existingEquipment) {
        res
          .status(400)
          .json({ message: "Un appareil avec un nom similaire existe déjà" });
      }
      if (existingCategory) {
        res
          .status(400)
          .json({ message: "Une catégorie avec un nom similaire existe déjà" });
      }

      const category = await prisma.equipmentCategory.create({
        data: {
          name: categories.name,
          type: categories.type,
          photo: photo ?? [],
          equipments: {
            create: {
              name,
              photo: photo ?? [],
              specifications,
              acquisitionDate,
            },
          },
          quantity: 0,
        },
      });

      if (!category) {
        res.status(404).json({
          message: "Echec de la création de la catégorie et de l'equipement",
        });
      }

      res.status(200).json({ message: "Appareil ajouté avec succès" });
    }

    const equipment = await prisma.equipment.create({
      data: {
        name,
        category: { connect: { id: categoryId } },
        photo: photo ?? [],
        specifications,
        acquisitionDate,
      },
    });

    if (!equipment) {
      res.status(404).json({ message: "Echec de la création de l'equipement" });
    }

    res.status(200).json({ message: "Appareil ajouté avec succès" });
  } catch (error) {
    console.error("Error in addEquipment:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const deleteEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: "L'id est obligatoire" });
    const equipment = await prisma.equipment.findUnique({
      where: { id: req.params.id },
    });
    if (!equipment) res.status(404).json({ message: "Appareil introuvable" });
    await prisma.equipment.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Appareil supprimé avec succès" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
