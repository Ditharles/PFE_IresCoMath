import {
  PrismaClient,
  Role,
  RequestStatus,
  EnseignantChercheur,
} from "../../generated/prisma";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  RequestDoctorant,
  RequestEnseignant,
  RequestMaster,
  RequestType,
  User,
} from "../types/auth";
import transporter from "./mailer";

const prisma = new PrismaClient();

// Constantes
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY!;

// Messages d'erreur
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

// Mapping des rôles pour les requêtes Prisma
export const roleMap: Record<string, any> = {
  ADMIN: prisma.admin,
  ENSEIGNANT: prisma.enseignantChercheur,
  DOCTORANT: prisma.doctorant,
  MASTER: prisma.master,
};

export const requestRoleMap: Record<string, any> = {
  ENSEIGNANT: prisma.requestEnseignantChercheur,
  DOCTORANT: prisma.requestDoctorant,
  MASTER: prisma.requestMaster,
};


export const doctorantFields = {
  id: true,
  nom: true,
  prenom: true,
  email: true,
  dateInscription: true,
  createdAt: true,
  directeur_these_id: true,
  photo: true,
};

export const masterFields = {
  id: true,
  nom: true,
  prenom: true,
  email: true,
  dateInscription: true,
  createdAt: true,
  encadrant_id: true,
  photo: true,
};

export const enseignantFields = {
  id: true,
  nom: true,
  prenom: true,
  email: true,
  fonction: true,
  grade: true,
  createdAt: true,
  photo: true,
  masters: { select: masterFields },
  doctorants: { select: doctorantFields },
};


// Fonctions utilitaires
export function generateRandomToken(length = 64): string {
  return crypto.randomBytes(length).toString("hex");
}

export const generateTokenLink = (
  email: string,
  role: string,
  action: string
): string => {
  const token = jwt.sign({ email, role, action }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return `http://localhost:3000/auth/${role}/${action}/${token}`;
};

export const createSession = async (userId: string) => {
  let accessTokenValue, refreshTokenValue;
  let sessionCreated = false;

  while (!sessionCreated) {
    accessTokenValue = generateRandomToken(64);
    refreshTokenValue = generateRandomToken(64);
    try {
      await prisma.session.create({
        data: {
          accessToken: accessTokenValue,
          refreshToken: refreshTokenValue,
          userId: userId,
          machine: "web",
        },
      });
      sessionCreated = true;
    } catch (error: any) {
      if (
        !error.message?.includes(
          "Unique constraint failed on the fields: (`accessToken`)"
        )
      ) {
        throw error;
      }
    }
  }
  return { accessTokenValue, refreshTokenValue };
};

export const generateTokens = (
  accessTokenValue: string,
  refreshTokenValue: string
) => {
  const accessToken = jwt.sign({ token: accessTokenValue }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(
    { token: refreshTokenValue },
    JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: "1w",
    }
  );

  return { accessToken, refreshToken };
};

// Fonction pour vérifier si un utilisateur existe
export const checkUserExists = async (email: string): Promise<boolean> => {
  let user = null;

  for (const [key, value] of Object.entries(requestRoleMap)) {

    user = await value.findUnique({ where: { email } });
    if (user) break;
  }

  if (!user) {
    user = await user.findUnique({ where: { email } });
  }

  return !!user;
};

// Fonction pour créer une requête d'utilisateur

export const createUserRequest = async (role: string, data: RequestType) => {
  switch (role) {
    case "ENSEIGNANT": {
      const { nom, prenom, email, photo, fonction, grade, etablissement } =
        data as RequestEnseignant;
      return prisma.requestEnseignantChercheur.create({
        data: {
          nom,
          prenom,
          email,
          photo,
          fonction,
          grade,
          etablissement,
          status: RequestStatus.PENDING,
        },
      });
    }
    case "DOCTORANT": {
      const { nom, prenom, email, annee_these, directeur_these } =
        data as RequestDoctorant;
      return prisma.requestDoctorant.create({
        data: {
          nom,
          prenom,
          email,
          annee_these: Number(annee_these),
          directeur_these: {
            connect: {
              id: directeur_these?.id,
            },
          },
          status: RequestStatus.PENDING,
        },
      });
    }
    case "MASTER": {
      const { nom, prenom, email, annee_master, encadrant } =
        data as RequestMaster;
      return prisma.requestMaster.create({
        data: {
          nom,
          prenom,
          email,
          annee_master: Number(annee_master),
          encadrant: {
            connect: {
              id: encadrant?.id,
            },
          },
          status: RequestStatus.PENDING,
        },
      });
    }
    default:
      throw new Error("Role invalide");
  }
};

//Pour envoyer mail

export const sendEmail = async (
  email: string,
  nom: string,
  prenom: string,
  role: string,
  subject: string,
  link: string,
  buttonText: string
) => {
  const emailData = {
    from: process.env.EMAIL_USER || "",
    to: email,
    subject,
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #003366;
            color: #ffffff;
            padding: 20px;
            text-align: center;
          }
          .content {
            padding: 20px;
            background-color: #ffffff;
          }
          .button {
            display: inline-block;
            background-color: #0066cc;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            background-color: #f4f4f4;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #666666;
          }
          .highlight {
            font-weight: bold;
            color: #0066cc;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${subject}</h1>
          </div>
          <div class="content">
            <p>Bonjour ${prenom} ${nom},</p>
            
            <p>Nous vous remercions pour votre demande concernant le poste de <span class="highlight">${role}</span> au sein du laboratoire IreSCoMath.</p>
            
            <p>Pour poursuivre votre démarche, veuillez ${buttonText.toLowerCase()} en cliquant sur le bouton ci-dessous :</p>
            
            <div style="text-align: center;">
              <a href="${link}" class="button">${buttonText}</a>
            </div>
            
            <p>Si vous n'êtes pas à l'origine de cette demande, veuillez simplement ignorer ce message.</p>
            
            <p>Pour toute question complémentaire, notre équipe reste à votre disposition à l'adresse <a href="mailto:support@irescomath.com">support@irescomath.com</a>.</p>
            
            <p>Cordialement,<br>
            L'équipe IreSCoMath</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 - Laboratoire IreSCoMath. Tous droits réservés.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(emailData);
};

// Fonction pour créer un utilisateur
export const createUser = async (
  email: string,
  role: Role,
  password: string
): Promise<User> => {
  return prisma.user.create({
    data: {
      email,
      role,
      password,
    },
  });
};

// Fonction pour créer un doctorant
export const createDoctorant = async (
  data: RequestDoctorant,
  userId: string
) => {
  return prisma.doctorant.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      nom: data.nom,
      prenom: data.prenom,
      annee_these: Number(data.annee_these),
      directeur_these: {
        connect: {
          id: data.directeur_these?.id,
        },
      },
    },
  });
};

// Fonction pour créer un master
export const createMaster = async (data: RequestMaster, userId: string) => {
  return prisma.master.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      nom: data.nom,
      prenom: data.prenom,
      annee_master: Number(data.annee_master),
      dateInscription: new Date(),
      encadrant: {
        connect: {
          id: data.encadrant?.id,
        },
      },
    },
  });
};

// Fonction pour récupérer le superviseur
export const getSupervisor = async (
  email: string
): Promise<EnseignantChercheur | null> => {
  const supervisor = await prisma.enseignantChercheur.findFirst({
    where: {
      user: {
        email,
      },
    },
  });
  return supervisor;
};

// Fonction pour la validation du contenu des requêtes
export const validateRequestBody = (body: any, requiredFields: string[]) => {
  for (const field of requiredFields) {
    if (!body[field]) {
      return false;
    }
  }
  return true;
};

// Fonction pour vérifier l'existence de l'encadrant ou du directeur de thèse
export const checkSupervisorExists = async (id: string) => {
  const supervisor = await prisma.enseignantChercheur.findUnique({
    where: { id },
  });
  if (!supervisor) {
    throw new Error("Encadrant ou directeur de thèse non existant");
  }
  return supervisor;
};

// Fonction pour créer un enseignant
export const createEnseignant = async (
  data: RequestEnseignant,
  userId: string
) => {
  return prisma.enseignantChercheur.create({
    data: {
      userId,
      nom: data.nom,
      prenom: data.prenom,
      photo: data.photo,
      fonction: data.fonction,
      grade: data.grade,
      etablissement: data.etablissement,
    },
  });
};
