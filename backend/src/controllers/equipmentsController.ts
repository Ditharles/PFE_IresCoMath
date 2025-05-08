import { Request, Response } from "express";

import prisma from "../utils/db";
import { EquipmentType } from "../../generated/prisma";

// Récupérer toutes les catégories de matériel
export const getCategories = async (req: Request, res: Response) => {
  try {
    const materiels = await prisma.equipmentCategory.findMany();
    res.status(200).json(materiels ?? []);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des catégories." });
  }
};

// Récupérer tous les matériels
export const getEquipments = async (req: Request, res: Response) => {
  try {
    const materiels = await prisma.equipment.findMany();
    res.status(200).json(materiels ?? []);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des matériels." });
  }
};

// Récupérer les catégories de matériel selon le type
export const getCategoriesByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    if (
      !type ||
      !Object.values(EquipmentType).includes(type as EquipmentType)
    ) {
      res.status(400).json({ error: "Type invalide ou manquant." });
    }

    const materiels = await prisma.equipmentCategory.findMany({
      where: { type: type as EquipmentType },
    });

    res.status(200).json(materiels);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération par type et catégorie." });
  }
};

// Récupérer les matériels selon le type
export const getEquipmentsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    if (
      !type ||
      !Object.values(EquipmentType).includes(type as EquipmentType)
    ) {
      res.status(400).json({ error: "Type invalide ou manquant." });
    }

    const materiels = await prisma.equipment.findMany({
      where: {
        category: {
          type: type as EquipmentType,
        },
      },
    });

    res.status(200).json(materiels);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération des matériels par type.",
    });
  }
};

export const getEquipmentsByCategory = async (req: Request, res: Response) => {
  try {
    
    const { category } = req.params;
    const materiels = await prisma.equipment.findMany({
      where: { category: { id: category } },
    });
    res.status(200).json(materiels);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération des matériels par catégorie.",
    });
  }
};
