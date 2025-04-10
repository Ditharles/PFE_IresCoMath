import { Request, Response } from "express";
import { PrismaClient, RequestStatus } from "../../generated/prisma";
import jwt from "jsonwebtoken";
import transporter from "../utils/mailer";

const prisma = new PrismaClient();

// Filtre pour les paramètres des recherche
interface Filters {
  status?: RequestStatus;
  dateInscription?: Date;
  encadrant?: string;
  directeur_these?: string;
  fonction?: string;
  email?: string;
  roleRequest?: string;
}

const requestRoleMap = {
  enseignant: prisma.requestEnseignantChercheur,
  master: prisma.requestMaster,
  doctorant: prisma.requestDoctorant,
};

const roleMap = {
  enseignant: prisma.enseignantChercheur,
  admin: prisma.admin,
};

// Champs des données renvoyés respectivement pour les doctorants et les étudiants en master vers le frontend
const requestDoctorantFields = {
  id: true,
  nom: true,
  prenom: true,
  email: true,
  dateInscription: true,
  createdAt: true,
  directeur_these_id: true,
  photo: true,
};

const requestMasterFields = {
  id: true,
  nom: true,
  prenom: true,
  email: true,
  dateInscription: true,
  createdAt: true,
  encadrant_id: true,
  photo: true,
};

const fields = {
  enseignants: {
    id: true,
    nom: true,
    prenom: true,
    email: true,
    fonction: true,
    grade: true,
    createdAt: true,
    photo: true,
  },
  masters: requestMasterFields,
  doctorants: requestDoctorantFields,
};

// Pour transformer les status en type manipulable
const statusMap: Record<string, RequestStatus> = {
  pending: RequestStatus.PENDING,
  approved_by_admin: RequestStatus.APPROVEDBYADMIN,
  approved_by_superieur: RequestStatus.APPROVEDBYSUPERIEUR,
  rejected_by_admin: RequestStatus.REJECTEDBYADMIN,
  rejected_by_superieur: RequestStatus.REJECTEDBYSUPERIEUR,
};

// Pour déterminer la requête suivante selon validation et rejet
const nextStatusMap: Record<
  string,
  Record<RequestStatus, Record<boolean, RequestStatus>>
> = {
  enseignant: {
    [RequestStatus.PENDING]: {
      true: RequestStatus.APPROVEDBYSUPERIEUR,
      false: RequestStatus.REJECTEDBYSUPERIEUR,
    },
    [RequestStatus.APPROVEDBYADMIN]: {
      true: RequestStatus.APPROVEDBYTWO,
      false: RequestStatus.REJECTEDBYSUPERIEUR,
    },
  },
  admin: {
    [RequestStatus.PENDING]: {
      true: RequestStatus.APPROVEDBYADMIN,
      false: RequestStatus.REJECTEDBYADMIN,
    },
    [RequestStatus.APPROVEDBYSUPERIEUR]: {
      true: RequestStatus.APPROVEDBYTWO,
      false: RequestStatus.REJECTEDBYADMIN,
    },
  },
};
//Liste des requetes en attente de validation
export const getWaitingList = async (req: Request, res: Response) => {
  try {
    const filters = buildFilters(req.query);
    const { roleRequest } = req.query;

    if (typeof roleRequest !== "string") {
      return res.status(400).json({ message: "Demande de rôle invalide" });
    }

    const data = await fetchDataByRole(
      req.user.id,
      req.user.role,
      roleRequest,
      filters
    );
    if (!data) {
      return res
        .status(400)
        .json({ message: "Erreur : Aucune donnée trouvée" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erreur rencontrée :", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Filtres de recherches
const buildFilters = (query: any): Filters => {
  const filters: Filters = {};

  if (query.status) filters.status = statusMap[query.status];
  if (query.dateInscription)
    filters.dateInscription = new Date(query.dateInscription);
  if (query.encadrant) filters.encadrant = query.encadrant;
  if (query.directeur_these) filters.directeur_these = query.directeur_these;
  if (query.fonction) filters.fonction = query.fonction;
  if (query.email) filters.email = query.email;
  return filters;
};

// Interroge la base de données
const fetchDataByRole = async (
  id: string,
  role: string,
  roleRequest: string,
  filters: Filters
) => {
  const data: any = {};
  const model = roleMap[role];

  if (role === "enseignant") {
    const requests = await model.findUnique({
      where: { id },
      select: {
        requestMaster: {
          select: fields.masters,
          where: filters,
        },
        requestDoctorant: {
          select: fields.doctorants,
          where: filters,
        },
      },
    });

    if (!roleRequest) {
      data.requests = requests;
    } else if (roleRequest === "master") {
      data.requestsMaster = requests?.requestMaster;
    } else if (roleRequest === "doctorant") {
      data.requestsDoctorant = requests?.requestDoctorant;
    }
  } else {
    for (const [key, value] of Object.entries(requestRoleMap)) {
      data[key] = await value.findMany({
        where: filters,
        select: fields[key],
      });
    }
  }
  return data;
};

// Fournit les informations d'un utilisateur à partir de son id et de son rôle
export const getRequestInfo = async (req: Request, res: Response) => {
  try {
    const { user_id, user_role } = req.query;

    if (typeof user_id !== "string" || typeof user_role !== "string") {
      return res
        .status(400)
        .json({ message: "Paramètres de requête invalides" });
    }

    const model = requestRoleMap[user_role];
    if (!model) {
      return res.status(400).json({ message: "Modèle de rôle non trouvé" });
    }

    const data = await model.findUnique({
      where: { id: user_id, isConfirm: true },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Pour la validation des requêtes
export const validateRequest = async (req: Request, res: Response) => {
  try {
    const { request_id, request_role, validate, rejected_reason } = req.body;
    const user = req.user;

    if (!request_id || !request_role || validate === undefined) {
      return res
        .status(400)
        .json({ message: "Paramètres de requête manquants" });
    }

    if (!validate && !rejected_reason) {
      return res.status(400).json({ message: "Mentionnez le motif de rejet" });
    }

    const request = await requestRoleMap[request_role].findUnique({
      where: { id: request_id },
    });

    if (!request) {
      return res.status(404).json({ message: "Requête non trouvée" });
    }

    if (user.role === "enseignant") {
      if (request_role === "master" && request.encadrant_id !== user.id) {
        return res.status(403).json({
          message: "Vous n'êtes pas autorisé à valider cette requête de master",
        });
      }
      if (
        request_role === "doctorant" &&
        request.directeur_these_id !== user.id
      ) {
        return res.status(403).json({
          message:
            "Vous n'êtes pas autorisé à valider cette requête de doctorant",
        });
      }
    }

    const updateStatus = async (status: RequestStatus) => {
      const model = requestRoleMap[request_role];
      if (model) {
        await model.update({
          where: { id: request_id },
          data: { status },
        });
      } else {
        throw new Error("Modèle de rôle non trouvé");
      }
    };

    const newStatus = nextStatusMap[user.role]?.[request.status]?.[validate];

    if (newStatus) {
      await updateStatus(newStatus);
      await sendMailAfterValidation(request, request_role, newStatus, user);
      res.status(200).json({ message: "Requête mise à jour avec succès" });
    } else {
      res
        .status(400)
        .json({ message: "Statut de requête invalide ou déjà approuvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la validation de la requête :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Envoie le mail pour la validation ou le rejet des requêtes
const sendMailAfterValidation = async (
  request: any,
  request_role: string,
  finalStatus: RequestStatus,
  user: any
) => {
  const jwtSecret = process.env.JWT_SECRET;

  let subject, text;
  if (
    finalStatus === RequestStatus.APPROVEDBYTWO ||
    (finalStatus === RequestStatus.APPROVEDBYADMIN &&
      request_role === "enseignant")
  ) {
    subject = "Votre demande a été approuvée";
    text = `Votre demande a été approuvée par ${
      user.role === "admin"
        ? "l'administrateur"
        : request_role === "master"
        ? "encadrant"
        : "directeur de thèse"
    }.`;

    const token = jwt.sign(
      { email: request.email, role: request_role },
      jwtSecret!,
      { expiresIn: "1h" }
    );
    const validationLink = `https:/localhost:3000/validation?token=${token}`;

    text += `\n\nVeuillez cliquer sur le lien suivant pour finaliser votre inscription : ${validationLink}`;
  } else if (finalStatus == RequestStatus.APPROVEDBYSUPERIEUR) {
    subject = `Votre demande a été validé par votre ${
      request_role === "master" ? "encadrant" : "directeur de thèse"
    }`;
    text = `Votre demande a été validé par ${
      request_role === "master" ? "encadrant" : "directeur de thèse"
    }  et est en attente de validation du directeur ou d'un administrateur`;
  } else if (finalStatus === RequestStatus.APPROVEDBYADMIN) {
    subject = "Demande validé par le directeur du laboratoire";
    text = `Votre demande a été validé parle directeur ou un administrateur et est en attente de validation de votre ${
      request_role === "master" ? "encadrant" : "directeur de thèse"
    }  `;
  } else {
    subject = "Votre demande a été rejetée";
    text = `Votre demande a été rejetée par ${
      user.role === "admin" ? "l'administrateur" : "votre supérieur"
    }.`;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: request.email,
    subject: subject,
    text: text,
  });
};
