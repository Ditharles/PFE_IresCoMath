import jwt from "jsonwebtoken";
import crypto from "crypto";
import { requestRoleMap } from "../services/auth.service";

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY!;

export const ERROR_MESSAGES = {
  USER_EXISTS: "Cet utilisateur existe déjà ou une requête a déjà été envoyée",
  INVALID_TOKEN: "Token invalide ou expiré",
  INTERNAL_ERROR: "Erreur interne du serveur",
  MISSING_FIELDS: "Veuillez remplir tous les champs",
  USER_NOT_FOUND: "Utilisateur non existant",
  INCORRECT_PASSWORD: "Mot de passe incorrect",
  INVALID_ROLE: "Role invalide",
  REQUEST_NOT_FOUND: "Requête non trouvée",
  REQUEST_NOT_CONFIRMED: "Requête non confirmée",
  REQUEST_NOT_APPROVED: "Requête non validée",
  SAME_PASSWORD: "Mot de passe identique",
  UNAUTHORIZED: "Non autorisé",
};

export const generateRandomToken = (length: number = 64): string => {
  return crypto.randomBytes(length).toString("hex");
};

export const generateTokenLink = (
  email: string,
  role: string,
  action: string
): string => {
  const token = jwt.sign({ email, role, action }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return `http://localhost:5173/confirm-email/${token}`;
};

export const generateTokens = (
  accessTokenValue: string,
  refreshTokenValue: string
) => {
  const accessToken: string = jwt.sign(
    { token: accessTokenValue },
    JWT_SECRET_KEY,
    {
      expiresIn: "4h",
    }
  );

  const refreshToken: string = jwt.sign(
    { token: refreshTokenValue },
    JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );

  return { accessToken, refreshToken };
};

export const validateRequestBody = (body: any, requiredFields: string[]) => {
  return requiredFields.every((field) => body.hasOwnProperty(field));
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as { exp?: number };
    if (!decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

export const verifyToken = (
  token: string,
  isRefreshToken: boolean = false
): boolean => {
  try {
    const secret = isRefreshToken ? JWT_REFRESH_SECRET_KEY : JWT_SECRET_KEY;
    jwt.verify(token, secret);
    return true;
  } catch {
    return false;
  }
};

export const checkRequestStatus = async (email: string) => {
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


export const  formatIpAddress = (ip: string): string => {
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
