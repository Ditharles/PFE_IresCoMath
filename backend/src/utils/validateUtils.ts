import { PrismaClient, RequestStatus } from "../../generated/prisma";
import jwt from "jsonwebtoken";
import transporter from "./mailer";

const prisma = new PrismaClient();

// Types pour les rôles
export type Role = "ENSEIGNANT" | "MASTER" | "DOCTORANT" | "DIRECTEUR";

export type RequestRole = "ENSEIGNANT" | "MASTER" | "DOCTORANT";

// Filtre pour les paramètres des recherches
export interface Filters {
  status?: RequestStatus;
  dateInscription?: Date;
  encadrant?: { id: string };
  directeur_these?: { id: string };
  fonction?: string;
  email?: string;
  roleRequest?: RequestRole;
}

// Types pour les modèles Prisma
type RequestModel =
  | typeof prisma.requestEnseignantChercheur
  | typeof prisma.requestMaster
  | typeof prisma.requestDoctorant;
type RoleModel = typeof prisma.enseignantChercheur;

export const requestRoleMap: Record<RequestRole, RequestModel> = {
  ENSEIGNANT: prisma.requestEnseignantChercheur,
  MASTER: prisma.requestMaster,
  DOCTORANT: prisma.requestDoctorant,
};

export const roleMap: Record<Role, RoleModel> = {
  ENSEIGNANT: prisma.enseignantChercheur,
  DIRECTEUR: prisma.enseignantChercheur,
  MASTER: prisma.enseignantChercheur,
  DOCTORANT: prisma.enseignantChercheur,
};

// Champs des données renvoyés respectivement pour les doctorants et les étudiants en master vers le frontend
export const requestDoctorantFields = {
  id: true,
  nom: true,
  prenom: true,
  email: true,
  dateInscription: true,
  createdAt: true,
  directeur_these_id: true,
  photo: true,
};

export const requestMasterFields = {
  id: true,
  nom: true,
  prenom: true,
  email: true,
  dateInscription: true,
  createdAt: true,
  encadrant_id: true,
  photo: true,
};

export const fields: Record<RequestRole, any> = {
  ENSEIGNANT: {
    id: true,
    nom: true,
    prenom: true,
    email: true,
    fonction: true,
    grade: true,
    createdAt: true,
    photo: true,
  },
  MASTER: requestMasterFields,
  DOCTORANT: requestDoctorantFields,
};

// Pour déterminer la requête suivante selon validation et rejet
export const nextStatusMap: Record<
  RequestStatus,
  Record<string, RequestStatus>
> = {
  PENDING: {
    true: RequestStatus.APPROVED,
    false: RequestStatus.REJECTED,
  },
  APPROVED: {},
  REJECTED: {},
};

// Filtres de recherches
export const buildFilters = (query: any): Filters => {
  const filters: Filters = {};

  if (query.status) filters.status = query.status;
  if (query.dateInscription)
    filters.dateInscription = new Date(query.dateInscription);
  if (query.encadrant) filters.encadrant = { id: query.encadrant };
  if (query.directeur_these)
    filters.directeur_these = { id: query.directeur_these };
  if (query.fonction) filters.fonction = query.fonction;
  if (query.email) filters.email = query.email;
  return filters;
};

// Interroge la base de données
export const fetchDataByRole = async (
  id: string,
  role: Role,
  roleRequest: RequestRole | undefined,
  filters: Filters
) => {
  const data: any = {};
  const model = roleMap[role];

  if (role === "ENSEIGNANT") {
    const requests = await model.findUnique({
      where: { id },
      select: {
        requestsMaster: {
          select: fields.MASTER,
          where: filters,
        },
        requestsDoctorant: {
          select: fields.DOCTORANT,
          where: filters,
        },
      },
    });

    if (!roleRequest) {
      data.requests = requests;
    } else if (roleRequest === "MASTER") {
      data.requestsMaster = requests?.requestsMaster;
    } else if (roleRequest === "DOCTORANT") {
      data.requestsDoctorant = requests?.requestsDoctorant;
    }
  } else {
    for (const [key, value] of Object.entries(requestRoleMap)) {
      const typedKey = key as RequestRole;
      const model = value as any;
      data[typedKey] = await model.findMany({
        where: filters,
        select: fields[typedKey],
      });
    }
  }
  return data;
};

// Envoie le mail pour la validation ou le rejet des requêtes
export const sendMailAfterValidation = async (
  request: any,
  request_role: RequestRole,
  finalStatus: RequestStatus,
  user: { id: string; role: Role }
) => {
  const jwtSecret = process.env.JWT_SECRET_KEY;

  let subject, buttonText, mainContent, additionalInfo, linkUrl;

  if (finalStatus === RequestStatus.APPROVED) {
    subject = "Félicitations ! Votre demande a été approuvée";
    buttonText = "Finaliser mon inscription";

    const token = jwt.sign(
      { email: request.email, role: request_role },
      jwtSecret!,
      { expiresIn: "24h" }
    );

    linkUrl = `https://localhost:5173/validation/${token}`;

    mainContent = `
      <p>Nous avons le plaisir de vous informer que votre demande pour rejoindre le laboratoire IreSCoMath en tant que <span class="highlight">${request_role}</span> a été approuvée par notre directeur.</p>
      
      <p>Cette approbation marque le début de votre parcours avec notre équipe de recherche. Pour finaliser votre inscription et accéder à votre espace personnel, veuillez cliquer sur le bouton ci-dessous :</p>
    `;

    additionalInfo = `
      <p>Votre lien d'activation est valable pendant <span class="highlight">24 heures</span>. Au-delà de ce délai, vous devrez effectuer une nouvelle demande.</p>
      
      <p>Une fois votre compte activé, vous aurez accès à l'ensemble des ressources correspondant à votre profil au sein du laboratoire.</p>
    `;
  } else {
    subject = "Information concernant votre demande";
    buttonText = "Soumettre une nouvelle demande";
    linkUrl = "https://localhost:3000/register";

    mainContent = `
      <p>Nous vous remercions pour l'intérêt que vous portez au laboratoire IreSCoMath.</p>
      
      <p>Après examen attentif de votre candidature pour le poste de <span class="highlight">${request_role}</span>, nous regrettons de vous informer que votre demande n'a pas pu être approuvée pour le moment.</p>
    `;

    additionalInfo = `
      <p>Cette décision ne reflète pas nécessairement la qualité de votre profil, mais plutôt des besoins spécifiques actuels de notre laboratoire.</p>
      
      <p>N'hésitez pas à soumettre une nouvelle demande avec des informations complémentaires ou à postuler pour un rôle différent si vous pensez qu'il correspondrait mieux à votre parcours.</p>
    `;
  }

  const htmlContent = `
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
        .note {
          background-color: #f9f9f9;
          border-left: 4px solid #0066cc;
          padding: 10px 15px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${subject}</h1>
        </div>
        <div class="content">
          <p>Bonjour ${request.prenom} ${request.nom},</p>
          
          ${mainContent}
          
          <div style="text-align: center;">
            <a href="${linkUrl}" class="button">${buttonText}</a>
          </div>
          
          ${additionalInfo}
          
          <div class="note">
            <p><strong>Remarque :</strong> Si vous n'êtes pas à l'origine de cette demande, veuillez simplement ignorer ce message et nous en informer à <a href="mailto:security@irescomath.com">security@irescomath.com</a>.</p>
          </div>
          
          <p>Pour toute question complémentaire, notre équipe reste à votre disposition à l'adresse <a href="mailto:support@irescomath.com">support@irescomath.com</a>.</p>
          
          <p>Cordialement,<br>
          L'équipe IreSCoMath</p>
        </div>
        <div class="footer">
          <p>&copy; 2025 - Laboratoire IreSCoMath. Tous droits réservés.</p>
          <p>Ce message est automatique, merci de ne pas y répondre directement.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: request.email,
    subject: subject,
    html: htmlContent,
    text: `${subject}\n\nBonjour ${request.prenom} ${request.nom},\n\n${
      finalStatus === RequestStatus.APPROVED
        ? `Votre demande pour rejoindre le laboratoire IreSCoMath en tant que ${request_role} a été approuvée. Pour finaliser votre inscription, veuillez visiter le lien suivant (valable 24h): ${linkUrl}`
        : `Après examen de votre candidature pour le poste de ${request_role}, nous regrettons de vous informer que votre demande n'a pas pu être approuvée pour le moment.`
    }\n\nCordialement,\nL'équipe IreSCoMath`,
  });
};
