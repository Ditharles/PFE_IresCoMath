import {
  EquipmentCategory,
  EquipmentStatus,
  EquipmentType,
} from "../../generated/prisma";
import prisma from "./db";
import { validateRequestBody } from "./authUtils";
import logger from "../logger"; // Correction de l'import du logger

export const createCategory = async (
  name: string,
  type: EquipmentType,
  photo?: string[]
) => {
  const existingCategory = await prisma.equipmentCategory.findFirst({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
  });

  if (existingCategory) {
    return {
      status: 400,
      message: "Une catégorie avec un nom similaire existe déjà",
    };
  }

  const category = await prisma.equipmentCategory.create({
    data: {
      name: name,
      type: type,
      photo: photo ?? [],
      quantity: 0,
    },
  });

  if (!category) {
    return {
      status: 400,
      message: "Une erreur est survenue lors de l'ajout de la catégorie",
    };
  }

  return {
    status: 200,
    message: "La catégorie a été ajoutée avec succès",
    category: category,
  };
};
export const switchCategory = async (
  categoryId: string,
  categories?: EquipmentCategory,
  operation?: "add" | "removeCat" | "edit",
  equipmentName?: string,
  equipmentPhoto?: string[],
  equipmentSpecifications?: object,
  equipmentAcquisitionDate?: Date,
  equipmentCost?: number,
  equipmentId?: string,
  equipmentStatus?: EquipmentStatus
) => {
  try {
    if (categoryId === "autre") {
      if (!categories) {
        return {
          status: 400,
          message:
            "Vous devez renseigner la catégorie si vous choisissez 'autre'.",
        };
      }

      const requiredCategoryFields = ["name", "type"];
      if (!validateRequestBody(categories, requiredCategoryFields)) {
        return {
          status: 400,
          message: "Les champs 'name' et 'type' sont requis pour la catégorie",
        };
      }

      const existingCategory = await prisma.equipmentCategory.findFirst({
        where: {
          name: { contains: categories.name, mode: "insensitive" },
        },
      });

      if (existingCategory) {
        return {
          status: 400,
          message: "Une catégorie avec un nom similaire existe déjà",
        };
      }

      // Opération d'ajout d'équipement
      if (operation === "add") {
        if (!equipmentName) {
          return {
            status: 400,
            message: "Le nom de l'équipement est requis",
          };
        }

        const existingEquipment = await prisma.equipment.findFirst({
          where: {
            name: { contains: equipmentName, mode: "insensitive" },
          },
        });

        if (existingEquipment) {
          return {
            status: 400,
            message: "Un équipement avec un nom similaire existe déjà",
          };
        }

        const category = await prisma.equipmentCategory.create({
          data: {
            name: categories.name,
            type: categories.type,
            photo: categories.photo ?? [],
            equipments: {
              create: [
                {
                  name: equipmentName,
                  photo: equipmentPhoto ?? [],
                  specifications: equipmentSpecifications ?? {},
                  acquisitionDate: equipmentAcquisitionDate ?? new Date(),
                  cost: Number(equipmentCost) ?? 0,
                  status: equipmentStatus ?? EquipmentStatus.AVAILABLE,
                },
              ],
            },
            quantity: 1,
          },
        });

        if (!category) {
          return {
            status: 400,
            message: "Une erreur est survenue lors de l'ajout de la catégorie",
          };
        }

        return {
          status: 200,
          message: "L'équipement a été ajouté avec succès",
          category: category,
        };
      }

      // Opération d'édition d'équipement
      if (operation === "edit") {
        if (!equipmentId) {
          return {
            status: 400,
            message: "L'ID de l'équipement est requis",
          };
        }

        const equipment = await prisma.equipment.findUnique({
          where: { id: equipmentId },
          select: { category: { select: { id: true } } },
        });

        if (!equipment?.category?.id) {
          return {
            status: 400,
            message: "L'ID l'équipement est incorrect",
          };
        }

        const newCategory = await prisma.equipmentCategory.create({
          data: {
            name: categories.name,
            type: categories.type,
            photo: categories.photo ?? [],
            quantity: 1,
          },
        });

        await prisma.equipment.update({
          where: { id: equipmentId },
          data: {
            category: { connect: { id: newCategory.id } },
          },
        });

        await prisma.equipmentCategory.update({
          where: { id: equipment.category.id },
          data: {
            quantity: { decrement: 1 },
          },
        });

        await prisma.equipmentCategory.update({
          where: { id: newCategory.id },
          data: {
            quantity: { increment: 1 },
          },
        });

        return {
          status: 200,
          message: "L'équipement a été modifié avec succès",
          category: newCategory,
        };
      }
    }

    // Suppression d'une catégorie
    if (operation === "removeCat") {
      if (!categoryId) {
        return {
          status: 400,
          message: "L'ID de la catégorie est requis",
        };
      }

      const deleteCategory = await prisma.equipmentCategory.findFirst({
        where: { id: categoryId },
      });

      if (!deleteCategory) {
        return {
          status: 403,
          message: "Aucune catégorie trouvée",
        };
      }

      const isDeleted = await prisma.equipmentCategory.delete({
        where: { id: categoryId },
      });

      if (!isDeleted) {
        return {
          status: 400,
          message:
            "Une erreur est survenue lors de la suppression de la catégorie",
        };
      }

      return {
        status: 200,
        message: "La catégorie a été supprimée avec succès",
      };
    }

    // Modification de la catégorie existante
    if (operation === "edit" && equipmentId && categoryId !== "autre") {
      const equipment = await prisma.equipment.findUnique({
        where: { id: equipmentId },
        select: { category: { select: { id: true } } },
      });

      if (!equipment?.category?.id) {
        return {
          status: 400,
          message: "L'ID de la catégorie de l'équipement est incorrect",
        };
      }

      if (categoryId !== equipment.category.id) {
        await prisma.equipment.update({
          where: { id: equipmentId },
          data: {
            category: { connect: { id: categoryId } },
          },
        });

        await prisma.equipmentCategory.update({
          where: { id: equipment.category.id },
          data: {
            quantity: { decrement: 1 },
          },
        });

        await prisma.equipmentCategory.update({
          where: { id: categoryId },
          data: {
            quantity: { increment: 1 },
          },
        });

        return {
          status: 200,
          message: "La catégorie de l'équipement a été modifiée avec succès",
        };
      }

      return {
        status: 200,
        message: "Aucune modification nécessaire",
      };
    } else if (operation === "add") {
      const existingCategory = await prisma.equipmentCategory.findUnique({
        where: { id: categoryId },
      });

      if (!existingCategory) {
        return {
          status: 404,
          message: "Catégorie non trouvée",
        };
      }

      const isExistingEquipment = await prisma.equipment.findFirst({
        where: {
          name: {
            contains: equipmentName,
            mode: "insensitive",
          },
        },
      });

      if (isExistingEquipment) {
        return {
          status: 400,
          message: "Un équipement avec un nom similaire existe déjà",
        };
      }

      const equipment = await prisma.equipment.create({
        data: {
          name: equipmentName ?? "",
          category: { connect: { id: categoryId } },
          photo: equipmentPhoto ?? [],
          specifications: equipmentSpecifications ?? {},
          acquisitionDate: equipmentAcquisitionDate ?? new Date(),
          status: equipmentStatus ?? EquipmentStatus.AVAILABLE,
          cost: Number(equipmentCost) ?? 0,
        },
      });

      await prisma.equipmentCategory.update({
        where: { id: categoryId },
        data: {
          quantity: { increment: 1 },
        },
      });

      return {
        status: 200,
        message: "L'équipement a été ajouté avec succès",
        equipment: equipment,
      };
    }

    return {
      status: 400,
      message: "Opération non supportée ou paramètres manquants",
    };
  } catch (error) {
    logger.error(error, "Erreur dans switchCategory");
    return {
      status: 500,
      message: "Une erreur interne est survenue",
    };
  }
};
