import { Request, Response } from "express";
import prisma from "../utils/db";

import { Grade, Prisma, Role, UserStatus } from "../../generated/prisma";
import { userFields } from "../constants/userFields";
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

//Cette fonction permet de récupérer tous les utilisateurs
// et de les renvoyer au format attendu par le frontend
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

// Cette fonction permet de récupérer un utilisateur par son ID
// et de vérifier les permissions de l'utilisateur qui fait la requête
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

// Cette fonction permet de supprimer un utilisateur par son ID
export const deleteUser = async (req: Request, res: Response) => {
  const user = await prisma.user.delete({
    where: { id: req.params.id },
  });

  if (!user) {
    res.status(404).json({ message: "Utilisateur non rencontré" });
  }

  res.status(200).json({ message: "Utilisateur supprimé avec succès" });
};

// Cette fonction permet de récupérer les étudiants encadrés par un encadrant
export const getStudents = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("ID reçu:", id);

    if (!id) {
      res
        .status(400)
        .json({ message: "L'identifiant de l'encadrant est requis" });
      return;
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { doctoralStudent: { thesisSupervisorId: id } },
          { doctoralStudent: { thesisSupervisor: { user: { id: id } } } },
          { masterStudent: { supervisor: { user: { id: id } } } },
          { masterStudent: { supervisorId: id } },
        ],
      },
      select: userFields,
    });
    console.log("Users trouvés:", users);

    if (users.length === 0) {
      res.status(200).json([]);
      return;
    }

    const data = users.map((user) => ({
      userId: user.id,
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
    }));
    console.log("Data formatée:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des étudiants",
      error: error instanceof Error ? error.message : "Erreur inconnue",
    });
  }
};

// Cette fonction permet de mettre à jour un utilisateur par son ID
export const updateUser = async (req: AuthRequest, res: Response) => {
  const { userId } = req.user;
  const { lastName, firstName, cin, phone } = req.body;

  try {
    // Mettre à jour les informations de base de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        lastName,
        firstName,
        cin,
        phone,
      },
    });

    res.status(200).json({
      message: "Utilisateur mis à jour avec succès",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);

    res.status(500).json({
      message:
        "Erreur interne du serveur lors de la mise à jour de l'utilisateur",
    });
  }
};

// Cette fonction permet de désactiver un utilisateur par son ID
export const desactivateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "L'identifiant de l'utilisateur est requis" });
  }

  try {
    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si l'utilisateur n'est pas déjà désactivé
    if (existingUser.status === UserStatus.DESACTIVE) {
      return res
        .status(400)
        .json({ message: "L'utilisateur est déjà désactivé" });
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        status: UserStatus.DESACTIVE,
      },
    });

    res.status(200).json({
      message: "Utilisateur désactivé avec succès",
      user: {
        id: user.id,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la désactivation de l'utilisateur:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: "Erreur lors de la mise à jour de l'utilisateur",
        error: error.message,
      });
    }

    res.status(500).json({
      message:
        "Erreur interne du serveur lors de la désactivation de l'utilisateur",
    });
  }
};
