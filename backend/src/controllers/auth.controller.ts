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
  AuthRequest,
} from "../types/auth";
import prisma from "../utils/db";
import {
  masterStudentFields,
  teacherResearcherFields,
  doctoralStudentFields,
  userFields,
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
  getUserByID,
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
import { get } from "http";

const formatIpAddress = (ip: string): string => {
  // Si c'est une adresse IPv6 de loopback, retourner localhost
  if (ip === "::1" || ip === "::ffff:127.0.0.1") {
    return "localhost";
  }
  // Si c'est une adresse IPv6, la formater
  if (ip.includes("::ffff:")) {
    return ip.replace("::ffff:", "");
  }
  return ip;
};

// Fonction pour la création des requêtes d'authentification
const registerUser = async (
  req: Request,
  res: Response,
  role: string,
  data: any
) => {
  const { email, password } = data;
  console.log(data);
  if (
    !email ||
    typeof email !== "string" ||
    !password ||
    typeof password !== "string"
  ) {
    res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    return;
  }

  const emailString = email as string;
  const passwordString = password as string;

  try {
    const exist = await checkUserExists(emailString);

    if (exist) {
      res.status(400).json({ message: ERROR_MESSAGES.USER_EXISTS });
      return;
    }

    // Hasher le mot de passe avant de créer la demande
    const hashedPassword = await bcrypt.hash(passwordString, 10);
    const userData = { ...data, password: hashedPassword };
    const user = await createUserRequest(role, userData);

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

    // Vérifier si l'erreur est liée à un numéro de téléphone unique
    if (error.code === "P2002" && error.meta?.target?.includes("phone")) {
      res.status(400).json({
        message: "Un utilisateur avec ce numéro de téléphone existe déjà",
      });
      return;
    }

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

const checkRequestStatus = async (email: string) => {
  const roles = ["ENSEIGNANT", "MASTER", "DOCTORANT"] as const;

  for (const role of roles) {
    const model = requestRoleMap[role];
    const request = await (model as any).findUnique({
      where: { email },
    });

    if (request) {
      return {
        exists: true,
        status: request.status,
        role,
        rejectedReason: request.rejectedReason,
      };
    }
  }

  return { exists: false };
};

export const login: AuthHandler = async (req, res) => {
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

    return res.status(200).json({
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

    // Utiliser le mot de passe de la demande
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

    // Créer une nouvelle session
    const ipAddress = formatIpAddress(req.ip || req.socket.remoteAddress || "");
    const browserInfo = {
      browserName: req.headers["user-agent"]?.split(" ")[0] || "Unknown",
      browserVersion:
        req.headers["user-agent"]?.split("/")[1]?.split(" ")[0] || "Unknown",
    };

    const { accessTokenValue, refreshTokenValue } = await createSession(
      user.id,
      browserInfo,
      ipAddress
    );

    const { accessToken, refreshToken } = generateTokens(
      accessTokenValue,
      refreshTokenValue
    );

    res.status(200).json({
      message: "Compte validé avec succès",
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

    const requiredFields = ["bankData", "signature"];
    if (!validateRequestBody(req.body, requiredFields)) {
      return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
    }

    // Vérifier si le token temporaire est valide
    const decoded = req.tempUser as { userId: string; role: string };

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
    const refreshTokenValue =
      (req.headers.refreshtoken as string)?.trim() || "";
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
          accessToken: accessTokenValue,
        },
      });

      if (!session) {
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
      throw error;
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
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
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getUserSessions: AuthHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const sessions = await prisma.session.findMany({
      where: {
        userId: userId,
      },
    });

    return res.status(200).json({
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
    console.error("Erreur lors de la récupération des sessions:", error);
    return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

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
    console.error("Erreur lors de la déconnexion de la session:", error);
    return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
