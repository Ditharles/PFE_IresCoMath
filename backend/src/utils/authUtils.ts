import jwt from "jsonwebtoken";
import crypto from "crypto";

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
      expiresIn: "1h",
    }
  );

  const refreshToken: string = jwt.sign(
    { token: refreshTokenValue },
    JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: "1w",
    }
  );

  return { accessToken, refreshToken };
};

export const validateRequestBody = (body: any, requiredFields: string[]) => {
  return requiredFields.every((field) => body.hasOwnProperty(field));
};

