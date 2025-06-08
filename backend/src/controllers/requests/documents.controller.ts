import { RequestType, RequestStatus } from "../../../generated/prisma";
import { NotificationTemplates } from "../../constants/notificationsMessage";
import NotificationsService from "../../services/Notifications.service";
import { getRequestById } from "../../services/requests.service";
import { AuthRequest } from "../../types/auth";
import { validateRequestBody, ERROR_MESSAGES } from "../../utils/authUtils";
import prisma from "../../utils/db";
import { Response } from "express";
import logger from "../../logger";

// Fonction pour ajouter des documents à une demande réservé au soumetteur de la demande
export const addDocuments = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    logger.debug(
      { context: "ADD_DOCUMENTS", requestId: id, body: req.body },
      "Tentative d'ajout de documents"
    );

    const requiredFields = ["documents"];
    if (!validateRequestBody(req.body, requiredFields)) {
       res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    const request = await getRequestById(id);

    if (!request) {
      logger.warn(
        { context: "ADD_DOCUMENTS", requestId: id },
        "Demande non trouvée"
      );
       res
        .status(404)
        .json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }

    if (
      !["CONFERENCE_NATIONAL", "REPAIR_MAINTENANCE", "MISSION"].includes(
        request!.type
      )
    ) {
      logger.warn(
        { context: "ADD_DOCUMENTS", requestId: id, type: request!.type },
        "Type de demande non autorisé pour l'ajout de documents"
      );
       res.status(400).json({ message: "Type de demande non supporté" });
    }

    if (request!.status !== RequestStatus.APPROVED) {
      logger.warn(
        { context: "ADD_DOCUMENTS", requestId: id, status: request!.status },
        "Tentative d'ajout de documents sur demande non approuvée"
      );
       res
        .status(400)
        .json({ message: "La demande doit être approuvée" });
    }

    if (!request!.mission) {
      logger.warn(
        { context: "ADD_DOCUMENTS", requestId: id },
        "Données mission manquantes"
      );
       res
        .status(400)
        .json({ message: "Données mission manquantes pour cette demande" });
    }

    const doc = [...(request!.mission!.document || []), ...req.body.documents];

    await prisma.mission.update({
      where: { id: request!.mission!.id },
      data: { document: doc },
    });

    await NotificationsService.createNotification({
      userId: request!.user.id,
      ...NotificationTemplates.DOCUMENTS_ADDED(request!.id),
    });

    logger.info(
      { context: "ADD_DOCUMENTS", requestId: id, userId: req.user?.userId },
      "Documents ajoutés avec succès"
    );
     res.status(200).json({
      message: "Les documents ont été ajoutés avec succès",
    });
  } catch (error) {
    logger.error(
      { context: "ADD_DOCUMENTS", error },
      "Erreur lors de l'ajout de documents"
    );
     res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Fonction pour permettre au directeur d'envoyer le formulaire signé d'une demande
export const signFormUpload = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    logger.debug(
      { context: "SIGN_FORM_UPLOAD", requestId: id },
      "Tentative d'upload de formulaire signé"
    );

    const request = await getRequestById(id);

    const requiredFields = ["file"];
    if (!validateRequestBody(req.body, requiredFields)) {
      logger.warn(
        { context: "SIGN_FORM_UPLOAD", requestId: id },
        "Fichier manquant pour la signature"
      );
       res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    if (!request) {
      logger.warn(
        { context: "SIGN_FORM_UPLOAD", requestId: id },
        "Demande non trouvée"
      );
       res
        .status(404)
        .json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }

    if (request!.status !== RequestStatus.APPROVED) {
      logger.warn(
        { context: "SIGN_FORM_UPLOAD", requestId: id, status: request!.status },
        "Tentative de signature sur demande non approuvée"
      );
       res
        .status(400)
        .json({ message: "La demande doit être approuvée" });
    }

    await prisma.request!.update({
      where: { id: request!.id },
      data: { signForm: req.body.file },
    });

    logger.info(
      { context: "SIGN_FORM_UPLOAD", requestId: id, userId: req.user?.userId },
      "Formulaire signé avec succès"
    );
     res.status(200).json({ message: "Formulaire signé avec succès" });
  } catch (error) {
    logger.error(
      { context: "SIGN_FORM_UPLOAD", error },
      "Erreur lors de la signature du formulaire"
    );
     res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
