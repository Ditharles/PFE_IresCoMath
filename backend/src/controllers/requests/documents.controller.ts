import { RequestType, RequestStatus } from "../../../generated/prisma";
import { NotificationTemplates } from "../../constants/notificationsMessage";
import NotificationsService from "../../services/Notifications.service";
import { getRequestById } from "../../services/requests.service";
import { AuthRequest } from "../../types/auth";
import { validateRequestBody, ERROR_MESSAGES } from "../../utils/authUtils";
import prisma from "../../utils/db";
import { Response } from "express";
// Fonction pour ajouter des documents à une demande réservé au soumetteur de la demande
export const addDocuments = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const requiredFields = ["documents"];
    if (!validateRequestBody(req.body, requiredFields)) {
      res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    const request = await getRequestById(id);

    if (
      !request &&
      !(
        request!.type in
        [
          RequestType.CONFERENCE_NATIONAL,
          RequestType.REPAIR_MAINTENANCE,
          RequestType.MISSION,
        ]
      )
    ) {
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }

    if (request?.status !== RequestStatus.APPROVED) {
      res.status(400).json({ message: "La demande doit être approuvée" });
    }

    if (!request?.mission) {
      res
        .status(400)
        .json({ message: "Données mission manquantes pour cette demande" });
    }

    const doc = [...(request!.mission!.document || []), ...req.body.documents];

    const updatedRequest = await prisma.mission.update({
      where: { id: request!.mission!.id },
      data: { document: doc },
    });
    await NotificationsService.createNotification({
      userId: request!.user.id,
      ...NotificationTemplates.DOCUMENTS_ADDED(request!.id),
    });
    res.status(200).json({
      message: "Les documents ont été ajoutés avec succès",
    });
  } catch (error) {
    console.error("Erreur dans addDocuments:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Fonction pour permettre au directeur d'envoyer le formulaire signé d'une demande

export const signFormUpload = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const request = await getRequestById(id);

    const requiredFields = ["file"];
    if (!validateRequestBody(req.body, requiredFields)) {
      res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }
    if (!request) {
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }

    if (request?.status !== RequestStatus.APPROVED) {
      res.status(400).json({ message: "La demande doit être approuvée" });
    }

    await prisma.request.update({
      where: { id: request!.id },
      data: {
        signForm: req.body.file,
      },
    });

    res.status(200).json({ message: "Formulaire signé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la signature du formulaire:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
