import { requestFields, extendRequestFields } from "../../constants/requests";
import { requestByRole } from "../../constants/resquestByRole";
import { getUserByID } from "../../services/auth.service";
import { getRequestById } from "../../services/requests.service";
import { AuthRequest } from "../../types/auth";
import { ERROR_MESSAGES } from "../../utils/authUtils";
import prisma from "../../utils/db";
import { Role } from "../../utils/validateUtils";
import { Response } from "express";
import logger from "../../logger"; // Correction de l'import du logger

// Renvoie les requetes possibles en fonction du rôle de l'utilisateur
export const getPossibleRequests = (req: AuthRequest, res: Response) => {
  res.status(200).json(requestByRole[req.user.role as Role]);
};

//Renvoie toutes les requetes effectuées par l'utilisateur connecté
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
    logger.error("Error fetching requests:", error);
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Renvoie les détails d'une requete spécifique
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
    logger.error("Error fetching request:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Renvoie toutes les requetes effectuées par tous les utilisateurs
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
    logger.info(
      { firstRequest: formattedRequests[0] },
      "Première requête formatée"
    );
    res.status(200).json(formattedRequests);
  } catch (error) {
    logger.error(
      error,
      "Erreur lors de la récupération de toutes les requêtes"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
