import { Request, Response } from "express";
import { PrismaClient, RequestStatus } from "../../generated/prisma";
import {
  buildFilters,
  fetchDataByRole,
  sendMailAfterValidation,
  nextStatusMap,
  Role,
  RequestRole,
  requestRoleMap,
  fields,
} from "../utils/validateUtils";

const prisma = new PrismaClient();

// Liste des requêtes en attente de validation
export const getWaitingList = async (req: Request, res: Response) => {
  try {
    const filters = buildFilters(req.query);
    const { roleRequest } = req.query;

    if (
      roleRequest &&
      !["ENSEIGNANT", "MASTER", "DOCTORANT"].includes(roleRequest as string)
    ) {
      res.status(400).json({ message: "Demande de rôle invalide" });
      return;
    }

    const data = await fetchDataByRole(
      req.user.id,
      req.user.role as Role,
      roleRequest as RequestRole | undefined,
      filters
    );
    if (!data) {
      res.status(400).json({ message: "Erreur : Aucune donnée trouvée" });
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Erreur rencontrée :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Fournit les informations d'un utilisateur à partir de son id et de son rôle
export const getRequestInfo = async (req: Request, res: Response) => {
  try {
    const { user_id, user_role } = req.query;
    console.log(req.query);
    if (typeof user_id !== "string" || typeof user_role !== "string") {
      res.status(400).json({ message: "Paramètres de requête invalides" });
      return;
    }

    const typedUserRole = user_role as RequestRole;
    const model = requestRoleMap[typedUserRole];
    if (!model) {
      res.status(400).json({ message: "Modèle de rôle non trouvé" });
      return;
    }

    const data = await (model as any).findUnique({
      where: { id: user_id },
      select: fields[typedUserRole],
    });
   
    if (!data) {
      res.status(404).json({ message: "Requête non trouvée" });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Pour la validation des requêtes
export const validateRequest = async (req: Request, res: Response) => {
  try {
    const { request_id, request_role, validate, rejected_reason } = req.body;
    const user = req.user as { id: string; role: Role };

    if (!request_id || !request_role || validate === undefined) {
      res.status(400).json({ message: "Paramètres de requête manquants" });
      return;
    }

    if (!validate && !rejected_reason) {
      res.status(400).json({ message: "Mentionnez le motif de rejet" });
      return;
    }

    const typedRequestRole = request_role as RequestRole;
    const model = requestRoleMap[typedRequestRole];
    const request = await (model as any).findUnique({
      where: { id: request_id },
    });

    if (!request) {
      res.status(404).json({ message: "Requête non trouvée" });
      return;
    }

    if (user.role === "ENSEIGNANT") {
      if (typedRequestRole === "MASTER" && request.encadrant_id !== user.id) {
        res.status(403).json({
          message: "Vous n'êtes pas autorisé à valider cette requête de master",
        });
        return;
      }
      if (
        typedRequestRole === "DOCTORANT" &&
        request.directeur_these_id !== user.id
      ) {
        res.status(403).json({
          message:
            "Vous n'êtes pas autorisé à valider cette requête de doctorant",
        });
        return;
      }
    }

    const updateStatus = async (status: RequestStatus) => {
      const model = requestRoleMap[typedRequestRole];
      if (model) {
        await (model as any).update({
          where: { id: request_id },
          data: { status },
        });
      } else {
        throw new Error("Modèle de rôle non trouvé");
      }
    };

    const currentStatus = request.status as RequestStatus;
    const newStatus = nextStatusMap[currentStatus]?.[validate.toString()];

    if (newStatus) {
      await updateStatus(newStatus);
      await sendMailAfterValidation(request, typedRequestRole, newStatus, user);
      res.status(200).json({ message: "Requête mise à jour avec succès" });
    } else {
      res
        .status(400)
        .json({ message: "Statut de requête invalide ou déjà approuvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la validation de la requête :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Renvoie le mail de validation
export const resendValidationMail = async (req: Request, res: Response) => {
  const { email, request_role } = req.body;

  try {
    const typedRequestRole = request_role as RequestRole;
    const model = requestRoleMap[typedRequestRole];
    const request = await (model as any).findUnique({
      where: { email },
    });

    if (!request) {
      res.status(404).json({ message: "Requête non trouvée" });
      return;
    }

    await sendMailAfterValidation(
      request,
      typedRequestRole,
      request.status,
      req.user as { id: string; role: Role }
    );
    res
      .status(200)
      .json({ message: "Email de validation renvoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors du renvoi de l'email de validation :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
