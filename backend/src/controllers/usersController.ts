import { Request, Response } from "express";
import prisma from "../utils/db";
import { enseignantFields, masterFields } from "../utils/authUtils";

import { Role } from "../utils/validateUtils";
import { Grade } from "../../generated/prisma";

interface UpdateUserRequest extends Request {
  body: {
    email?: string;
    password?: string;
    role?: Role;
    nom?: string;
    prenom?: string;
    annee_these?: number;
    directeur_these_id?: string;
    annee_master?: number;
    encadrant_id?: string;
    fonction?: string;
    grade?: Grade;
    etablissement?: string;
  };
  params: {
    id: string;
  };
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      admin: { select: { nom: true, prenom: true } },
      master: { select: masterFields },
      enseignant: { select: enseignantFields },
      doctorant: { select: enseignantFields },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const usersFront = users.map((user) => {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      ...user.admin,
      ...user.master,
      ...user.enseignant,
      ...user.doctorant,
    };
  });
  res.status(200).json(usersFront);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      admin: { select: { nom: true, prenom: true } },
      master: { select: masterFields },
      enseignant: { select: enseignantFields },
      doctorant: { select: enseignantFields },
    },
  });

  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  const userFront = {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    ...user.admin,
    ...user.master,
    ...user.enseignant,
    ...user.doctorant,
  };

  res.status(200).json(userFront);
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
    nom,
    prenom,
    annee_these,
    directeur_these_id,
    annee_master,
    encadrant_id,
    fonction,
    grade,
    etablissement,
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
        await prisma.doctorant.updateMany({
          where: { userId: id },
          data: { nom, prenom, annee_these, directeur_these_id },
        });
        break;
      case "MASTER":
        await prisma.master.updateMany({
          where: { userId: id },
          data: { nom, prenom, annee_master, encadrant_id },
        });
        break;
      case "ENSEIGNANT":
        await prisma.enseignantChercheur.updateMany({
          where: { userId: id },
          data: { nom, prenom, fonction, grade, etablissement },
        });
        break;
      // Ajoutez d'autres cas si nécessaire
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
