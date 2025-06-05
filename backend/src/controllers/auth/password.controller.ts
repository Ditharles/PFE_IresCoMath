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

// Change le mot de passe de l'utilisateur connecté
export const changePassword: AuthHandler = async (req, res) => {
  if (!req.user?.userId) {
    return res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
  }

  try {
    const { oldPassword, newPassword } = req.body;

    // Validation des champs requis
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    // Validation de la longueur minimale du mot de passe
    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!user) {
      return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.INCORRECT_PASSWORD });
    }

    // Vérifier si le nouveau mot de passe est différent de l'ancien
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: ERROR_MESSAGES.SAME_PASSWORD });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Mot de passe changé avec succès" });
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Envoie un email de réinitialisation de mot de passe à l'utilisateur
export const forgetPassword: AuthHandler = async (req, res) => {
  try {
    const { email } = req.body;
    if (typeof email !== "string") {
      return res.status(400).json({ message: "Email requis" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
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

    res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error(error);
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
      return res.status(400).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    const newToken = jwt.sign({ email, role }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token: newToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Réinitialise le mot de passe de l'utilisateur avec le token de réinitialisation
export const resetPassword: AuthHandler = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
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
      return res.status(400).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: ERROR_MESSAGES.SAME_PASSWORD });
    }

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
