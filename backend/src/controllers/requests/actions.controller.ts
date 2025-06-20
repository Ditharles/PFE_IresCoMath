import { RequestStatus, Role } from "../../../generated/prisma";
import { NotificationTemplates } from "../../constants/notificationsMessage";
import { getDirector, getUserByID } from "../../services/auth.service";
import { sendMailAfterRequestClose } from "../../services/mail.service";
import NotificationsService from "../../services/Notifications.service";
import { getRequestById } from "../../services/requests.service";
import { AuthRequest } from "../../types/auth";
import { ERROR_MESSAGES } from "../../utils/authUtils";
import prisma from "../../utils/db";
import { Response } from "express";
import logger from "../../logger";

// Fonction pour compléter une demande après son approbation
export const completeRequest = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const request = await getRequestById(id);
    if (!request) {
      logger.warn(
        { context: "COMPLETE_REQUEST", requestId: id },
        "Demande non trouvée"
      );
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
      return;
    }
    if (request?.status !== RequestStatus.APPROVED) {
      logger.warn(
        { context: "COMPLETE_REQUEST", requestId: id, status: request?.status },
        "Tentative de complétion d'une demande non approuvée"
      );
      res.status(400).json({ message: "La demande doit être complétée" });
      return;
    }
    if (request?.user.id !== req.user.userId) {
      logger.warn(
        { context: "COMPLETE_REQUEST", requestId: id, userId: req.user.userId },
        "Tentative non autorisée de complétion de demande"
      );
      res.status(403).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
      return;
    }

    const updatedRequest = await prisma.request.update({
      where: { id: request.id },
      data: { status: RequestStatus.COMPLETED },
    });

    const director = await getDirector();
    await NotificationsService.createNotification({
      userId: director!.id,
      ...NotificationTemplates.REQUEST_COMPLETED(request.id),
    });

    logger.info(
      { context: "COMPLETE_REQUEST", requestId: id, userId: req.user.userId },
      "Demande complétée avec succès"
    );
    res.status(200).json({
      message: "Demande complétée avec succès",
      data: updatedRequest,
    });
  } catch (error) {
    logger.error(
      { context: "COMPLETE_REQUEST", error },
      "Erreur lors de la complétion de la demande"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Fonction pour clôturer une demande
export const closeRequest = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const request = await getRequestById(id);

    if (!request) {
      logger.warn(
        { context: "CLOSE_REQUEST", requestId: id },
        "Demande non trouvée"
      );
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
      return;
    }

    if (request?.status !== RequestStatus.COMPLETED) {
      logger.warn(
        { context: "CLOSE_REQUEST", requestId: id, status: request?.status },
        "Tentative de clôture d'une demande non complétée"
      );
      res.status(400).json({ message: "La demande doit être complétée" });
      return;
    }

    const updatedRequest = await prisma.request.update({
      where: { id: request.id },
      data: { status: RequestStatus.CLOSED },
    });

    const user = await getUserByID(request.user.id);
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    await sendMailAfterRequestClose(updatedRequest, {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      role: user?.role,
    });

    await NotificationsService.createNotification({
      userId: req.user.userId,
      ...NotificationTemplates.REQUEST_CLOSED(request.id),
    });

    logger.info(
      { context: "CLOSE_REQUEST", requestId: id, userId: req.user.userId },
      "Demande clôturée avec succès"
    );
    res.status(200).json({
      message: "Demande clôturée avec succès",
      data: updatedRequest,
    });
  } catch (error) {
    logger.error(
      { context: "CLOSE_REQUEST", error },
      "Erreur lors de la clôture de la demande"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Fonction pour relancer une demande
export const reigniteRequest = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const request = await getRequestById(id);
    if (!request) {
      logger.warn(
        { context: "REIGNITE_REQUEST", requestId: id },
        "Demande non trouvée"
      );
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
      return;
    }

    if (req.user.role != Role.DIRECTEUR) {
      const director = await getDirector();
      await NotificationsService.createNotification({
        userId: director!.id,
        ...NotificationTemplates.REQUEST_REIGNITED_BY_USER(request.id),
      });
      logger.info(
        { context: "REIGNITE_REQUEST", requestId: id, userId: req.user.userId },
        "Demande réactivée par un utilisateur"
      );
    } else {
      await NotificationsService.createNotification({
        userId: req.user.userId,
        ...NotificationTemplates.REQUEST_REIGNITED_BY_DIRECTOR(request.id),
      });
      logger.info(
        { context: "REIGNITE_REQUEST", requestId: id, userId: req.user.userId },
        "Demande réactivée par le directeur"
      );
    }

    res.status(200).json({
      message: "Demande réactivée avec succès",
    });
  } catch (error) {
    logger.error(
      { context: "REIGNITE_REQUEST", error },
      "Erreur lors de la réactivation de la demande"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
