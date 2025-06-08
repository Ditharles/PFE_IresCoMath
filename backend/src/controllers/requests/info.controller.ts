import { requestFields, extendRequestFields } from "../../constants/requests";
import { requestByRole } from "../../constants/resquestByRole";
import { getUserByID } from "../../services/auth.service";
import { getRequestById } from "../../services/requests.service";
import { AuthRequest } from "../../types/auth";
import { ERROR_MESSAGES } from "../../utils/authUtils";
import prisma from "../../utils/db";
import { Role } from "../../utils/validateUtils";
import { Response } from "express";
import logger from "../../logger";

// Renvoie les requetes possibles en fonction du rôle de l'utilisateur
export const getPossibleRequests = (req: AuthRequest, res: Response) => {
  
  res.status(200).json(requestByRole[req.user.role as Role]);
};

//Renvoie toutes les requetes effectuées par l'utilisateur connecté
export const getRequests = async (req: AuthRequest, res: Response) => {
  try {
    logger.debug(
      { context: "GET_REQUESTS", userId: req.user.userId },
      "Tentative de récupération des requêtes utilisateur"
    );

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

    logger.info(
      { context: "GET_REQUESTS", userId: req.user.userId, count: requests.length },
      "Requêtes utilisateur récupérées avec succès"
    );
    res.status(200).json(formattedRequests);
  } catch (error) {
    logger.error(
      { context: "GET_REQUESTS", userId: req.user.userId, error },
      "Erreur lors de la récupération des requêtes"
    );
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Renvoie les détails d'une requete spécifique
export const getRequest = async (req: AuthRequest, res: Response) => {
  const requestId = req.params.id;
  try {
    logger.debug(
      { context: "GET_REQUEST", requestId, userId: req.user.userId },
      "Tentative de récupération d'une requête spécifique"
    );

    if (!requestId) {
      logger.warn(
        { context: "GET_REQUEST", requestId },
        "ID de requête manquant"
      );
      return res.status(400).json({ message: "Request ID is required" });
    }

    const request = await getRequestById(requestId);

    if (!request) {
      logger.warn(
        { context: "GET_REQUEST", requestId },
        "Requête non trouvée"
      );
      return res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }

    const user = await getUserByID(request.user.id);
    logger.info(
      { context: "GET_REQUEST", requestId, status: request.status },
      "Détails de la requête récupérés avec succès"
    );
    res.status(200).json({ request, user: user });
  } catch (error) {
    logger.error(
      { context: "GET_REQUEST", requestId, error },
      "Erreur lors de la récupération de la requête"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Renvoie toutes les requetes effectuées par tous les utilisateurs
export const getAllRequests = async (req: AuthRequest, res: Response) => {
  try {
    logger.debug(
      { context: "GET_ALL_REQUESTS", userId: req.user.userId, role: req.user.role },
      "Tentative de récupération de toutes les requêtes"
    );

    const requests = await prisma.request.findMany({
      select: extendRequestFields,
    });

    const formattedRequests = [];
    for (const request of requests) {
      const user = await getUserByID(request.user.id);
      formattedRequests.push({ ...request, user });
    }

    logger.info(
      { 
        context: "GET_ALL_REQUESTS", 
        count: formattedRequests.length,
        firstRequestId: formattedRequests[0]?.id 
      },
      "Toutes les requêtes récupérées avec succès"
    );
    res.status(200).json(formattedRequests);
  } catch (error) {
    logger.error(
      { context: "GET_ALL_REQUESTS", error },
      "Erreur critique lors de la récupération de toutes les requêtes"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
