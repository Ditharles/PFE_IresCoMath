import { Response } from "express";
import { AuthRequest } from "../types/auth";
import prisma from "../utils/db";
import { ERROR_MESSAGES } from "../utils/authUtils";

export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const equipmentCategories = await prisma.equipmentCategory.findMany();
    res.status(200).json({equipmentCategories});
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
    });
    if (!category) res.status(404).json({ message: "Categorie introuvable" });
    res.status(200).json({category});
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getAllEquipments = async (req: AuthRequest, res: Response) => {
  try {
    const equipments = await prisma.equipment.findMany();
    res.status(200).json({equipments});
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getEquipment = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) res.status(400).json({ message: "L'id est obligatoire" });
        const equipment = await prisma.equipment.findUnique({
            where: { id: req.params.id },
        })
        res.status(200).json({equipment});
    } catch (error) {
        
    }
};
