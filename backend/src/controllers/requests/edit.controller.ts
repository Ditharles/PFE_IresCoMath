import { RequestType } from "../../../generated/prisma";
import { requestRelationFieldByType } from "../../constants/requests";
import { getRequestById } from "../../services/requests.service";
import { AuthRequest } from "../../types/auth";
import { ERROR_MESSAGES } from "../../utils/authUtils";
import prisma from "../../utils/db";
import { Response } from "express";
// Fonction pour éditer une demande réservée au soumetteur de la demande
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

    const prismaModel = prismaModelByRequestType[request!.type];
    const relationField = requestRelationFieldByType[request!.type];

    if (!prismaModel || !relationField) {
      res.status(400).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
      return;
    }

    if (!request) {
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
      return;
    }

    const relationObj = (request as Record<string, any>)[relationField];
    const relationId = relationObj?.id;
    if (!relationId) {
      res.status(404).json({ message: "Relation introuvable" });
      return;
    }

    const { type, ...updateData } = req.body;

    const updatedRequest = await (prismaModel as any).update({
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

// Fonction pour supprimer une demande reservée au soumetteur de la demande.Seuls les demandes en attente peuvent être supprimées
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
