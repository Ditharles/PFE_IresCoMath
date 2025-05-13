import { Request, Response } from "express";
import prisma from "../utils/db";

import { Role } from "../utils/validateUtils";
import { Grade } from "../../generated/prisma";
import {
  masterStudentFields,
  teacherResearcherFields,
  doctoralStudentFields,
} from "../constants/userFields";
import { getUserByID } from "../services/auth.service";

interface UpdateUserRequest extends Request {
  body: {
    email?: string;
    password?: string;
    role?: Role;
    lastName?: string;
    firstName?: string;
    thesisYear?: number;
    thesisSupervisorId?: string;
    masterYear?: number;
    supervisorId?: string;
    position?: string;
    grade?: Grade;
    institution?: string;
  };
  params: {
    id: string;
  };
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      role: true,
      email: true,
      createdAt: true,
      masterStudent: { select: masterStudentFields },
      teacherResearcher: { select: teacherResearcherFields },
      doctoralStudent: { select: doctoralStudentFields },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const usersFront = users.map((user) => {
    return {
      id: user.id,
      role: user.role,
      email: user.email,
      createdAt: user.createdAt,
      ...user.masterStudent,
      ...user.teacherResearcher,
      ...user.doctoralStudent,
    };
  });
  res.status(200).json(usersFront);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await getUserByID(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }

  res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await prisma.user.delete({
    where: { id: req.params.id },
  });

  if (!user) {
    return res.status(404).json({ message: "Utilisateur non rencontré" });
  }

  res.status(200).json({ message: "Utilisateur supprimé avec succès" });
};

export const updateUser = async (req: UpdateUserRequest, res: Response) => {
  const { id } = req.params;
  const {
    role,
    lastName,
    firstName,
    thesisYear,
    thesisSupervisorId,
    masterYear,
    supervisorId,
    position,
    grade,
    institution,
  } = req.body;

  try {
    // Mettre à jour les informations de base de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        role: role as Role,
      },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mettre à jour les informations spécifiques en fonction du rôle
    switch (role) {
      case "DOCTORANT":
        await prisma.doctoralStudent.updateMany({
          where: { userId: id },
          data: {
            lastName,
            firstName,
            thesisYear,
            thesisSupervisorId,
          },
        });
        break;
      case "MASTER":
        await prisma.masterStudent.updateMany({
          where: { userId: id },
          data: {
            lastName,
            firstName,
            masterYear,
            supervisorId,
          },
        });
        break;
      case "ENSEIGNANT":
        await prisma.teacherResearcher.updateMany({
          where: { userId: id },
          data: {
            lastName,
            firstName,
            position,
            grade,
            institution,
          },
        });
        break;
      default:
        break;
    }

    res.status(200).json({
      message: "Utilisateur mis à jour avec succès",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};
