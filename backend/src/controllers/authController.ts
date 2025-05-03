import {
  PrismaClient,
  RequestStatus,
  Role,
  Grade,
  EnseignantChercheur,
  Prisma,
} from "../../generated/prisma";
import transporter from "../utils/mailer";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
  AuthRequest,
  AuthResponse,
  AuthHandler,
  RequestType,
  RequestDoctorant,
  RequestMaster,
  RequestEnseignant,
  User,
} from "../types/auth";
import {
  ERROR_MESSAGES,
  generateRandomToken,
  generateTokenLink,
  createSession,
  generateTokens,
  JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
  requestRoleMap,
  checkUserExists,
  createUser,
  createDoctorant,
  createMaster,
  validateRequestBody,
  createEnseignant,
  createUserRequest,
  sendEmail,
  getSupervisor,
  checkSupervisorExists,
  enseignantFields,
  masterFields,
  doctorantFields,
} from "../utils/authUtils";
import {
  requestDoctorantFields,
  requestMasterFields,
} from "../utils/validateUtils";

const prisma = new PrismaClient();

// Fonction pour la création des requêtes d'authentification
const registerUser = async (
  req: Request,
  res: Response,
  role: string,
  data: any
) => {
  const { email } = data;

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

    await sendEmail(
      emailString,
      data.nom,
      data.prenom,
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
export const registerEnseignant: AuthHandler = async (req, res) => {
  console.log(req.body);
  const requiredFields = [
    "nom",
    "prenom",
    "email",
    "photo",
    "fonction",
    "grade",
    "etablissement",
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

export const registerMaster: AuthHandler = async (req, res) => {
  const requiredFields = [
    "nom",
    "prenom",
    "email",
    "photo",
    "annee_master",
    "encadrant",
  ];
  console.log(req.body);
  if (!validateRequestBody(req.body, requiredFields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }

  try {
    await checkSupervisorExists(req.body.encadrant);
    await registerUser(req, res, "MASTER", req.body);
  } catch (error) {
    console.error(`Erreur lors de la création de l'utilisateur MASTER:`, error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const registerDoctorant: AuthHandler = async (req, res) => {
  const requiredFields = [
    "nom",
    "prenom",
    "email",
    "photo",
    "annee_these",
    "directeur_these",
  ];
  if (!validateRequestBody(req.body, requiredFields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }

  try {
    await checkSupervisorExists(req.body.directeur_these);
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
  console.log(req.body);
  try {
    const fields = { nom: true, prenom: true, photo: true };
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        password: true,
        master: {
          select: fields,
        },
        enseignant: {
          select: fields,
        },
        doctorant: {
          select: fields,
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
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
        ...user.master,
        ...user.enseignant,
        ...user.doctorant,
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
      role: string;
    };
    const { email, role } = decoded;

    const user = await requestRoleMap[role].findUnique({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }
    await requestRoleMap[role].update({
      where: { email },
      data: { isConfirm: true },
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

    const model = requestRoleMap[role];
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

    const user = await createUser(email, role, password);

    if (role === "DOCTORANT") {
      await createDoctorant(request as RequestDoctorant, user.id);
    } else if (role === "MASTER") {
      await createMaster(request as RequestMaster, user.id);
    } else if (role === "ENSEIGNANT") {
      await createEnseignant(request as RequestEnseignantChercheur, user.id);
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
  const temptoken = req.headers.authorization?.split(" ")[1];
  if (!temptoken) {
    return res.status(400).json({ message: "Token temporaire manquant" });
  }
  try {
    const user = jwt.verify(temptoken as string, JWT_SECRET_KEY) as {
      id: string;
      role: Role;
    };

    const userbd = await requestRoleMap[user.role].findUnique({
      where: { id: user.id },
    });
    if (!userbd) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }
    await sendEmail(
      userbd.email,
      userbd.nom,
      userbd.prenom,
      user.role,
      "Validation de la requête d'authentification",
      generateTokenLink(userbd.email, user.role, "confirm"),
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
      return res.status(400).json({ message: "Email  requis" });
    }

    let userbd;
    let finalRole;
    for (let role of ["ENSEIGNANT", "MASTER", "DOCTORANT"]) {
      userbd = await requestRoleMap[role].findUnique({
        where: { email },
      });
      finalRole = role;
      if (userbd) break;
    }
    if (!userbd) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.REQUEST_NOT_FOUND });
    }
    await sendEmail(
      userbd.email,
      userbd.nom,
      userbd.prenom,
      finalRole,
      "Validation de la requête d'authentification",
      generateTokenLink(userbd.email, finalRole, "confirm"),
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
      where: { id: req.user.id },
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
      where: { id: req.user.id },
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
        enseignant: {
          select: {
            nom: true,
            prenom: true,
          },
        },
        master: {
          select: {
            nom: true,
            prenom: true,
          },
        },
        doctorant: {
          select: {
            nom: true,
            prenom: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const nom =
      user.enseignant?.nom ||
      user.master?.nom ||
      user.doctorant?.nom ||
      "Utilisateur";
    const prenom =
      user.enseignant?.prenom ||
      user.master?.prenom ||
      user.doctorant?.prenom ||
      "";

    const resetToken = generateTokenLink(
      user.email,
      user.role,
      "reset-password"
    );

    await sendEmail(
      user.email,
      nom,
      prenom,
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
  const id = req.user.id;
  console.log(id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        role: true,
        enseignant: { select: enseignantFields },
        master: {
          select: masterFields,
        },
        doctorant: {
          select: doctorantFields,
        },
        admin: {
          select: {
            nom: true,
            prenom: true,
          },
        },
      },
    });

    const userfront = {
      email: user?.email,
      role: user?.role,
      ...user?.enseignant,
      ...user?.master,
      ...user?.doctorant,
    };
    res.status(200).json(userfront);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
