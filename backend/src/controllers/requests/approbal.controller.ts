import { RequestStatus, Role } from "../../../generated/prisma";
import { NotificationTemplates } from "../../constants/notificationsMessage";
import { sendMailAfterRequestsValidation } from "../../services/mail.service";
import NotificationsService from "../../services/Notifications.service";
import { AuthRequest } from "../../types/auth";
import { validateRequestBody, ERROR_MESSAGES } from "../../utils/authUtils";
import prisma from "../../utils/db";

import { Response } from "express";
// Fonction pour approuver ou rejeter une demande
export const approveRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { rejectReason, isApproved } = req.body;
    const { id } = req.params;

    // Validation du corps de la requête
    if (!validateRequestBody(req.body, ["isApproved"])) {
      res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    // Récupération de la demande
    const request = await prisma.request.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            masterStudent: true,
            doctoralStudent: true,
            teacherResearcher: true,
          },
        },
      },
    });

    if (!request) {
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }

    if (request!.status === RequestStatus.APPROVED) {
      res.status(400).json({ message: "La requete a déja été approuvé " });
    }
    // Vérification des autorisations
    const userRole = req.user.role as Role;
    const requestUser = request!.user;

    const isMasterOrDoctorant =
      requestUser.role === Role.MASTER || requestUser.role === Role.DOCTORANT;

    const isAuthorized =
      userRole === Role.DIRECTEUR ||
      (userRole === Role.ENSEIGNANT &&
        requestUser.masterStudent?.supervisorId === req.user.id);

    if (isMasterOrDoctorant && !isAuthorized) {
      res.status(403).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
    }

    // Détermination du prochain statut
    const nextStatusMap = {
      [Role.DIRECTEUR]: {
        [RequestStatus.PENDING]: isApproved
          ? RequestStatus.APPROVED
          : RequestStatus.REJECTED_BY_DIRECTOR,
        [RequestStatus.APPROVED_BY_SUPERVISOR]: isApproved
          ? RequestStatus.APPROVED
          : RequestStatus.REJECTED_BY_DIRECTOR,
      },
      [Role.ENSEIGNANT]: {
        [RequestStatus.PENDING]: isApproved
          ? RequestStatus.APPROVED_BY_SUPERVISOR
          : RequestStatus.REJECTED_BY_SUPERVISOR,
      },
      [Role.ADMIN]: {},
      [Role.MASTER]: {},
      [Role.DOCTORANT]: {},
    };

    const nextStatus = (nextStatusMap as Record<Role, any>)[userRole]?.[
      request!.status
    ];
 
    if (!nextStatus) {
      res.status(400).json({ message: ERROR_MESSAGES.INVALID_ROLE });
    }

    const updatedRequest = await prisma.request.update({
      where: { id },
      data: { status: nextStatus },
    });

    await NotificationsService.createNotification({
      userId: request!.userId,
      ...NotificationTemplates.REQUEST_APPROVED_BY_DIRECTOR(request!.id),
    });

    await sendMailAfterRequestsValidation(
      { ...updatedRequest, user: request!.user },
      userRole,
      nextStatus,
      !isApproved ? rejectReason : undefined
    );

    res.status(200).json({
      message: isApproved ? "Demande approuvée" : "Demande rejetée",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error in approveRequest:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
