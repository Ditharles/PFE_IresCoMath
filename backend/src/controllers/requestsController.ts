import { response, Response } from "express";
import {
  RequestType,
  Request,
  Role,
  PurchaseRequest,
  EquipmentLoanRequest,
  EquipmentType,
  RequestStatus,
} from "../../generated/prisma";
import { requestByRole } from "../constants/resquestByRole";
import { ERROR_MESSAGES, validateRequestBody } from "../utils/authUtils";
import prisma from "../utils/db";
import { AuthRequest } from "../types/auth";
import NotificationsService from "../services/Notifications.service";
import { NotificationTemplates } from "../constants/notificationsMessage";
import {
  checkSupervisorExists,
  getDirector,
  getSupervisor,
  getUserByID,
} from "../services/auth.service";
import { extendRequestFields, requestFields } from "../constants/requests";
import { getRequestById } from "../services/request.service";

// Fonctions d'aide
const isStudent = (role: Role): boolean =>
  role === Role.DOCTORANT || role === Role.MASTER;

const getUserFullName = (user: {
  lastName: string;
  firstName: string;
}): string => `${user.lastName} ${user.firstName}`;

const sendRequestNotifications = async (user: any, requestType: string) => {
  try {
    // Notification to requester
    await NotificationsService.createNotification({
      userId: user.userId,
      ...NotificationTemplates.REQUEST_RECEIVED(requestType),
    });

    // Notification to director
    const director = await getDirector();
    if (director) {
      await NotificationsService.createNotification({
        userId: director.id,
        ...NotificationTemplates.NEW_REQUEST_DIRECTOR(
          getUserFullName(user),
          requestType
        ),
      });
    }

    if (isStudent(user.role)) {
      const supervisor = await getSupervisor(user.id);
      if (supervisor) {
        await NotificationsService.createNotification({
          userId: supervisor.id,
          ...NotificationTemplates.NEW_REQUEST_SUPERVISOR(
            getUserFullName(user),
            requestType
          ),
        });
      }
    }
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};

export const getPossibleRequests = (req: AuthRequest, res: Response) => {
  res.status(200).json(requestByRole[req.user.role as Role]);
};

export const getRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.request.findMany({
      where: { userId: req.user.userId },
      select: requestFields,
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedRequests = requests.map((request) => {
      return {
        ...request,
        user: req.user,
      };
    });

    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getRequest = async (req: AuthRequest, res: Response) => {
  try {
    const requestId = req.params.id;

    if (!requestId) {
      res.status(400).json({ message: "Request ID is required" });
    }

    const request = await getRequestById(requestId);

    if (!request) {
      res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ request, user: req.user });
  } catch (error) {
    console.error("Error fetching request:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
export const getAllRequests = async (req: AuthRequest, res: Response) => {
  console.log(req.user);
  try {
    const requests = await prisma.request.findMany({
      select: extendRequestFields,
    });
    const formattedRequests = [];
    for (const request of requests) {
      const user = await getUserByID(request.user.id);
      formattedRequests.push({ ...request, user });
    }
    console.log("donnees", formattedRequests);
    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const submitEquipmentPurchaseRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const requiredFields = [
    "name",
    "equipmentType",
    "costEstimation",
    "quantity",
    "specifications",
  ];

  if (!validateRequestBody(req.body, requiredFields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }

  try {
    const request = await prisma.request.create({
      data: {
        type: RequestType.EQUIPMENT_PURCHASE,
        userId: req.user.userId,
        notes: req.body.notes || null,
      },
    });

    const equipmentRequest = await prisma.purchaseRequest.create({
      data: {
        requestId: request.id,
        equipmentType: req.body.equipmentType as EquipmentType,
        name: req.body.name,
        specifications: req.body.specifications || {},
        costEstimation: Number(req.body.costEstimation),
        quantity: req.body.quantity,
        photo: req.body.photo || null,
      },
    });

    await sendRequestNotifications(req.user, "achat de matériel");

    res.status(200).json({
      message: "Demande de matériel soumise avec succès",
      request,
      equipmentRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const submitEquipmentLendRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const requiredFields = ["quantity", "categoryId", "startDate", "endDate"];

  if (!validateRequestBody(req.body, requiredFields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }

  try {
    const request = await prisma.request.create({
      data: {
        type: RequestType.EQUIPMENT_LOAN,
        userId: req.user.userId,
        notes: req.body.notes || null,
      },
    });

    const equipmentLoan = await prisma.equipmentLoanRequest.create({
      data: {
        categoryId: req.body.categoryId,
        requestId: request.id,
        quantity: req.body.quantity,
        equipmentId: req.body.equipmentId ?? null,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
      },
    });

    await sendRequestNotifications(req.user, "prêt de matériel");

    res.status(200).json({
      message: "Demande de prêt soumise avec succès",
      request,
      equipmentLoan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const submitRequestStage = async (req: AuthRequest, res: Response) => {
  const requiredFields = [
    "company",
    "companyEmail",
    "companyPhone",
    "supervisor",
    "supervisorEmail",
    "supervisorPhone",
    "letter",
    "country",
    "startDate",
    "endDate",
  ];

  if (!validateRequestBody(req.body, requiredFields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }

  try {
    const request = await prisma.request.create({
      data: {
        type: RequestType.INTERNSHIP,
        userId: req.user.userId,
        notes: req.body.notes || null,
      },
    });

    const stageRequest = await prisma.requestStage.create({
      data: {
        requestId: request.id,
        company: req.body.company,
        companyEmail: req.body.companyEmail,
        companyPhone: req.body.companyPhone,
        supervisor: req.body.supervisor,
        supervisorEmail: req.body.supervisorEmail,
        supervisorPhone: req.body.supervisorPhone,
        letter: req.body.letter,
        country: req.body.country,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
      },
    });

    await sendRequestNotifications(req.user, "stage");

    res.status(200).json({
      message: "Demande de stage soumise avec succès",
      request,
      stageRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const submitMissionRequest = async (req: AuthRequest, res: Response) => {
  const requiredFields = [
    "objective",
    "country",
    "startDate",
    "endDate",
    "location",
  ];

  if (!validateRequestBody(req.body, requiredFields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }
  try {
    const request = await prisma.request.create({
      data: {
        type: RequestType.MISSION,
        userId: req.user.userId,
        notes: req.body.notes || null,
      },
    });

    const missionRequest = await prisma.mission.create({
      data: {
        requestId: request.id,
        objective: req.body.objective,
        location: req.body.location,
        country: req.body.country,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
      },
    });

    await sendRequestNotifications(req.user, "mission");

    res.status(200).json({
      message: "Demande de mission soumise avec succès",
      request,
      missionRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const submitScientificEventRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const requiredFields = [
    "location",
    "title",
    "articlesAccepted",
    "startDate",
    "endDate",
  ];

  if (!validateRequestBody(req.body, requiredFields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }
  try {
    const request = await prisma.request.create({
      data: {
        type: RequestType.CONFERENCE,
        userId: req.user.userId,
        notes: req.body.notes || null,
      },
    });

    const scientificEventRequest = await prisma.scientificEvent.create({
      data: {
        requestId: request.id,

        title: req.body.title,
        articlesAccepted: req.body.articlesAccepted,
        articleCover: req.body.articleCover || null,
        location: req.body.location,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
      },
    });

    await sendRequestNotifications(req.user, "évènement scientifique");

    res.status(200).json({
      message: "Demande de participation a un évènement  soumise avec succès",
      request,
      scientificEventRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const submitArticleRegistrationRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const requiredFields = ["conference", "amount"];

  if (!validateRequestBody(req.body, requiredFields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }
  try {
    const request = await prisma.request.create({
      data: {
        type: RequestType.ARTICLE_REGISTRATION,
        userId: req.user.userId,
        notes: req.body.notes || null,
      },
    });

    const articleRegistrationRequest = await prisma.articleRegistration.create({
      data: {
        requestId: request.id,

        conference: req.body.conference,
        amount: req.body.amount,
      },
    });

    await sendRequestNotifications(req.user, "évènement scientifique");

    res.status(200).json({
      message: "Demanded'enregistrement d'article soumise avec succès",
      request,
      articleRegistrationRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const approveRequest = async (req: AuthRequest, res: Response) => {
  try {
    const requiredFields = ["isApproved"];
    if (!validateRequestBody(req.body, requiredFields)) {
      res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }
    const { rejectReason, isApproved } = req.body;
    const { id } = req.params;
    // Vérification de l'existence de la demande
    const request = await prisma.request.findUnique({
      where: {
        id: id,
      },
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
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }

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
    };

    // Vérification des autorisations
    if (
      request.user.role === Role.MASTER ||
      request.user.role === Role.DOCTORANT
    ) {
      const isSupervisor =
        (req.user.role === Role.ENSEIGNANT &&
          req.user.id === request.user?.masterStudent?.supervisorId) ||
        req.user.role === Role.DIRECTEUR;
      if (!isSupervisor) {
        return res.status(403).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
      }
    }

    // Vérification de la transition d'état
    function isRole(role: any): role is Role {
      return role === Role.DIRECTEUR || role === Role.ENSEIGNANT;
    }

    if (isRole(req.user.role)) {
      const nextStatus = nextStatusMap[req.user.role]?.[request.status];
      if (!nextStatus) {
        return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ROLE });
      }

      // Mise à jour du statut de la demande
      await prisma.request.update({
        where: {
          id: id,
        },
        data: {
          status: nextStatus,
        },
      });

      // Envoi des notifications
      if (isApproved) {
        req.user.role === Role.DIRECTEUR
          ? await NotificationsService.createNotification({
              userId: request.userId,
              ...NotificationTemplates.REQUEST_APPROVED_BY_DIRECTOR,
            })
          : await NotificationsService.createNotification({
              userId: request.userId,
              ...NotificationTemplates.REQUEST_APPROVED_BY_SUPERVISOR,
            });
      } else {
        req.user.role === Role.DIRECTEUR
          ? await NotificationsService.createNotification({
              userId: request.userId,
              ...NotificationTemplates.REQUEST_REJECTED_BY_DIRECTOR(
                rejectReason
              ),
            })
          : await NotificationsService.createNotification({
              userId: request.userId,
              ...NotificationTemplates.REQUEST_REJECTED_BY_SUPERVISOR(
                rejectReason
              ),
            });
      }
    } else {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ROLE });
    }

    res
      .status(200)
      .json({ message: isApproved ? "Demande approuvée" : "Demande rejetée" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
