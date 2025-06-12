import { RequestType } from "../../../generated/prisma";
import { requestRelationFieldByType } from "../../constants/requests";
import { getRequestById } from "../../services/requests.service";
import { AuthRequest } from "../../types/auth";
import { ERROR_MESSAGES } from "../../utils/authUtils";
import prisma from "../../utils/db";
import { Response } from "express";
import logger from "../../logger";

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
    logger.debug(
      { context: "EDIT_REQUEST", requestId: id, body: req.body },
      "Tentative de modification de demande"
    );

    const request = await getRequestById(id);

    if (!request) {
      logger.warn(
        { context: "EDIT_REQUEST", requestId: id },
        "Tentative de modification d'une demande non trouvée"
      );
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
      return;
    }

    const prismaModel = prismaModelByRequestType[request.type];
    const relationField = requestRelationFieldByType[request.type];

    if (!prismaModel || !relationField) {
      logger.error(
        { context: "EDIT_REQUEST", requestId: id, type: request.type },
        "Type de demande non supporté"
      );
      res.status(400).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
      return;
    }

    const relationObj = (request as Record<string, any>)[relationField];
    const relationId = relationObj?.id;
    if (!relationId) {
      logger.error(
        { context: "EDIT_REQUEST", requestId: id, relationField },
        "Relation introuvable pour la demande"
      );
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
      user: req.user,
    };

    logger.info(
      { context: "EDIT_REQUEST", requestId: id, userId: req.user?.userId },
      "Demande modifiée avec succès"
    );
    res.status(200).json({
      message: "Demande modifiée avec succès",
      data: sendData,
    });
    return;
  } catch (error) {
    logger.error(
      { context: "EDIT_REQUEST", requestId: id, error },
      "Erreur lors de la modification de la demande"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    return;
  }
};

// Fonction pour supprimer une demande reservée au soumetteur de la demande
export const deleteRequest = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    logger.debug(
      { context: "DELETE_REQUEST", requestId: id },
      "Tentative de suppression de demande"
    );

    const request = await getRequestById(id);
    if (!request) {
      logger.warn(
        { context: "DELETE_REQUEST", requestId: id },
        "Tentative de suppression d'une demande non trouvée"
      );
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
      return;
    }

    const deletedRequest = await prisma.request.delete({
      where: { id: request.id },
    });

    logger.info(
      { context: "DELETE_REQUEST", requestId: id, userId: req.user?.userId },
      "Demande supprimée avec succès"
    );
    res.status(200).json({
      message: "Demande supprimée avec succès",
      data: deletedRequest,
    });
    return;
  } catch (error) {
    logger.error(
      { context: "DELETE_REQUEST", requestId: id, error },
      "Erreur lors de la suppression de la demande"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    return;
  }
};
