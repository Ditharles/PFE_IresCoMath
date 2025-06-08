import { createSession } from "../../services/auth.service";
import {
  checkRequestStatus,
  ERROR_MESSAGES,
  formatIpAddress,
} from "../../utils/authUtils";
import prisma from "../../utils/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserStatus } from "../../../generated/prisma";
import logger from "../../logger";

/**
 * Crée une session pour un utilisateur
 * @param req - La requête Express contenant l'email, le mot de passe et les informations de navigateur
 * @param res - La réponse Express
 * @returns La réponse Express avec le token d'accès et le token de rafraîchissement
 * @throws Si l'utilisateur n'existe pas ou si le mot de passe est incorrect
 */
export const login = async (req: Request, res: Response) => {
  const { email, password, browserInfo } = req.body;
  const ipAddress = formatIpAddress(req.ip || req.socket.remoteAddress || "");

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        masterStudent: true,
        teacherResearcher: true,
        doctoralStudent: true,
      },
    });

    if (!user) {
      // Vérifier si l'utilisateur a une demande en cours
      const requestStatus = await checkRequestStatus(email);

      if (requestStatus.exists) {
        if (requestStatus.status === "PENDING") {
          return res.status(403).json({
            message:
              "Votre demande d'adhésion est en cours d'examen. Veuillez patienter.",
            type: "PENDING_REQUEST",
          });
        }

        if (requestStatus.status === "REJECTED") {
          return res.status(403).json({
            message: `Votre demande d'adhésion a été rejetée. Motif : ${requestStatus.rejectedReason}`,
            type: "REJECTED_REQUEST",
          });
        }

        if (requestStatus.status === "APPROVED") {
          return res.status(403).json({
            message:
              "Votre demande d'adhésion a été approuvée. Veuillez consulter votre boîte mail pour finaliser votre inscription.",
            type: "APPROVED_REQUEST",
          });
        }
      }

      return res.status(400).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(403)
        .json({ message: ERROR_MESSAGES.INCORRECT_PASSWORD });
    }

    if (user.status === UserStatus.DESACTIVE) {
      res.status(403).json({
        message: "Votre compte est désactivé, contactez l'administrateur",
      });
    }

    const { accessTokenValue, refreshTokenValue } = await createSession(
      user.id,
      browserInfo,
      ipAddress
    );

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { token: refreshTokenValue },
      process.env.JWT_REFRESH_SECRET_KEY!,
      { expiresIn: "1w" }
    );

    logger.info(
      {
        context: "LOGIN",
        user: {
          id: user.id,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
      "Utilisateur connecté"
    );
    return res.status(200).json({
      message: "Connexion réussie",
      accessToken,
      refreshToken,
      user: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo,
        email: user.email,
        role: user.role,
        ...user.masterStudent,
        ...user.teacherResearcher,
        ...user.doctoralStudent,
      },
    });
  } catch (error) {
    logger.error({ error }, "Echec lors de la tentative de connexion");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
