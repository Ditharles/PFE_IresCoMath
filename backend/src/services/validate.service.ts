import { PrismaClient, RequestStatus } from "../../generated/prisma";
import jwt from "jsonwebtoken";
import {
  fields,
  Filters,
  RequestRole,
  requestRoleMap,
  Role,
  roleMap,
} from "../utils/validateUtils";
import transporter from "../utils/mailer";

const prisma = new PrismaClient();

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
        masterStudentRequests: {
          select: fields.MASTER,
          where: filters,
        },
        doctoralStudentRequests: {
          select: fields.DOCTORANT,
          where: filters,
        },
      },
    });

    if (!roleRequest) {
      data.requests = requests;
    } else if (roleRequest === "MASTER") {
      data.masterStudentRequests = requests?.masterStudentRequests;
    } else if (roleRequest === "DOCTORANT") {
      data.doctoralStudentRequests = requests?.doctoralStudentRequests;
    }
  } else {
    for (const [key, value] of Object.entries(requestRoleMap)) {
      const typedKey = key as RequestRole;
      data[typedKey] = await (value as any).findMany({
        where: filters,
        select: fields[typedKey],
      });
    }
  }

  return data;
};

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

    linkUrl = `http://localhost:5173/validation-confirme/${token}`;

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
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>${subject}</title>
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
                    <h1>${subject}</h1>
                  </td>
                </tr>
                
                <!-- Contenu -->
                <tr>
                  <td class="content">
                    <p>Bonjour ${request.firstName} ${request.lastName},</p>
                    
                    ${mainContent}
                    
                    <!-- Bouton -->
                    <div class="button-container">
                      <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${linkUrl}" style="height:45px;v-text-anchor:middle;width:240px;" arcsize="10%" stroke="f" fillcolor="#0066cc">
                        <w:anchorlock/>
                        <center>
                      <![endif]-->
                      <a href="${linkUrl}" class="button">${buttonText}</a>
                      <!--[if mso]>
                        </center>
                      </v:roundrect>
                      <![endif]-->
                    </div>
                    
                    ${additionalInfo}
                    
                    <table role="presentation" class="note" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p><strong>Remarque :</strong> Si vous n'êtes pas à l'origine de cette demande, veuillez simplement ignorer ce message et nous en informer à <a href="mailto:security@irescomath.com" style="color: #0066cc;">security@irescomath.com</a>.</p>
                        </td>
                      </tr>
                    </table>
                    
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
      </html>
    `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: request.email,
    subject: subject,
    html: htmlContent,
    text: `${subject}\n\nBonjour ${request.firstName} ${request.lastName},\n\n${
      finalStatus === RequestStatus.APPROVED
        ? `Votre demande pour rejoindre le laboratoire IreSCoMath en tant que ${request_role} a été approuvée. Pour finaliser votre inscription, veuillez visiter le lien suivant (valable 24h): ${linkUrl}`
        : `Après examen de votre candidature pour le poste de ${request_role}, nous regrettons de vous informer que votre demande n'a pas pu être approuvée pour le moment.`
    }\n\nCordialement,\nL'équipe IreSCoMath`,
  });
};
