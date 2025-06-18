import { Request, Response } from "express";
import prisma from "../utils/db";
import logger from "../logger";
import { Grade, Prisma, Role, UserStatus } from "../../generated/prisma";
import { userFields } from "../constants/userFields";
import { getUserByID } from "../services/auth.service";
import { AuthRequest } from "../types/auth";
import { ERROR_MESSAGES } from "../utils/authUtils";

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
  try {
    const users = await prisma.user.findMany({
      select: userFields,
      orderBy: {
        createdAt: "desc",
      },
    });

    const usersFront = users.map((user) => ({
      id: user.id,
      role: user.role,
      email: user.email,
      status: user.status,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      createdAt: user.createdAt,
      cin: user.cin,
      ...user.masterStudent,
      ...user.teacherResearcher,
      ...user.doctoralStudent,
    }));

    logger.info(
      { context: "GET_USERS", count: users.length },
      "Liste des utilisateurs récupérée"
    );
    res.status(200).json(usersFront);
    return;
  } catch (error) {
    logger.error(
      { context: "GET_USERS", error },
      "Erreur lors de la récupération des utilisateurs"
    );
    res.status(500).json({ message: "Erreur serveur" });
    return;
  }
};

// Cette fonction permet de récupérer un utilisateur par son ID
// et de vérifier les permissions de l'utilisateur qui fait la requête
export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const requester = req.user;
    const user = await getUserByID(req.params.id, requester?.role);

    if (!user) {
      logger.warn(
        { context: "GET_USER", userId: req.params.id },
        "Utilisateur introuvable"
      );
      res.status(404).json({ message: "Utilisateur introuvable." });
      return;
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
      logger.warn(
        {
          context: "GET_USER",
          requesterId: requester.id,
          targetUserId: user.id,
        },
        "Tentative d'accès non autorisé"
      );
      res.status(403).json({
        message:
          "Vous ne pouvez pas accéder aux informations de cet utilisateur",
      });
      return;
    }

    res.status(200).json(user);
    return;
  } catch (error) {
    logger.error(
      { context: "GET_USER", error },
      "Erreur lors de la récupération d'un utilisateur"
    );
    res.status(500).json({ message: "Erreur serveur" });
    return;
  }
};

// Cette fonction permet de supprimer un utilisateur par son ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.id },
    });

    if (!user) {
      logger.warn(
        { context: "DELETE_USER", userId: req.params.id },
        "Utilisateur introuvable"
      );
      res.status(404).json({ message: "Utilisateur non rencontré" });
      return;
    }

    logger.info(
      { context: "DELETE_USER", userId: user.id },
      "Utilisateur supprimé"
    );
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    return;
  } catch (error) {
    logger.error(
      {
        context: "DELETE_USER",
        error,
        userId: req.params.id,
      },
      "Erreur lors de la suppression d'un utilisateur"
    );
    res.status(500).json({ message: "Erreur serveur" });
    return;
  }
};

// Cette fonction permet de récupérer les étudiants encadrés par an encadrant
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
      logger.debug(
        { context: "GET_STUDENTS", supervisorId: id },
        "Aucun étudiant trouvé"
      );
      res.status(200).json([]);
      return;
    }

    const data = users.map((user) => ({
      userId: user.id,
      role: user.role,
      email: user.email,
      status: user.status,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      createdAt: user.createdAt,
      cin: user.cin,
      ...user.masterStudent,
      ...user.teacherResearcher,
      ...user.doctoralStudent,
    }));

    res.status(200).json(data);
    return;
  } catch (error) {
    logger.error(
      {
        context: "GET_STUDENTS",
        error,
        params: req.params,
      },
      "Erreur lors de la récupération des étudiants"
    );
    res.status(500).json({
      message: "Erreur serveur",
      error: error instanceof Error ? error.message : "Erreur inconnue",
    });
    return;
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
      data: { lastName, firstName, cin, phone },
    });

    res.status(200).json({
      message: "Utilisateur mis à jour avec succès",
      user: updatedUser,
    });
    return;
  } catch (error) {
    logger.error(
      {
        context: "UPDATE_USER",
        error,
        userId,
      },
      "Erreur lors de la mise à jour de l'utilisateur"
    );
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    });
    return;
  }
};

// Cette fonction permet de désactiver un utilisateur par son ID
export const desactivateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(400)
      .json({ message: "L'identifiant de l'utilisateur est requis" });
    return;
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { id },
          { teacherResearcher: { id } },
          { doctoralStudent: { id } },
          { masterStudent: { id } },
        ],
      },
      select: { id: true, status: true },
    });
    console.log(existingUser);
    if (!existingUser) {
      logger.warn(
        { context: "DESACTIVATE_USER", userId: id },
        "Utilisateur introuvable"
      );
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    if (existingUser.status === UserStatus.DESACTIVE) {
      res.status(400).json({ message: "L'utilisateur est déjà désactivé" });
      return;
    }

    const user = await prisma.user.update({
      where: { id: existingUser.id },
      data: { status: UserStatus.DESACTIVE },
    });

    logger.info(
      {
        context: "DESACTIVATE_USER",
        userId: user.id,
      },
      "Utilisateur désactivé"
    );
    res.status(200).json({
      message: "Utilisateur désactivé avec succès",
      user: {
        id: user.id,
        email: user.email,
        status: user.status,
      },
    });
    return;
  } catch (error) {
    logger.error(
      {
        context: "DESACTIVATE_USER",
        error,
        userId: id,
      },
      "Erreur lors de la désactivation"
    );

    console.log(error);
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    });
  }
};

export const reactivateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(400)
      .json({ message: "L'identifiant de l'utilisateur est requis" });
    return;
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { id },
          { teacherResearcher: { id } },
          { doctoralStudent: { id } },
          { masterStudent: { id } },
        ],
      },
      select: { id: true, status: true },
    });
    console.log(existingUser);
    if (!existingUser) {
      logger.warn(
        { context: "REACTIVATE_USER", userId: id },
        "Utilisateur introuvable"
      );
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    if (existingUser.status === UserStatus.ACTIVE) {
      res.status(400).json({ message: "L'utilisateur est déjà activé" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: { status: UserStatus.ACTIVE },
    });

    logger.info(
      {
        context: "REACTIVATE_USER",
        userId: updatedUser.id,
      },
      "Utilisateur reactivé"
    );
    res.status(200).json({
      message: "Utilisateur reactivé avec succès",
    });
    return;
  } catch (error) {
    logger.error(
      {
        context: "REACTIVATE_USER",
        error,
        userId: id,
      },
      "Erreur lors de la reactivation"
    );
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    });
  }
};
