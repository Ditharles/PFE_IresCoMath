import { RequestStatus } from "../../../generated/prisma";
import {
  createUser,
  createTeacherResearcher,
  createDoctoralStudent,
  createMasterStudent,
} from "../../services/auth.service";
import { sendInitialEmail } from "../../services/mail.service";
import { AuthHandler } from "../../types/auth";
import {
  JWT_SECRET_KEY,
  ERROR_MESSAGES,
  generateTokenLink,
  formatIpAddress,
  validateRequestBody,
} from "../../utils/authUtils";
import prisma from "../../utils/db";
import { RequestRole, requestRoleMap, Role } from "../../utils/validateUtils";
import jwt, { TokenExpiredError } from "jsonwebtoken";

// Confirme une demande d'inscription en utilisant le jeton d'authentification

export const confirmRequest: AuthHandler = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
      email: string;
      role: RequestRole;
    };
    const { email, role } = decoded;
    const model: any = requestRoleMap[role];
    const user = await model.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }
    await model.update({
      where: { email },
      data: { isConfirmed: true },
    });

    const accessToken = jwt.sign({ id: user?.id, role: role }, JWT_SECRET_KEY, {
      expiresIn: "48h",
    });
    res.status(200).send({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Renvoie un lien de confirmation à l'utilisateur pour confirmer sa demande d'inscription
export const resendConfirmLink: AuthHandler = async (req, res) => {
  const tempToken = req.headers.authorization?.split(" ")[1];
  if (!tempToken) {
    return res.status(400).json({ message: "Token temporaire manquant" });
  }
  try {
    const user = jwt.verify(tempToken, JWT_SECRET_KEY) as {
      id: string;
      role: RequestRole;
    };

    const userDb = await (requestRoleMap[user.role] as any).findUnique({
      where: { id: user.id },
    });
    if (!userDb) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }
    await sendInitialEmail(
      userDb.email,
      userDb.lastName,
      userDb.firstName,
      user.role,
      "Validation de la requête d'authentification",
      generateTokenLink(userDb.email, user.role, "confirm"),
      "Confirmer"
    );
    return res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Renvoie un lien de confirmation à l'utilisateur pour confirmer sa demande d'inscription à partir de son email
export const resendConfirmLinkWithMail: AuthHandler = async (req, res) => {
  try {
    const { email } = req.body;
    if (typeof email !== "string") {
      return res.status(400).json({ message: "Email requis" });
    }

    let userDb;
    let finalRole = "";

    for (let role of ["ENSEIGNANT", "MASTER", "DOCTORANT"]) {
      const requestModel: any = requestRoleMap[role as RequestRole];
      userDb = await requestModel.findUnique({
        where: { email },
      });
      finalRole = role;
      if (userDb) break;
    }
    if (!userDb) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }
    await sendInitialEmail(
      userDb.email,
      userDb.lastName,
      userDb.firstName,
      finalRole,
      "Validation de la requête d'authentification",
      generateTokenLink(userDb.email, finalRole, "confirm"),
      "Confirmer"
    );
    return res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Valide le compte de l'utilisateur en utilisant le jeton d'authentification après la validation de la demande d'adhésion par le directeur
export const validateAccount: AuthHandler = async (req, res) => {
  const { token } = req.params;

  if (typeof token !== "string") {
    return res.status(400).json({ message: "Token invalide" });
  }

  let role: Role;
  let request: any;

  try {
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET_KEY) as {
        email: string;
        role: Role;
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: "Token expiré" });
      }
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Token invalide" });
      }
      throw error;
    }

    const { email } = decoded;
    role = decoded.role;

    const model: any = requestRoleMap[role as RequestRole];
    if (!model) {
      return res.status(400).json({ message: "Rôle inconnu" });
    }

    request = await model.findUnique({
      where: { email },
    });

    if (!request) {
      res.status(404).json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }

    if (request.status !== RequestStatus.APPROVED) {
      res.status(400).json({ message: ERROR_MESSAGES.REQUEST_NOT_APPROVED });
    }

    await model.delete({
      where: { email },
    });

    const user = await createUser(
      email,
      role,
      request.password,
      request.firstName,
      request.lastName,
      request.cin,
      request.phone,
      request.photo || null
    );

    switch (role) {
      case "ENSEIGNANT":
        await createTeacherResearcher(request, user.id);
        break;
      case "DOCTORANT":
        await createDoctoralStudent(request, user.id);
        break;
      case "MASTER":
        await createMasterStudent(request, user.id);
    }

    const tempToken = jwt.sign({ id: user.id, role }, JWT_SECRET_KEY);

    res.status(200).json({
      message: "Compte validé avec succès",
      tempToken,
    });
  } catch (error) {
    console.error("Erreur lors de la validation du compte:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Soumet les informations supplémentaires de l'utilisateur après la validation de son compte
export const submitAdditionalInfo: AuthHandler = async (req, res) => {
  try {
    const { bankData, signature } = req.body;

    const requiredFields = ["bankData", "signature"];
    if (!validateRequestBody(req.body, requiredFields)) {
      return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    const token = req.params.token;
    if (!token) {
      res.status(400).json({ message: "Token manquant" });
    }

    let decoded: { userId: string; role: string };
    try {
      decoded = jwt.verify(token, JWT_SECRET_KEY) as {
        userId: string;
        role: string;
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: "Token expiré" });
      }
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Token invalide" });
      }
      throw error;
    }

    try {
      // Mettre à jour l'utilisateur avec les nouvelles informations
      const user = await prisma.user.update({
        where: {
          id: decoded.userId,
        },
        data: {
          signature,
          bankData,
        },
      });

      return res.status(200).json({
        message: "Compte finalisé avec succès",
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ message: "Token temporaire expiré" });
      }
      throw error;
    }
  } catch (error) {
    console.error(
      "Erreur lors de la soumission des informations supplémentaires :",
      error
    );
    return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
