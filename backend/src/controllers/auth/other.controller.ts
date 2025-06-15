import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { userFields } from "../../constants/userFields";
import { AuthHandler, AuthRequest } from "../../types/auth";
import {
  JWT_SECRET_KEY,
  ERROR_MESSAGES,
  JWT_REFRESH_SECRET_KEY,
  generateRandomToken,
  generateTokens,
} from "../../utils/authUtils";
import prisma from "../../utils/db";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import logger from "../../logger"; // Correction de l'import du logger

//Gère la déconnexion de l'utilisateur en supprimant la session associée au token d'accès
export const logout: AuthHandler = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: "Token manquant" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { token: string };

    await prisma.session.deleteMany({
      where: {
        accessToken: decoded.token,
      },
    });
    res.status(200).json({ message: "Déconnexion effectuée avec succès" });
  } catch (error) {
    logger.error(error, "Erreur lors de la déconnexion");
    res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
  }
};

// Rafraîchit le token d'accès en utilisant le token de rafraîchissement
export const refreshToken: AuthHandler = async (req, res) => {
  try {
    // Accepter refresh-token (minuscules) pour la cohérence avec les standards HTTP
    const refreshTokenValue =
      (req.headers["refresh-token"] as string)?.trim() ||
      (req.headers.refreshToken as string)?.trim() ||
      "";
    const authHeader = req.headers.authorization;

    if (!refreshTokenValue) {
      return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    }
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    }

    const accessTokenValue = authHeader.split(" ")[1]?.trim() || "";

    try {
      const decodedRefresh = jwt.verify(
        refreshTokenValue,
        JWT_REFRESH_SECRET_KEY
      ) as { token: string };

      const session = await prisma.session.findFirst({
        where: {
          refreshToken: decodedRefresh.token,
        },
      });

      if (!session) {
        logger.error(
          { refreshTokenValue, accessTokenValue },
          "Session non trouvée pour refresh"
        );
        return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
      }

      const newAccessTokenValue = generateRandomToken(64);
      const { accessToken: newAccessToken } = generateTokens(
        newAccessTokenValue,
        session.refreshToken
      );

      await prisma.session.update({
        where: { id: session.id },
        data: { accessToken: newAccessTokenValue },
      });

      return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
      }
      if (error instanceof JsonWebTokenError) {
        return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
      }
      logger.error(error, "Erreur lors du refresh token");
      throw error;
    }
  } catch (error) {
    logger.error(error, "Refresh token error");
    return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Récupère les informations de l'utilisateur connecté
export const getUser: AuthHandler = async (req, res) => {
  const id = req.user.userId;
  console.log(id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: userFields,
    });

    const userFront = {
      userId: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      photo: user?.photo,
      email: user?.email,
      phone: user?.phone,
      cin: user?.cin,
      bankData: user?.bankData,
      createdAt: user?.createdAt,
      role: user?.role,
      ...user?.teacherResearcher,
      ...user?.masterStudent,
      ...user?.doctoralStudent,
    };
    res.status(200).json(userFront);
  } catch (error) {
    logger.error(error, "Erreur lors de la récupération de l'utilisateur");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Récupère les sessions de l'utilisateur connecté
export const getUserSessions: AuthHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user.userId;
    const sessions = await prisma.session.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      sessions: sessions.map(
        (session: {
          id: string;
          browserName: string;
          browserVersion: string;
          ipAddress: string;
          createdAt: Date;
          accessToken: string;
        }) => ({
          id: session.id,
          browserName: session.browserName,
          browserVersion: session.browserVersion,
          ipAddress: session.ipAddress,
          createdAt: session.createdAt,
          isCurrentSession:
            session.accessToken === req.headers.authorization?.split(" ")[1],
        })
      ),
    });
  } catch (error) {
    logger.error(error, "Erreur lors de la récupération des sessions");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Déconnecte l'utilisateur d'une session spécifique
export const logoutSession: AuthHandler = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.userId;

    // Vérifier que la session appartient à l'utilisateur
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        userId: userId,
      },
    });

    if (!session) {
      return res.status(404).json({ message: "Session non trouvée" });
    }

    // Supprimer la session
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });

    return res.status(200).json({ message: "Session déconnectée avec succès" });
  } catch (error) {
    logger.error(error, "Erreur lors de la déconnexion de la session");
    return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
