import { Response } from "express";
import { RequestType, Role } from "../../generated/prisma";
import { requestByRole } from "../utils/constants/resquestByRole";
import { ERROR_MESSAGES, getDirector, getSupervisor, validateRequestBody } from "../utils/authUtils";
import prisma from "../utils/db";
import { AuthRequest } from "../types/auth";
import NotificationsService from "../services/Notifications.service";
import { NotificationTemplates } from "../utils/constants/notificationsMessage";


// Fonctions d'aide
const isStudent = (role: Role): boolean => role === Role.DOCTORANT || role === Role.MASTER;

const getUserFullName = (user: { nom: string; prenom: string }): string => `${user.nom} ${user.prenom}`;

const sendRequestNotifications = async (
  user: any,
  requestType: string
) => {
  try {
    // Notification to requester
    await NotificationsService.createNotification({
      userId: user.id,
      ...NotificationTemplates.DEMANDE_REÇUE(requestType),
    });

    // Notification to director
    const director = await getDirector();
    if (director) {
      await NotificationsService.createNotification({
        userId: director.id,
        ...NotificationTemplates.DIRECTOR_NEW_REQUEST(getUserFullName(user), requestType),
      });
    }

    // Notification to supervisor if student
    if (isStudent(user.role)) {
      const supervisor = await getSupervisor(user.id);
      if (supervisor) {
        await NotificationsService.createNotification({
          userId: supervisor.id,
          ...NotificationTemplates.SUPERVISOR_NEW_REQUEST(getUserFullName(user), requestType),
        });
      }
    }
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};

// Controllers
export const getPossibleRequests = (req: AuthRequest, res: Response) => {
  res.status(200).json(requestByRole[req.user.role]);
};

export const getRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.request.findMany({
      where: { userId: req.user.id },
    });
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getAllRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.request.findMany();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const submitMaterialPurchaseRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const requiredFields = [
    "nom",
    "type",
    "specificites",
    "estimation",
    "quantite",
  ];

  if (!validateRequestBody(req.body, requiredFields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }
  try {
    const [request, requestMateriel] = await prisma.$transaction([
      prisma.request.create({
        data: {
          type: RequestType.ACHAT_MATERIEL,
          userId: req.user.id,
          notes: req.body.notes || null,
        },
      }),
      prisma.requestPurchaseMaterial.create({
        data: {
          requeteId: request.id,
          typeMateriel: req.body.type,
          nom: req.body.nom,
          specificites: req.body.specificites,
          estimationCout: req.body.estimation,
          quantite: req.body.quantite,
          photo: req.body.photo || null,
        },
      }),
    ]);

    await sendRequestNotifications(req.user, "achat de materiel");

    res.status(200).json({ message: "Demande de materiel soumise avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const submitMaterialLendRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const requiredFields = ["quantite", "material_id", "date_debut", "date_fin"];

  if (!validateRequestBody(req.body, requiredFields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }

  try {
    const [request, requestMateriel] = await prisma.$transaction([
      prisma.request.create({
        data: {
          type: RequestType.PRET_MATERIEL,
          userId: req.user.id,
          notes: req.body.notes || null,
        },
      }),
      prisma.requestLendMaterial.create({
        data: {
          requeteId: request.id,
          quantite: req.body.quantite,
          materielId: req.body.material_id,
          dateDebut: new Date(req.body.date_debut),
          dateFin: new Date(req.body.date_fin),
        },
      }),
    ]);

    await sendRequestNotifications(req.user, "pret de materiel");

    res.status(200).json({ request, requestMateriel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};