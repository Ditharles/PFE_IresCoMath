import {
  PrismaClient,
  RequestStatus,
  Role,
  Grade,
  TeacherResearcher,
  Prisma,
} from "../../generated/prisma";
import transporter from "../utils/mailer";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
  DoctoralStudentRequest,
  MasterStudentRequest,
  TeacherResearcherRequest,
} from "../types/auth";
import prisma from "../utils/db";
import {
  masterStudentFields,
  teacherResearcherFields,
  doctoralStudentFields,
} from "../constants/userFields";
import {
  checkUserExists,
  createUserRequest,
  checkSupervisorExists,
  createSession,
  createUser,
  createDoctoralStudent,
  createMasterStudent,
  createTeacherResearcher,
} from "../services/auth.service";

import { AuthHandler } from "../types/auth";
import {
  ERROR_MESSAGES,
  generateTokenLink,
  JWT_SECRET_KEY,
  validateRequestBody,
  generateTokens,
  JWT_REFRESH_SECRET_KEY,
  generateRandomToken,
} from "../utils/authUtils";
import { RequestRole, requestRoleMap } from "../utils/validateUtils";
import { sendInitialEmail } from "../services/mail.service";

// Fonction pour la création des requêtes d'authentification
const registerUser = async (
  req: Request,
  res: Response,
  role: string,
  data: any
) => {
  const { email } = data;
  console.log(data);
  if (!email || typeof email !== "string") {
    res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    return;
  }

  const emailString = email as string;

  try {
    const exist = await checkUserExists(emailString);

    if (exist) {
      res.status(400).json({ message: ERROR_MESSAGES.USER_EXISTS });
      return;
    }

    const user = await createUserRequest(role, data);

    const emailLink = generateTokenLink(emailString, role, "confirm");
    if (!emailLink) {
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
    res.status(201).json({ tempToken: token });
  } catch (error: any) {
    console.error(
      `Erreur lors de la création de l'utilisateur ${role}:`,
      error
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

// Exported functions
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
    res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    return;
  }

  try {
    await registerUser(req, res, "ENSEIGNANT", req.body);
  } catch (error) {
    console.error(
      `Erreur lors de la création de l'utilisateur ENSEIGNANT:`,
      error
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
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }

  try {
    await checkSupervisorExists(req.body.supervisorId);
    await registerUser(req, res, "MASTER", req.body);
  } catch (error) {
    console.error(`Erreur lors de la création de l'utilisateur MASTER:`, error);
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
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }

  try {
    await checkSupervisorExists(req.body.thesisSupervisorId);
    await registerUser(req, res, "DOCTORANT", req.body);
  } catch (error) {
    console.error(
      `Erreur lors de la création de l'utilisateur DOCTORANT:`,
      error
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const login: AuthHandler = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        password: true,
        masterStudent: {
          select: masterStudentFields,
        },
        teacherResearcher: {
          select: teacherResearcherFields,
        },
        doctoralStudent: {
          select: doctoralStudentFields,
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log("Mot de passe incorrect");
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.INCORRECT_PASSWORD });
    }

    const { accessTokenValue, refreshTokenValue } = await createSession(
      user.id
    );
    const { accessToken, refreshToken } = generateTokens(
      accessTokenValue,
      refreshTokenValue
    );

    return res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        ...user.masterStudent,
        ...user.teacherResearcher,
        ...user.doctoralStudent,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

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
    res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
  }
};

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

export const validateAccount: AuthHandler = async (req, res) => {
  const { token } = req.params;

  if (typeof token !== "string") {
    return res.status(400).json({ message: "Token invalide" });
  }

  let role: Role;
  let request: any;

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
      email: string;
      role: Role;
    };

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
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }

    if (request.status !== RequestStatus.APPROVED) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.REQUEST_NOT_APPROVED });
    }

    await model.delete({
      where: { email },
    });

    const password = "123"; // à remplacer par un mot de passe généré ou envoyé
    const cryptPassword = await bcrypt.hash(password, 10);

    const user = await createUser(email, role, cryptPassword);

    if (role === "DOCTORANT") {
      await createDoctoralStudent(request as DoctoralStudentRequest, user.id);
    } else if (role === "MASTER") {
      await createMasterStudent(request as MasterStudentRequest, user.id);
    } else if (role === "ENSEIGNANT") {
      await createTeacherResearcher(
        request as TeacherResearcherRequest,
        user.id
      );
    }

    const { accessTokenValue, refreshTokenValue } = await createSession(
      user.id
    );
    const { accessToken, refreshToken } = generateTokens(
      accessTokenValue,
      refreshTokenValue
    );

    res.status(200).json({
      message: "Compte validé avec succès",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Erreur lors de la validation du compte:", error);

    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const submitAdditionalInfo: AuthHandler = async (req, res) => {
  try {
    const { password, bankData, signature } = req.body;

    const requiredFields = ["password", "bankData", "signature"];
    if (!validateRequestBody(req.body, requiredFields)) {
      return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: req.user?.id,
      },
      data: {
        signature,
        bankData,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "Mot de passe défini avec succès" });
  } catch (error) {
    console.error("Erreur lors de la soumission du mot de passe :", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const resendConfirmLink: AuthHandler = async (req, res) => {
  const tempToken = req.headers.authorization?.split(" ")[1];
  if (!tempToken) {
    return res.status(400).json({ message: "Token temporaire manquant" });
  }
  try {
    const user = jwt.verify(tempToken as string, JWT_SECRET_KEY) as {
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

export const changePassword: AuthHandler = async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
  }

  try {
    const { oldPassword, newPassword } = req.body;
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
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { password: hashedPassword },
    });
    res.status(200).json({ message: "Mot de passe changé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const forgetPassword: AuthHandler = async (req, res) => {
  try {
    const { email } = req.body;
    if (typeof email !== "string") {
      return res.status(400).json({ message: "Email requis" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        teacherResearcher: {
          select: {
            lastName: true,
            firstName: true,
          },
        },
        masterStudent: {
          select: {
            lastName: true,
            firstName: true,
          },
        },
        doctoralStudent: {
          select: {
            lastName: true,
            firstName: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const lastName =
      user.teacherResearcher?.lastName ||
      user.masterStudent?.lastName ||
      user.doctoralStudent?.lastName ||
      "Utilisateur";
    const firstName =
      user.teacherResearcher?.firstName ||
      user.masterStudent?.firstName ||
      user.doctoralStudent?.firstName ||
      "";

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

export const refreshToken: AuthHandler = async (req, res) => {
  try {
    const accessToken = Array.isArray(req.headers.accessToken)
      ? req.headers.accessToken[0]
      : (req.headers.accessToken as string) || "";

    const refreshTokenValue = Array.isArray(req.headers.refreshToken)
      ? req.headers.refreshToken[0]
      : (req.headers.refreshToken as string) || "";

    if (!accessToken || !refreshTokenValue) {
      return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    }

    try {
      const decoded = jwt.verify(refreshTokenValue, JWT_REFRESH_SECRET_KEY) as {
        token: string;
      };
      const session = await prisma.session.findUnique({
        where: { refreshToken: decoded.token },
      });
      if (!session) {
        return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
      }
      if (session?.accessToken !== accessToken) {
        return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
      }
      const newAccessTokenValue = generateRandomToken(64);
      const refreshToken = session.refreshToken;
      if (!refreshToken) {
        throw new Error("Token de rafraîchissement manquant");
      }
      const { accessToken: newAccessToken } = generateTokens(
        newAccessTokenValue,
        refreshToken
      );
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
      }
      if (error instanceof JsonWebTokenError) {
        return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
      }
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getUser: AuthHandler = async (req, res) => {
  const id = req.user.userId;
  console.log(id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        role: true,
        teacherResearcher: { select: teacherResearcherFields },
        masterStudent: {
          select: masterStudentFields,
        },
        doctoralStudent: {
          select: doctoralStudentFields,
        },
        admin: {
          select: {
            lastName: true,
            firstName: true,
          },
        },
      },
    });

    const userFront = {
      email: user?.email,
      role: user?.role,
      ...user?.teacherResearcher,
      ...user?.masterStudent,
      ...user?.doctoralStudent,
    };
    res.status(200).json(userFront);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
