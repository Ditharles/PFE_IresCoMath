import { response, Response } from "express";
import {
  RequestType,
  Request,
  Role,
  PurchaseRequest,
  EquipmentLoanRequest,
  EquipmentType,
  RequestStatus,
  Prisma,
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

import { sendRequestNotifications } from "../utils/notificationUtils";
import { sendMailAfterRequestsValidation } from "../services/mail.service";
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
    const user = await getUserByID(request!.user.id);
    res.status(200).json({ request, user: user });
  } catch (error) {
    console.error("Error fetching request:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
export const getAllRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.request.findMany({
      select: extendRequestFields,
    });
    const formattedRequests = [];
    for (const request of requests) {
      const user = await getUserByID(request.user.id);
      formattedRequests.push({ ...request, user });
    }
    console.log(formattedRequests[0]);
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
    "quantity",
    "costEstimation",
  ];

  // Validation de chaque item
  for (const [index, item] of req.body.items.entries()) {
    if (!validateRequestBody(item, requiredFields)) {
      return res.status(400).json({
        message: `Item ${index + 1}: ${ERROR_MESSAGES.MISSING_FIELDS}`,
        itemIndex: index,
      });
    }
  }

  try {
    // Création des requêtes en transaction
    const results = await prisma.$transaction(
      req.body.items.map(
        (item: {
          notes: any;
          equipmentType: string;
          name: any;
          specifications: any;
          costEstimation: any;
          url: any;
          quantity: any;
          photo: any;
        }) =>
          prisma.request.create({
            data: {
              type: RequestType.EQUIPMENT_PURCHASE,
              userId: req.user.userId,
              notes: item.notes || null,
              status: RequestStatus.PENDING,
              purchaseRequest: {
                create: {
                  equipmentType: item.equipmentType as EquipmentType,
                  name: item.name,
                  url: item.url || null,
                  specifications: item.specifications || {},
                  costEstimation: Number(item.costEstimation),
                  quantity: Number(item.quantity),
                  photo: item.photo || null,
                },
              },
            },
            include: { purchaseRequest: true },
          })
      )
    );

    await sendRequestNotifications(
      req.user,
      `Lot de ${req.body.items.length} demandes d'achat soumis avec succès`
    );

    res.status(200).json({
      message: `${results.length} demandes créées`,
      requestIds: results.map((r) => r.id),
      count: results.length,
    });
  } catch (error) {
    console.error("Erreur transaction:", error);

    // Gestion des erreurs Prisma
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(400).json({
        message: "Une requête existe déjà avec ces paramètres",
      });
    }

    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      details:
        process.env.NODE_ENV === "development"
          ? (error as Error).message
          : undefined,
    });
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
    "organization",
    "organizationEmail",
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
        organization: req.body.organization,
        organizationEmail: req.body.organizationEmail,
        organizationUrl: req.body.organizationUrl || null,
        supervisor: req.body.supervisor || null,
        supervisorEmail: req.body.supervisorEmail || null,
        supervisorPhone: req.body.supervisorPhone || null,
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
    "hostOrganization",
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
        request: {
          connect: {
            id: request.id,
          },
        },
        objective: req.body.objective,
        hostOrganization: req.body.hostOrganization,
        specificDocument: req.body.specificDocument || [],
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
    "mailAcceptation",
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
        type: RequestType.CONFERENCE_NATIONAL,
        userId: req.user.userId,
        notes: req.body.notes || null,
      },
    });

    const scientificEventRequest = await prisma.scientificEvent.create({
      data: {
        requestId: request.id,

        title: req.body.title,
        urlEvent: req.body.urlEvent || null,
        mailAcceptation: req.body.mailAcceptation,
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
  const requiredFields = ["articleCover", "amount"];

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
        title: req.body.title,
        articleCover: req.body.articleCover,
        conference: req.body.conference,
        urlConference: req.body.urlConference || null,
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
    };

    const nextStatus = nextStatusMap[userRole]?.[request!.status];
    console.log(request!.status);
    if (!nextStatus) {
      res.status(400).json({ message: ERROR_MESSAGES.INVALID_ROLE });
    }

    const updatedRequest = await prisma.request.update({
      where: { id },
      data: { status: nextStatus },
    });

    // Création de la notification et envoi d'email
    const notificationTemplate = isApproved
      ? userRole === Role.DIRECTEUR
        ? NotificationTemplates.REQUEST_APPROVED_BY_DIRECTOR
        : NotificationTemplates.REQUEST_APPROVED_BY_SUPERVISOR
      : userRole === Role.DIRECTEUR
      ? NotificationTemplates.REQUEST_REJECTED_BY_DIRECTOR(rejectReason)
      : NotificationTemplates.REQUEST_REJECTED_BY_SUPERVISOR(rejectReason);

    await NotificationsService.createNotification({
      userId: request!.userId,
      ...notificationTemplate,
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

    res.status(200).json({
      message: "Les documents ont été ajoutés avec succès",
    });
  } catch (error) {
    console.error("Erreur dans addDocuments:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};


export const completeRequest = async (req: AuthRequest, res: Response) => {

  const {id}=req.params;
  try {
    const request = await getRequestById(id);

    if (!request) {
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

    const updatedRequest = await prisma.request.update({
      where: { id: request!.id },
      data: { status: RequestStatus.COMPLETED },
    });

    res.status(200).json({
      message: "Demande terminée avec succès",
    });
  } catch (error) {
    console.error("Error completing request:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};