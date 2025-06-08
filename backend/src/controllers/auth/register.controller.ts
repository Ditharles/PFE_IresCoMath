import {
  checkUserExists,
  createUserRequest,
  checkSupervisorExists,
} from "../../services/auth.service";
import { sendInitialEmail } from "../../services/mail.service";
import { AuthHandler } from "../../types/auth";
import {
  ERROR_MESSAGES,
  generateTokenLink,
  JWT_SECRET_KEY,
  validateRequestBody,
} from "../../utils/authUtils";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import logger from "../../logger";

/**
 * Crée un utilisateur avec son rôle et envoie un email de confirmation
 *
 * @param req - La requête Express
 * @param res - La réponse Express
 * @param role - Le rôle de l'utilisateur
 * @param data - Les données de l'utilisateur
 */

const registerUser = async (
  req: Request,
  res: Response,
  role: string,
  data: any
) => {
  const { email, password } = data;
  logger.info({context: "REGISTER_USER"}, "Données reçues:", data);
  if (
    !email ||
    typeof email !== "string" ||
    !password ||
    typeof password !== "string"
  ) {
    logger.warn({context: "REGISTER_USER"}, "Champs manquants ou invalides");
    res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    return;
  }

  const emailString = email as string;
  const passwordString = password as string;

  try {
    const exist = await checkUserExists(emailString);

    if (exist) {
      logger.warn({context: "REGISTER_USER", email: emailString}, "Utilisateur existe déjà");
      res.status(400).json({ message: ERROR_MESSAGES.USER_EXISTS });
      return;
    }

    // Hasher le mot de passe avant de créer la demande
    const hashedPassword = await bcrypt.hash(passwordString, 10);
    const userData = { ...data, password: hashedPassword };
    const user = await createUserRequest(role, userData);

    const emailLink = generateTokenLink(emailString, role, "confirm");
    if (!emailLink) {
      logger.error({context: "REGISTER_USER"}, "Erreur génération lien email");
      res.status(400).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
      return;
    }

    await sendInitialEmail(
      emailString,
      data.lastName,
      data.firstName,
      role,
      "Validation de la requête d'authentification",
      emailLink,
      "Confirmer"
    );

    const token = jwt.sign({ id: user.id, role: role }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    logger.info(
      { context: "REGISTER_USER", user: emailString },
      "Utilisateur créé avec succès"
    );
    res.status(201).json({ tempToken: token });
  } catch (error: any) {
    logger.error(
      {context: "REGISTER_USER", error},
      `Erreur création utilisateur ${role}`
    );

    // Vérifier si l'erreur est liée à un numéro de téléphone unique
    if (error.code === "P2002" && error.meta?.target?.includes("phone")) {
      logger.warn({context: "REGISTER_USER"}, "Numéro de téléphone déjà utilisé");
      res.status(400).json({
        message: "Un utilisateur avec ce numéro de téléphone existe déjà",
      });
      return;
    }

    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Fonction globale
export const registerTeacherResearcher: AuthHandler = async (req, res) => {
  const requiredFields = [
    "lastName",
    "firstName",
    "email",
    "photo",
    "position",
    "grade",
    "institution",
  ];
  if (!validateRequestBody(req.body, requiredFields)) {
    logger.warn({context: "REGISTER_TEACHER"}, "Champs manquants");
    res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    return;
  }

  try {
    await registerUser(req, res, "ENSEIGNANT", req.body);
  } catch (error) {
    logger.error(
      { context: "REGISTER_TEACHER", user: req.body.email, error },
      "Erreur création enseignant"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const registerMasterStudent: AuthHandler = async (req, res) => {
  const requiredFields = [
    "lastName",
    "firstName",
    "email",
    "photo",
    "masterYear",
    "supervisorId",
  ];

  if (!validateRequestBody(req.body, requiredFields)) {
    logger.warn({context: "REGISTER_MASTER"}, "Champs manquants");
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }

  try {
    await checkSupervisorExists(req.body.supervisorId);
    await registerUser(req, res, "MASTER", req.body);
  } catch (error) {
    logger.error(
      { context: "REGISTER_MASTER", user: req.body.email, error },
      "Erreur création master"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const registerDoctoralStudent: AuthHandler = async (req, res) => {
  const requiredFields = [
    "lastName",
    "firstName",
    "email",
    "photo",
    "thesisYear",
    "thesisSupervisorId",
  ];
  if (!validateRequestBody(req.body, requiredFields)) {
    logger.warn({context: "REGISTER_DOCTORAL"}, "Champs manquants");
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }

  try {
    await checkSupervisorExists(req.body.thesisSupervisorId);
    await registerUser(req, res, "DOCTORANT", req.body);
  } catch (error) {
    logger.error(
      { context: "REGISTER_DOCTORAL", user: req.body.email, error },
      "Erreur création doctorant"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
