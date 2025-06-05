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



// Fonction pour compléter une demande après son approbation
export const completeRequest = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const request = await getRequestById(id);
    if (!request) {
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }
    if (request?.status !== RequestStatus.APPROVED) {
      res.status(400).json({ message: "La demande doit être complétée" });
    }
    if (request?.user.id !== req.user.userId) {
      res.status(403).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
    }
    const updatedRequest = await prisma.request.update({
      where: { id: request!.id },
      data: { status: RequestStatus.COMPLETED },
    });

    const director = await getDirector();
    await NotificationsService.createNotification({
      userId: director!.id,
      ...NotificationTemplates.REQUEST_COMPLETED(request!.id),
    });
    res.status(200).json({
      message: "Demande complétée avec succès",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Erreur dans closeRequest:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Fonction pour clôturer une demande&
export const closeRequest = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const request = await getRequestById(id);

    if (!request) {
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }

    if (request?.status !== RequestStatus.APPROVED) {
      res.status(400).json({ message: "La demande doit être complétée" });
    }

    const updatedRequest = await prisma.request.update({
      where: { id: request!.id },
      data: { status: RequestStatus.CLOSED },
    });

    // Récupérer les informations de l'utilisateur
    let user = await getUserByID(request!.user.id);

    // Envoyer l'email de confirmation
    await sendMailAfterRequestClose(updatedRequest, {
      firstName: user!.firstName || "",
      lastName: user!.lastName || "",
      email: user!.email,
      role: user!.role,
    });

    await NotificationsService.createNotification({
      userId: req.user.userId,
      ...NotificationTemplates.REQUEST_CLOSED(request!.id),
    });
    res.status(200).json({
      message: "Demande clôturée avec succès",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error closing request:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};


//Fonction pour relancer une demande
export const reigniteRequest = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const request = await getRequestById(id);
    if (!request) {
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }
    if (req.user.role != Role.DIRECTEUR) {
      const director = await getDirector();
      await NotificationsService.createNotification({
        userId: director!.id,
        ...NotificationTemplates.REQUEST_REIGNITED_BY_USER(request!.id),
      });
    } else {
      await NotificationsService.createNotification({
        userId: req.user.userId,
        ...NotificationTemplates.REQUEST_REIGNITED_BY_DIRECTOR(request!.id),
      });
    }

    res.status(200).json({
      message: "Demande réactivée avec succès",
    });
  } catch (error) {
    console.error("Error reigniting request:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
