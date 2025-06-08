import { Request, Response } from "express";
import { PrismaClient, RequestStatus } from "../../generated/prisma";
import {
  buildFilters,
  nextStatusMap,
  Role,
  RequestRole,
  requestRoleMap,
  fields,
} from "../utils/validateUtils";
import { fetchDataByRole } from "../services/validate.service";
import logger from "../logger";
import { sendMailAfterValidation } from "../services/mail.service";
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
      return res.status(400).json({ message: "Demande de rôle invalide" });
    }

    const data = await fetchDataByRole(
      req.user.userId,
      req.user.role as Role,
      roleRequest as RequestRole | undefined,
      filters
    );

    if (!data || Object.keys(data).length === 0) {
      logger.warn(
        { context: "GET_WAITING_LIST", userId: req.user.userId },
        "Aucune donnée trouvée pour les filtres appliqués"
      );
      res.status(400).json({ message: "Erreur : Aucune donnée trouvée" });
      return;
    }

    logger.info(
      { context: "GET_WAITING_LIST", count: Object.keys(data).length },
      "Liste des requêtes en attente récupérée"
    );
    res.status(200).json(data);
    return;
  } catch (error) {
    logger.error(
      { context: "GET_WAITING_LIST", error, userId: req.user?.userId },
      "Erreur lors de la récupération des requêtes en attente"
    );
    res.status(500).json({ message: "Erreur interne du serveur" });
    return;
  }
};

// Fournit les informations d'un utilisateur à partir de son id et de son rôle
export const getRequestInfo = async (req: Request, res: Response) => {
  try {
    const { user_id, user_role } = req.query;

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
      logger.warn(
        { context: "GET_REQUEST_INFO", userId: user_id, role: user_role },
        "Requête non trouvée"
      );
      res.status(404).json({ message: "Requête non trouvée" });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    logger.error(
      { context: "GET_REQUEST_INFO", error, queryParams: req.query },
      "Erreur lors de la récupération des informations de requête"
    );
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
      logger.warn(
        { context: "VALIDATE_REQUEST", requestId: request_id },
        "Requête non trouvée"
      );
      res.status(404).json({ message: "Requête non trouvée" });
      return;
    }

    if (!request.isConfirmed) {
      logger.warn(
        { context: "VALIDATE_REQUEST", requestId: request_id },
        "Tentative de validation d'un utilisateur non confirmé"
      );
      res.status(400).json({ message: "Utilisateur non confirmé" });
      return;
    }

    if (user.role === "ENSEIGNANT") {
      if (typedRequestRole === "MASTER" && request.supervisorId !== user.id) {
        logger.warn(
          {
            context: "VALIDATE_REQUEST",
            requestId: request_id,
            userId: user.id,
          },
          "Tentative non autorisée de validation d'un master"
        );
        res.status(403).json({
          message: "Vous n'êtes pas autorisé à valider cette requête de master",
        });
        return;
      }
      if (
        typedRequestRole === "DOCTORANT" &&
        request.thesisSupervisorId !== user.id
      ) {
        logger.warn(
          {
            context: "VALIDATE_REQUEST",
            requestId: request_id,
            userId: user.id,
          },
          "Tentative non autorisée de validation d'un doctorant"
        );
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
      logger.info(
        {
          context: "VALIDATE_REQUEST",
          requestId: request_id,
          newStatus,
          validatedBy: user.id,
        },
        "Requête validée avec succès"
      );
      res.status(200).json({ message: "Requête mise à jour avec succès" });
    } else {
      logger.warn(
        {
          context: "VALIDATE_REQUEST",
          requestId: request_id,
          currentStatus,
        },
        "Statut de requête invalide ou déjà approuvé"
      );
      res
        .status(400)
        .json({ message: "Statut de requête invalide ou déjà approuvé" });
    }
  } catch (error) {
    logger.error(
      { context: "VALIDATE_REQUEST", error, body: req.body },
      "Erreur lors de la validation de la requête"
    );
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
      logger.warn(
        { context: "RESEND_VALIDATION_MAIL", email },
        "Requête non trouvée pour le renvoi d'email"
      );
      res.status(404).json({ message: "Requête non trouvée" });
      return;
    }

    await sendMailAfterValidation(
      request,
      typedRequestRole,
      request.status,
      req.user as { id: string; role: Role }
    );
    logger.info(
      { context: "RESEND_VALIDATION_MAIL", email, sentBy: req.user?.id },
      "Email de validation renvoyé"
    );
    res
      .status(200)
      .json({ message: "Email de validation renvoyé avec succès" });
  } catch (error) {
    logger.error(
      { context: "RESEND_VALIDATION_MAIL", error, email },
      "Erreur lors du renvoi de l'email de validation"
    );
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
