import {
  RequestType,
  RequestStatus,
  EquipmentType,
  Prisma,
} from "../../../generated/prisma";
import { submitRequest } from "../../services/requests.service";
import { AuthRequest } from "../../types/auth";
import { validateRequestBody, ERROR_MESSAGES } from "../../utils/authUtils";
import prisma from "../../utils/db";
import { sendRequestNotifications } from "../../utils/notificationUtils";
import { Response } from "express";
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
  const requiredFields = ["description"];

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
