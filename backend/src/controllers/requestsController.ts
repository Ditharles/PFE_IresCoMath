import { Response } from "express";
import { RequestType, Role } from "../../generated/prisma";
import { requestByRole } from "../utils/constants/resquestByRole";
import { ERROR_MESSAGES, validateRequestBody } from "../utils/authUtils";
import prisma from "../utils/db";
import { AuthRequest } from "../types/auth";

export const getPossibleRequests = (req: AuthRequest, res: Response) => {
  const role: Role = req.user.role;
  const requests = requestByRole[role];
  res.status(200).json(requests);
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
    res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    return;
  }

  try {
    const request = await prisma.request.create({
      data: {
        type: RequestType.ACHAT_MATERIEL,
        userId: req.user.id,
        notes: req.body.notes || null,
      },
    });

    const requestMateriel = await prisma.requestPurchaseMaterial.create({
      data: {
        requeteId: request.id,
        typeMateriel: req.body.type,
        nom: req.body.nom,
        specificites: req.body.specificites,
        estimationCout: req.body.estimation,
        quantite: req.body.quantite,
        photo: req.body.photo || null,
      },
    });

    res
      .status(200)
      .json({ message: "Demande de materiel soumise avec succès" });
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
    res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    return;
  }

  try {
    const request = await prisma.request.create({
      data: {
        type: RequestType.PRET_MATERIEL,
        userId: req.user.id,
        notes: req.body.notes || null,
      },
    });

    const requestMateriel = await prisma.requestLendMaterial.create({
      data: {
        requeteId: request.id,
        quantite: req.body.quantite,
        materielId: req.body.material_id,
        dateDebut: new Date(req.body.date_debut),
        dateFin: new Date(req.body.date_fin),
      },
    });

    res.status(200).json({ request, requestMateriel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
