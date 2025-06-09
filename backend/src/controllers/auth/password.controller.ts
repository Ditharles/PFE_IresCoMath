import { sendInitialEmail } from "../../services/mail.service";
import { AuthHandler } from "../../types/auth";
import {
  ERROR_MESSAGES,
  generateTokenLink,
  JWT_SECRET_KEY,
} from "../../utils/authUtils";
import prisma from "../../utils/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import logger from "../../logger";

// Change le mot de passe de l'utilisateur connecté
export const changePassword: AuthHandler = async (req, res) => {
  if (!req.user?.userId) {
    logger.warn({context: "CHANGE_PASSWORD"}, "Tentative de changement de mot de passe non autorisée");
    return res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
  }

  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      logger.warn({context: "CHANGE_PASSWORD"}, "Champs manquants pour le changement de mot de passe");
      return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    if (newPassword.length < 8) {
      logger.warn({context: "CHANGE_PASSWORD"}, "Mot de passe trop court");
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!user) {
      logger.error({context: "CHANGE_PASSWORD"}, "Utilisateur non trouvé");
      return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      logger.warn({context: "CHANGE_PASSWORD"}, "Mot de passe incorrect");
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.INCORRECT_PASSWORD });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      logger.warn({context: "CHANGE_PASSWORD"}, "Nouveau mot de passe identique à l'ancien");
      return res.status(400).json({ message: ERROR_MESSAGES.SAME_PASSWORD });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { password: hashedPassword },
    });

    logger.info({context: "CHANGE_PASSWORD", userId: req.user.userId}, "Mot de passe changé avec succès");
    res.status(200).json({ message: "Mot de passe changé avec succès" });
  } catch (error) {
    logger.error({context: "CHANGE_PASSWORD", error}, "Erreur lors du changement de mot de passe");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Envoie un email de réinitialisation de mot de passe à l'utilisateur
export const forgetPassword: AuthHandler = async (req, res) => {
  try {
    const { email } = req.body;
    if (typeof email !== "string") {
      logger.warn({context: "FORGET_PASSWORD"}, "Email non fourni");
      return res.status(400).json({ message: "Email requis" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logger.warn({context: "FORGET_PASSWORD", email}, "Utilisateur non trouvé");
      return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const lastName = user?.lastName || "Utilisateur";
    const firstName = user?.firstName ?? "";

    const resetToken = generateTokenLink(
      user.email,
      user.role,
      "reset-password"
    );

    await sendInitialEmail(
      user.email,
      lastName,
      firstName,
      user.role,
      "Réinitialisation de mot de passe",
      resetToken,
      "Réinitialiser le mot de passe"
    );

    logger.info({context: "FORGET_PASSWORD", email}, "Email de réinitialisation envoyé");
    res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    logger.error({context: "FORGET_PASSWORD", error}, "Erreur lors de l'envoi de l'email de réinitialisation");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Confirme la réinitialisation du mot de passe et génère un nouveau token
export const confirmResetPassword: AuthHandler = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
      email: string;
      role: string;
    };
    const { email, role } = decoded;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      logger.error({context: "CONFIRM_RESET_PASSWORD", email}, "Utilisateur non trouvé");
      return res.status(400).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    const newToken = jwt.sign({ email, role }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    
    logger.info({context: "CONFIRM_RESET_PASSWORD", email}, "Token de réinitialisation confirmé");
    return res.status(200).json({ token: newToken });
  } catch (error) {
    logger.error({context: "CONFIRM_RESET_PASSWORD", error}, "Erreur lors de la confirmation de réinitialisation");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Réinitialise le mot de passe de l'utilisateur avec le token de réinitialisation
export const resetPassword: AuthHandler = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    logger.warn({context: "RESET_PASSWORD"}, "Token ou mot de passe manquant");
    return res
      .status(400)
      .json({ message: "Token ou nouveau mot de passe manquant" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
      email: string;
      role: string;
    };
    const { email, role } = decoded;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logger.error({context: "RESET_PASSWORD", email}, "Utilisateur non trouvé");
      return res.status(400).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      logger.warn({context: "RESET_PASSWORD", email}, "Nouveau mot de passe identique à l'ancien");
      return res.status(400).json({ message: ERROR_MESSAGES.SAME_PASSWORD });
    }

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    logger.info({context: "RESET_PASSWORD", email}, "Mot de passe réinitialisé avec succès");
    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    logger.error({context: "RESET_PASSWORD", error}, "Erreur lors de la réinitialisation du mot de passe");
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
