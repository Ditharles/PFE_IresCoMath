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
import {
  extendRequestFields,
  requestFields,
  requestRelationFieldByType,
} from "../constants/requests";
import { getRequestById } from "../services/requests.service";

import { sendRequestNotifications } from "../utils/notificationUtils";
import {
  sendMailAfterRequestClose,
  sendMailAfterRequestCompletion,
  sendMailAfterRequestsValidation,
} from "../services/mail.service";
import { get } from "http";
import { submitRequest } from "../services/requests.service";
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

    const formattedRequests = requests.map((request) => ({
      ...request,
      user: req.user,
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
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
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
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
      res.status(400).json({
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
      `Lot de  ${req.body.items.length} demandes d'achat soumis avec succès`
    );

    res.status(200).json({
      message: `${results.length} demandes de materiels créées`,
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
      res.status(400).json({
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

export const submitRepairMaintenanceRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const requiredFields = ["title", "description"];

  const response = await submitRequest(req, {
    type: RequestType.REPAIR_MAINTENANCE,
    userId: req.user.userId,
    data: req.body,
    requiredFields,
    successMessage: "Demande de maintenance soumise avec succès",
    createSpecificRequest: async (requestId, data) => {
      prisma.repairMaintenance.create({
        data: {
          requestId,
          title: data.title,
          description: data.description,
        },
      });
    },
  });

  res.status(response.status).json({ message: response.message });
};
export const submitEquipmentLendRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const requiredFields = ["quantity", "categoryId", "startDate", "endDate"];

  const response = await submitRequest(req, {
    type: RequestType.EQUIPMENT_LOAN,
    userId: req.user.userId,
    data: req.body,
    requiredFields,
    successMessage: "Demande de prêt soumise avec succès",
    createSpecificRequest: async (requestId, data) => {
      prisma.equipmentLoanRequest.create({
        data: {
          requestId,
          categoryId: data.categoryId,
          quantity: data.quantity,
          equipmentId: data.equipmentId ?? null,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        },
      });
    },
  });

  res.status(response.status).json({ message: response.message });
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

  const response = await submitRequest(req, {
    type: RequestType.INTERNSHIP,
    userId: req.user.userId,
    data: req.body,
    requiredFields,
    successMessage: "Demande de stage",
    createSpecificRequest: async (requestId, data) => {
      prisma.requestStage.create({
        data: {
          requestId,
          organization: data.organization,
          organizationEmail: data.organizationEmail,
          organizationUrl: data.organizationUrl || null,
          supervisor: data.supervisor || null,
          supervisorEmail: data.supervisorEmail || null,
          supervisorPhone: data.supervisorPhone || null,
          letter: data.letter,
          country: data.country,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        },
      });
    },
  });

  res.status(response.status).json({ message: response.message });
};

export const submitMissionRequest = async (req: AuthRequest, res: Response) => {
  const requiredFields = [
    "objective",
    "country",
    "startDate",
    "endDate",
    "hostOrganization",
  ];

  const response = await submitRequest(req, {
    type: RequestType.MISSION,
    userId: req.user.userId,
    data: req.body,
    requiredFields,
    successMessage: "Demande de mission",
    createSpecificRequest: async (requestId, data) => {
      prisma.mission.create({
        data: {
          requestId,
          objective: data.objective,
          hostOrganization: data.hostOrganization,
          specificDocument: data.specificDocument || [],
          country: data.country,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        },
      });
    },
  });

  res.status(response.status).json({ message: response.message });
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

  const response = await submitRequest(req, {
    type: RequestType.CONFERENCE_NATIONAL,
    userId: req.user.userId,
    data: req.body,
    requiredFields,
    successMessage: "Demande d'évènement scientifique",
    createSpecificRequest: async (requestId, data) => {
      prisma.scientificEvent.create({
        data: {
          requestId,
          title: data.title,
          urlEvent: data.urlEvent || null,
          mailAcceptation: data.mailAcceptation,
          articlesAccepted: data.articlesAccepted,
          articleCover: data.articleCover || null,
          location: data.location,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        },
      });
    },
  });

  res.status(response.status).json({ message: response.message });
};

export const submitArticleRegistrationRequest = async (
  req: AuthRequest,
  res: Response
) => {
  const requiredFields = ["articleCover", "amount"];

  const response = await submitRequest(req, {
    type: RequestType.ARTICLE_REGISTRATION,
    userId: req.user.userId,
    data: req.body,
    requiredFields,
    successMessage: "Demande d'enregistrement d'article",
    createSpecificRequest: async (requestId, data) => {
      prisma.articleRegistration.create({
        data: {
          requestId,
          title: data.title,
          articleCover: data.articleCover,
          conference: data.conference,
          urlConference: data.urlConference || null,
          amount: data.amount,
        },
      });
    },
  });

  res.status(response.status).json({ message: response.message });
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

export const editRequest = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const prismaModelByRequestType = {
    [RequestType.MISSION]: prisma.mission,
    [RequestType.INTERNSHIP]: prisma.requestStage,
    [RequestType.CONFERENCE_NATIONAL]: prisma.scientificEvent,
    [RequestType.EQUIPMENT_PURCHASE]: prisma.purchaseRequest,
    [RequestType.EQUIPMENT_LOAN]: prisma.equipmentLoanRequest,
    [RequestType.ARTICLE_REGISTRATION]: prisma.articleRegistration,
    [RequestType.REPAIR_MAINTENANCE]: prisma.repairMaintenance,
  };

  try {
    const request = await getRequestById(id);

    if (!request) {
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }

    const prismaModel = prismaModelByRequestType[request.type as RequestType];
    const relationField =
      requestRelationFieldByType[request.type as RequestType];

    if (!prismaModel || !relationField) {
      res.status(400).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }

    const relationId = request[relationField]?.id;
    if (!relationId) {
      res.status(404).json({ message: "Relation introuvable" });
    }

    const { type, ...updateData } = req.body;

    const updatedRequest = await prismaModel.update({
      where: { id: relationId },
      data: updateData,
    });

    const sendData = {
      ...request,
      [relationField]: updatedRequest,
    };

    res.status(200).json({
      message: "Demande modifiée avec succès",
      data: sendData,
    });
  } catch (error) {
    console.error("Erreur lors de la modification de la demande:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
export const deleteRequest = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const request = await getRequestById(id);
    if (!request) {
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }
    const deletedRequest = await prisma.request.delete({
      where: { id: request!.id },
    });
    res.status(200).json({
      message: "Demande supprimée avec succès",
      data: deletedRequest,
    });
  } catch (error) {
    console.error("Error completing request:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

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
