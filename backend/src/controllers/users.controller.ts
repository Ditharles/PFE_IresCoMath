import { Request, Response } from "express";
import prisma from "../utils/db";

import { Grade, Role } from "../../generated/prisma";
import {
  masterStudentFields,
  teacherResearcherFields,
  doctoralStudentFields,
  userFields,
} from "../constants/userFields";
import { getUserByID } from "../services/auth.service";
import { AuthRequest } from "../types/auth";

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
    select: userFields,
    orderBy: {
      createdAt: "desc",
    },
  });

  const usersFront = users.map((user) => {
    return {
      id: user.id,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      createdAt: user.createdAt,
      cin: user.cin,
      ...user.masterStudent,
      ...user.teacherResearcher,
      ...user.doctoralStudent,
    };
  });
  res.status(200).json(usersFront);
};

export const getUser = async (req: AuthRequest, res: Response) => {
  const requester = req.user;
  const user = await getUserByID(req.params.id, requester?.role);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }
  function isDoctorantOrMaster(role: Role): role is "DOCTORANT" | "MASTER" {
    return ["DOCTORANT", "MASTER"].includes(role);
  }

  if (
    requester.role === Role.ENSEIGNANT &&
    !isDoctorantOrMaster(user.role) &&
    user.supervisorId !== requester.id &&
    user.thesisSupervisorId !== requester.id
  ) {
    return res.status(403).json({
      message: "Vous ne pouvez pas accéder aux informations de cet utilisateur",
    });
  }

  if (
    [Role.DOCTORANT, Role.MASTER].includes(requester.role) &&
    (user.id != requester.supervisorId ||
      user.id != requester.thesisSupervisorId)
  ) {
    return res.status(403).json({
      message: "Vous ne pouvez pas accéder aux informations de cet utilisateur",
    });
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
        lastName,
        firstName,
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
            thesisYear,
            thesisSupervisorId,
          },
        });
        break;
      case "MASTER":
        await prisma.masterStudent.updateMany({
          where: { userId: id },
          data: {
            masterYear,
            supervisorId,
          },
        });
        break;
      case "ENSEIGNANT":
        await prisma.teacherResearcher.updateMany({
          where: { userId: id },
          data: {
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
