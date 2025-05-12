import { Request, RequestStatus, Role } from "../../generated/prisma";
import prisma from "../utils/db";
import transporter from "../utils/mailer";

import jwt from "jsonwebtoken";
import { RequestRole } from "../utils/validateUtils";

// Interface pour les données communes des emails
interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  subject: string;
  link: string;
  buttonText: string;
  mainContent: string;
  additionalInfo?: string;
  note?: string;
}

// Template de base pour tous les emails
const BASE_EMAIL_TEMPLATE = (data: EmailData) => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${data.subject}</title>
  <style>
    /* Réinitialisation pour les clients de messagerie */
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #333333;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    
    /* Styles de base */
    * {
      box-sizing: border-box;
    }
    
    table {
      border-collapse: separate;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      width: 100%;
    }
    
    img {
      -ms-interpolation-mode: bicubic;
      max-width: 100%;
      border: 0;
    }
    
    /* Conteneur principal */
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    
    /* En-tête */
    .header {
      background-color: #003366;
      padding: 20px;
      text-align: center;
    }
    
    .header h1 {
      color: #ffffff;
      font-size: 24px;
      margin: 0;
      padding: 0;
    }
    
    /* Contenu */
    .content {
      padding: 30px 20px;
      background-color: #ffffff;
    }
    
    /* Bouton */
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    
    .button {
      display: inline-block;
      background-color: #0066cc;
      color: #ffffff !important;
      text-decoration: none;
      font-weight: bold;
      padding: 12px 28px;
      border-radius: 4px;
      font-size: 16px;
      mso-padding-alt: 0;
      text-transform: uppercase;
    }
    
    /* Fallback pour Outlook */
    .button-fallback {
      background-color: #0066cc;
      border-radius: 4px;
      border: 1px solid #0066cc;
    }
    
    /* Éléments en surbrillance */
    .highlight {
      font-weight: bold;
      color: #0066cc;
    }
    
    /* Note */
    .note {
      background-color: #f9f9f9;
      border-left: 4px solid #0066cc;
      padding: 15px;
      margin: 25px 0;
    }
    
    /* Pied de page */
    .footer {
      background-color: #f4f4f4;
      padding: 15px;
      text-align: center;
      font-size: 13px;
      color: #666666;
    }
    
    /* Responsive pour les mobiles */
    @media screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
      
      .content {
        padding: 20px 15px !important;
      }
      
      .header h1 {
        font-size: 22px !important;
      }
      
      .note {
        padding: 10px !important;
      }
      
      .button {
        padding: 10px 20px !important;
        font-size: 14px !important;
      }
    }
  </style>
</head>
<body>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0">
          <!-- En-tête -->
          <tr>
            <td class="header">
              <h1>${data.subject}</h1>
            </td>
          </tr>
          
          <!-- Contenu -->
          <tr>
            <td class="content">
              <p>Bonjour ${data.firstName} ${data.lastName},</p>
              
              ${data.mainContent}
              
              <!-- Bouton -->
              <div class="button-container">
                <!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${
                  data.link
                }" style="height:45px;v-text-anchor:middle;width:240px;" arcsize="10%" stroke="f" fillcolor="#0066cc">
                  <w:anchorlock/>
                  <center>
                <![endif]-->
                <a href="${data.link}" class="button">${data.buttonText}</a>
                <!--[if mso]>
                  </center>
                </v:roundrect>
                <![endif]-->
              </div>
              
              ${data.additionalInfo || ""}
              
              ${
                data.note
                  ? `
              <table role="presentation" class="note" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p><strong>Remarque :</strong> ${data.note}</p>
                  </td>
                </tr>
              </table>
              `
                  : ""
              }
              
              <p>Pour toute question complémentaire, notre équipe reste à votre disposition à l'adresse <a href="mailto:support@irescomath.com" style="color: #0066cc;">support@irescomath.com</a>.</p>
              
              <p>Cordialement,<br>L'équipe IreSCoMath</p>
            </td>
          </tr>
          
          <!-- Pied de page -->
          <tr>
            <td class="footer">
              <p>&copy; 2025 - Laboratoire IreSCoMath. Tous droits réservés.</p>
              <p>Ce message est automatique, merci de ne pas y répondre directement.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// Fonction générique pour envoyer des emails
export const sendEmail = async (data: EmailData) => {
  const htmlContent = BASE_EMAIL_TEMPLATE(data);

  const emailData = {
    from: process.env.EMAIL_USER || "",
    to: data.email,
    subject: data.subject,
    html: htmlContent,
    text: generatePlainTextVersion(data),
  };

  await transporter.sendMail(emailData);
};

// Génère une version texte brut de l'email
const generatePlainTextVersion = (data: EmailData): string => {
  return `
${data.subject}

Bonjour ${data.firstName} ${data.lastName},

${stripHtmlTags(data.mainContent)}

${data.buttonText}: ${data.link}

${data.additionalInfo ? stripHtmlTags(data.additionalInfo) : ""}

${data.note ? `Remarque : ${data.note}` : ""}

Pour toute question : support@irescomath.com

Cordialement,
L'équipe IreSCoMath

© 2025 - Laboratoire IreSCoMath. Tous droits réservés.
`.trim();
};

// Helper pour supprimer les balises HTML
const stripHtmlTags = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// Fonction pour l'envoi initial
export const sendInitialEmail = async (
  email: string,
  lastName: string,
  firstName: string,
  role: string,
  subject: string,
  link: string,
  buttonText: string
) => {
  const emailData: EmailData = {
    firstName,
    lastName,
    email,
    role,
    subject,
    link,
    buttonText,
    mainContent: `
      <p>Nous vous remercions pour la demande d'adhésion <span class="highlight">${role}</span> au sein du laboratoire IreSCoMath.</p>
      
      <p>Pour poursuivre votre démarche, veuillez ${buttonText.toLowerCase()} en cliquant sur le bouton ci-dessous :</p>
    `,
    note: "Si vous n'êtes pas à l'origine de cette demande, veuillez simplement ignorer ce message.",
  };

  await sendEmail(emailData);
};

// Fonction pour l'email après validation
export const sendMailAfterValidation = async (
  request: any,
  request_role: RequestRole,
  finalStatus: RequestStatus,
  user: { id: string; role: Role }
) => {
  const jwtSecret = process.env.JWT_SECRET_KEY;

  let emailData: EmailData;

  if (finalStatus === RequestStatus.APPROVED) {
    const token = jwt.sign(
      { email: request.email, role: request_role },
      jwtSecret!,
      { expiresIn: "24h" }
    );

    emailData = {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      role: request_role,
      subject: "Félicitations ! Votre demande a été approuvée",
      link: `http://localhost:5173/validation-confirme/${token}`,
      buttonText: "Finaliser mon inscription",
      mainContent: `
        <p>Nous avons le plaisir de vous informer que votre demande pour rejoindre le laboratoire IreSCoMath en tant que <span class="highlight">${request_role}</span> a été approuvée par notre directeur.</p>
        
        <p>Cette approbation marque le début de votre parcours avec notre équipe de recherche. Pour finaliser votre inscription et accéder à votre espace personnel, veuillez cliquer sur le bouton ci-dessous :</p>
      `,
      additionalInfo: `
        <p>Votre lien d'activation est valable pendant <span class="highlight">24 heures</span>. Au-delà de ce délai, vous devrez effectuer une nouvelle demande.</p>
        
        <p>Une fois votre compte activé, vous aurez accès à l'ensemble des ressources correspondant à votre profil au sein du laboratoire.</p>
      `,
      note: 'Si vous n\'êtes pas à l\'origine de cette demande, veuillez nous en informer à <a href="mailto:security@irescomath.com" style="color: #0066cc;">security@irescomath.com</a>.',
    };
  } else {
    emailData = {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      role: request_role,
      subject: "Information concernant votre demande",
      link: "https://localhost:5173/register",
      buttonText: "Soumettre une nouvelle demande",
      mainContent: `
        <p>Nous vous remercions pour l'intérêt que vous portez au laboratoire IreSCoMath.</p>
        
        <p>Après examen attentif de votre candidature pour le poste de <span class="highlight">${request_role}</span>, nous regrettons de vous informer que votre demande n'a pas pu être approuvée pour le moment.</p>
      `,
      additionalInfo: `
        <p>Cette décision ne reflète pas nécessairement la qualité de votre profil, mais plutôt des besoins spécifiques actuels de notre laboratoire.</p>
        
        <p>N'hésitez pas à soumettre une nouvelle demande avec des informations complémentaires ou à postuler pour un rôle différent si vous pensez qu'il correspondrait mieux à votre parcours.</p>
      `,
    };
  }

  await sendEmail(emailData);
};

// Fonction pour l'email après validation des demandes
export const sendMailAfterRequestsValidation = async (
  request: any,
  roleOfApprover: Role,
  finalStatus: RequestStatus,
  rejectReason?: string
) => {
  let user = request.user;

  // Fusion des données selon le rôle
  if (user.role == "MASTER") user = { ...user, ...user.masterStudent };
  if (user.role == "DOCTORAL") user = { ...user, ...user.doctoralStudent };
  if (user.role == "TEACHER") user = { ...user, ...user.teacherResearcher };

  const requestLink = "http://localhost:5173/demande/" + request.id;
  const isRejected = finalStatus.includes("REJECTED");

  const approverTitle =
    roleOfApprover === Role.DIRECTEUR
      ? "le directeur"
      : "votre encadrant, elle sera soumise en priorité au directeur";

  const emailData: EmailData = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email,
    subject: isRejected
      ? "Votre demande a été rejetée"
      : "Votre demande a été approuvée",
    link: requestLink,
    buttonText: "Voir ma demande",
    mainContent: `
      <p>Votre demande (#${request.id}) a été ${
      isRejected ? "rejetée" : "approuvée"
    } par ${approverTitle} ${
      rejectReason ? ". Le motif de rejet est :  " + rejectReason : ""
    }.</p>
      
      <p>Vous pouvez consulter les détails de votre demande en cliquant sur le bouton ci-dessous :</p>
    `,
    additionalInfo: isRejected
      ? "<p>Cette décision peut être due à des critères spécifiques non satisfaits. Nous vous encourageons à contacter votre encadrant pour plus de détails ou a consulter le motif de rejet.</p>"
      : "<p>Félicitations ! Votre demande a passé cette étape de validation. Vous serez informé des prochaines étapes.</p>",
  };

  await sendEmail(emailData);
};
