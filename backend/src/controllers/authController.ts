import { PrismaClient, RequestStatus } from "../../generated/prisma";
import transporter from "../utils/mailer";
import jwt, {
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from "jsonwebtoken";
import bcrypt from "bcrypt";
import e, { Request, Response } from "express";

const prisma = new PrismaClient();

// Mapping des rôles pour les requêtes Prisma
const roleMap = {
  admin: prisma.admin,
  enseignant: prisma.enseignantChercheur,
  doctorant: prisma.doctorant,
  master: prisma.master,
};

const requestRoleMap = {
  enseignant: prisma.requestEnseignantChercheur,
  doctorant: prisma.requestDoctorant,
  master: prisma.requestMaster,
};

// Fonctions pour générer les liens pour la confirmation et le reset de mot de passe
const generateTokenLink = (email: string, role: string) => {
  const token = jwt.sign({ email, role }, JWT_SECRET_KEY, { expiresIn: "1h" });
  return `http://localhost:3000/auth/${role}/${token}`;
};

// Fonction pour l'envoi des mails
const sendEmail = async (
  email: string,
  nom: string,
  prenom: string,
  role: string,
  subject: string,
  link: string,
  buttonText: string
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          .header { background: #007BFF; color: white; padding: 15px; text-align: center; font-size: 20px; border-radius: 8px 8px 0 0; }
          .content { padding: 20px; text-align: left; color: #333; }
          .button { display: block; width: 250px; margin: 20px auto; padding: 10px; text-align: center; background: #28a745; color: white; text-decoration: none; font-size: 16px; border-radius: 5px; }
          .footer { text-align: center; padding: 10px; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">${subject}</div>
          <div class="content">
            <p>Bonjour ${nom} ${prenom},</p>
            <p>Vous avez soumis une demande pour le rôle de <strong>${role}</strong> au sein du laboratoire IreSCoMath.</p>
            <p>Merci de bien vouloir ${buttonText} en cliquant sur le bouton ci-dessous :</p>
            <a href="${link}" class="button">${buttonText}</a>
            <p>Si vous ne reconnaissez pas cette demande, veuillez ignorer ce message.</p>
            <p>Pour toute question, n'hésitez pas à nous contacter à <a href="mailto:support@irescomath.com">support@irescomath.com</a>.</p>
          </div>
          <div class="footer">© 2025 - IreSCoMath. Tous droits réservés.</div>
        </div>
      </body>
      </html>
    `,
  });
};

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// Fonction pour la création des requêtes d'authentification
const registerUser = async (
  req: Request,
  res: Response,
  role: string,
  data: any
) => {
  const { email } = data;

  try {
    const roleKeys = Object.keys(roleMap);
    const requestRoleKeys = Object.keys(requestRoleMap);

    const exist = await Promise.any([
      ...requestRoleKeys.map((role) =>
        requestRoleMap[role].findUnique({ where: { email } })
      ),
      ...roleKeys.map((role) => roleMap[role].findUnique({ where: { email } })),
    ]);

    if (exist) {
      return res.status(400).json({
        message: `Cet utilisateur ${role} existe déjà ou une requête a déjà été envoyée`,
      });
    }

    if ("dateInscription" in data) {
      data.dateInscription = new Date(data.dateInscription);
    }
    if (role === "doctorant" && "directeur_these" in data) {
      data.directeur_these = {
        connect: {
          id: data.directeur_these,
        },
      };
    }
    if (role === "master" && "encadrant" in data) {
      data.encadrant = {
        connect: {
          id: data.encadrant,
        },
      };
    }

    const user = await requestRoleMap[role].create({ data });

    await sendEmail(
      email,
      data.nom,
      data.prenom,
      role,
      "Validation de la requête d'authentification",
      generateTokenLink(email, role, "confirm"),
      "Confirmer"
    );

    const token = jwt.sign({ id: user.id, role: role }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(201).json({ accesToken: token });
  } catch (error) {
    console.error(
      `Erreur lors de la création de l'utilisateur ${role}:`,
      error
    );
    return res
      .status(500)
      .json({ message: `Erreur lors de la création de l'utilisateur ${role}` });
  }
};

// Fonction pour la validation du contenu des requêtes
const validateRequestBody = (body: any, requiredFields: string[]) => {
  for (const field of requiredFields) {
    if (!body[field]) {
      return false;
    }
  }
  return true;
};

// Exported functions
export const registerEnseignant = async (req: Request, res: Response) => {
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
    return res
      .status(400)
      .json({ message: "Veuillez remplir tous les champs" });
  }

  await registerUser(req, res, "enseignant", req.body);
};

export const registerMaster = async (req: Request, res: Response) => {
  const requiredFields = [
    "nom",
    "prenom",
    "email",
    "photo",
    "dateInscription",
    "encadrant",
  ];
  if (!validateRequestBody(req.body, requiredFields)) {
    return res
      .status(400)
      .json({ message: "Veuillez remplir tous les champs" });
  }

  const encadrant = await prisma.enseignantChercheur.findUnique({
    where: { id: req.body.encadrant },
  });
  if (!encadrant) {
    return res.status(400).json({ message: "Encadrant non existant" });
  }
  await registerUser(req, res, "master", req.body);
};

export const registerDoctorant = async (req: Request, res: Response) => {
  const requiredFields = [
    "nom",
    "prenom",
    "email",
    "photo",
    "dateInscription",
    "directeur_these",
  ];
  if (!validateRequestBody(req.body, requiredFields)) {
    return res
      .status(400)
      .json({ message: "Veuillez remplir tous les champs" });
  }
  const directeur_these = await prisma.enseignantChercheur.findUnique({
    where: { id: req.body.directeur_these },
  });
  if (!directeur_these) {
    return res.status(400).json({ message: "Directeur de thèse non existant" });
  }
  await registerUser(req, res, "doctorant", req.body);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let user = null;
    let role = null;

    for (const [roleKey, model] of Object.entries(roleMap)) {
      user = await model.findUnique({ where: { email } });
      if (user) {
        role = roleKey;
        break;
      }
    }

    if (!user) {
      return res.status(400).json({ message: "Utilisateur non existant" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: role,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "48h",
      }
    );

    return res.status(200).json({ accessToken: token });
  } catch (error) {
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Déconnexion effectuée avec succès" });
};

export const confirmRequest = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const { email, role } = decoded as { email: string; role: string };

    await requestRoleMap[role].update({
      where: { email },
      data: { isConfirm: true },
    });
    const user = await requestRoleMap[role].findUnique({ where: { email } });
    const accessToken = jwt.sign({ id: user.id, role: role }, JWT_SECRET_KEY, {
      expiresIn: "48h",
    });
    res.status(200).send({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
export const validateAccount = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
      email: string;
      role: string;
    };
    const { email, role } = decoded;

    let userRequest;

    if (role === "enseignant") {
      userRequest = await requestRoleMap[role].findUnique({
        where: {
          email: email,
        },
        select: {
          nom: true,
          prenom: true,
          email: true,
          fonction: true,
          grade: true,
          etablissement: true,
          isConfirm: true,
          status: true,
        },
      });
    } else if (role === "doctorant") {
      userRequest = await requestRoleMap[role].findUnique({
        where: {
          email: email,
        },
        select: {
          nom: true,
          prenom: true,
          email: true,
          dateInscription: true,
          directeur_these: true,
          isConfirm: true,
          status: true,
        },
      });
    } else if (role === "master") {
      userRequest = await requestRoleMap[role].findUnique({
        where: {
          email: email,
        },
        select: {
          nom: true,
          prenom: true,
          email: true,
          dateInscription: true,
          encadrant: true,
          isConfirm: true,
          status: true,
        },
      });
    } else {
      return res.status(404).json({ message: "Role invalide" });
    }

    if (!userRequest) {
      return res.status(404).json({ message: "Requête non trouvée" });
    }

    if (userRequest.isConfirm === false) {
      return res.status(400).json({ message: "Requête non confirmée" });
    }

    if (
      (userRequest.status !== RequestStatus.APPROVEDBYTWO &&
        role !== "enseignant") ||
      (role === "enseignant" &&
        userRequest.status !== RequestStatus.APPROVEDBYADMIN)
    ) {
      return res.status(400).json({ message: "Requête non validée" });
    }

    if (["enseignant", "doctorant", "master"].includes(role)) {
      await requestRoleMap[role].delete({
        where: {
          email: email,
        },
      });
    }

    const { isConfirm, status, ...userData } = userRequest;
    const user = await roleMap[role].create({
      data: userData,
    });

    return res.status(200).json({ message: "Opération réussie" });
  } catch (error) {
    console.error("Erreur lors de la validation du compte:", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de la validation du compte" });
  }
};
export const submitPassword = async (req: any, res: Response) => {
  try {
    const { password } = req.body;

    // Validation de la présence du mot de passe
    if (!password) {
      return res
        .status(400)
        .json({ message: "Veuillez remplir tous les champs" });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    await roleMap[req.user.role].update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "Mot de passe défini avec succès" });
  } catch (error) {
    console.error("Erreur lors de la soumission du mot de passe :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const resendConfirmLink = async (req: Request, res: Response) => {
  const { token } = req.headers;
  try {
    const user = req.user as { id: string; role: string };
    const userbd = await requestRoleMap[user.role].findUnique({
      where: { id: user.id },
    });
    if (!userbd) {
      return res.status(400).json({ message: "Cette requête n'existe pas" });
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
  } catch (error) {}
};

export const resendConfirmLinkWithMail = async (
  req: Request,
  res: Response
) => {
  const { email, role } = req.body;
  try {
    const userbd = await requestRoleMap[role].findUnique({
      where: { email },
    });
    if (!userbd) {
      return res.status(400).json({ message: "Cette requête n'existe pas" });
    }
    await sendEmail(
      userbd.email,
      userbd.nom,
      userbd.prenom,
      role,
      "Validation de la requête d'authentification",
      generateTokenLink(userbd.email, role, "confirm"),
      "Confirmer"
    );
    return res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user as { id: string; role: string };
  try {
    const userbd = await roleMap[user.role].findUnique({
      where: { id: user.id },
    });
    if (!userbd) {
      return res.status(400).json({ message: "Cette requête n'existe pas" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      userbd.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await roleMap[user.role].update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    res.status(200).json({ message: "Mot de passe changé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  const { email, role } = req.body;
  try {
    const user = await roleMap[role].findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }
    await sendEmail(
      user.email,
      user.nom,
      user.prenom,
      role,
      "Réinitialisation de mot de passe",
      generateTokenLink(user.email, role, "reset-password"),
      "Réinitialiser le mot de passe"
    );
    return res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const confirmResetPassword = async (req: Request, res: Response) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    console.log(decoded);
    const { email, role } = decoded as { email: string; role: string };
    const user = await roleMap[role as keyof typeof roleMap].findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }
    const newToken = jwt.sign({ email, role }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token: newToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token ou nouveau mot de passe manquant" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const { email, role } = decoded as { email: string; role: string };

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await roleMap[role].findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "Mot de passe identique" });
    }

    await roleMap[role].update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveeeeur" });
  }
};
