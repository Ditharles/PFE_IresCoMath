import {
  PrismaClient,
  Role,
  RequestStatus,
  User,
  Grade,
} from "../../generated/prisma";
import {
  DoctoralStudentRequest,
  MasterStudentRequest,
  TeacherResearcherRequest,
  UserRequest,
} from "../types/auth";
import transporter from "../utils/mailer";

import { generateRandomToken } from "../utils/authUtils";
import {
  masterStudentFields,
  teacherResearcherFields,
  doctoralStudentFields,
} from "../constants/userFields";
import prisma from "../utils/db";

export const roleMap = {
  ADMIN: prisma.admin,
  ENSEIGNANT: prisma.teacherResearcher,
  DOCTORANT: prisma.doctoralStudent,
  MASTER: prisma.masterStudent,
};

export const requestRoleMap = {
  ENSEIGNANT: prisma.teacherResearcherRequest,
  DOCTORANT: prisma.doctoralStudentRequest,
  MASTER: prisma.masterStudentRequest,
};

export const createSession = async (userId: string) => {
  let accessTokenValue = "",
    refreshTokenValue = "";
  let sessionCreated = false;

  while (!sessionCreated) {
    accessTokenValue = generateRandomToken(64);
    refreshTokenValue = generateRandomToken(64);
    try {
      await prisma.session.create({
        data: {
          accessToken: accessTokenValue,
          refreshToken: refreshTokenValue,
          userId,
          deviceInfo: "web",
        },
      });
      sessionCreated = true;
    } catch (error: any) {
      if (!error.message?.includes("Unique constraint failed")) {
        throw error;
      }
    }
  }

  return { accessTokenValue, refreshTokenValue };
};

export const checkUserExists = async (email: string): Promise<boolean> => {
  for (const roleTable of Object.values(requestRoleMap)) {
    const user = await (roleTable as any).findUnique({ where: { email } });
    if (user) return true;
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  return !!existingUser;
};

export const createUserRequest = async (role: string, data: unknown) => {
  switch (role) {
    case "ENSEIGNANT": {
      const req = data as {
        cin: string;
        phone: string;
        lastName: string;
        firstName: string;
        email: string;
        position: string;
        grade: string;
        institution: string;
        photo?: string;
      };

      return prisma.teacherResearcherRequest.create({
        data: {
          cin: req.cin,
          phone: req.phone,
          lastName: req.lastName,
          firstName: req.firstName,
          email: req.email,
          position: req.position,
          grade: req.grade as Grade,
          institution: req.institution,
          photo: req.photo || null,
          status: RequestStatus.PENDING,
          isConfirmed: false,
          rejectionReason: null,
          createdAt: new Date(),
        },
      });
    }

    case "DOCTORANT": {
      const req = data as {
        cin: string;
        phone: string;
        lastName: string;
        firstName: string;
        email: string;
        thesisYear: number | string;
        thesisSupervisorId: string;
        photo?: string;
      };

      return prisma.doctoralStudentRequest.create({
        data: {
          cin: req.cin,
          phone: req.phone,
          lastName: req.lastName,
          firstName: req.firstName,
          email: req.email,
          thesisYear: Number(req.thesisYear),
          thesisSupervisor: { connect: { id: req.thesisSupervisorId } },
          photo: req.photo || null,
          status: RequestStatus.PENDING,
          isConfirmed: false,
          rejectionReason: null,
          createdAt: new Date(),
        },
      });
    }

    case "MASTER": {
      const req = data as {
        cin: string;
        phone: string;
        lastName: string;
        firstName: string;
        email: string;
        masterYear: number | string;
        supervisorId: string;
        photo?: string;
      };

      return prisma.masterStudentRequest.create({
        data: {
          cin: req.cin,
          phone: req.phone,
          lastName: req.lastName,
          firstName: req.firstName,
          email: req.email,
          masterYear: Number(req.masterYear),
          supervisor: { connect: { id: req.supervisorId } },
          photo: req.photo || null,
          status: RequestStatus.PENDING,
          isConfirmed: false,
          rejectionReason: null,
          createdAt: new Date(),
        },
      });
    }

    default:
      throw new Error("Role invalide");
  }
};

export const sendEmail = async (
  email: string,
  lastName: string,
  firstName: string,
  role: string,
  subject: string,
  link: string,
  buttonText: string
) => {
  const emailData = {
    from: process.env.EMAIL_USER || "",
    to: email,
    subject,
    html: `<p<!DOCTYPE html>
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
              <p>Bonjour ${firstName} ${lastName},</p>
              
              <p>Nous vous remercions pour votre demande concernant le poste de <span class="highlight">${role}</span> au sein du laboratoire IreSCoMath.</p>
              
              <p>Pour poursuivre votre démarche, veuillez ${buttonText.toLowerCase()} en cliquant sur le bouton ci-dessous :</p>
              
              <!-- Bouton -->
              <div class="button-container">
                <!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${link}" style="height:45px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="#0066cc">
                  <w:anchorlock/>
                  <center>
                <![endif]-->
                <a href="${link}" class="button">${buttonText}</a>
                <!--[if mso]>
                  </center>
                </v:roundrect>
                <![endif]-->
              </div>
              
              <p>Si vous n'êtes pas à l'origine de cette demande, veuillez simplement ignorer ce message.</p>
              
              <p>Pour toute question complémentaire, notre équipe reste à votre disposition à l'adresse <a href="mailto:support@irescomath.com" style="color: #0066cc;">support@irescomath.com</a>.</p>
              
              <p>Cordialement,<br>L'équipe IreSCoMath</p>
            </td>
          </tr>
          
          <!-- Pied de page -->
          <tr>
            <td class="footer">
              <p>&copy; 2025 - Laboratoire IreSCoMath. Tous droits réservés.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };

  await transporter.sendMail(emailData);
};

export const createUser = async (
  email: string,
  role: Role,
  password: string
): Promise<User> => {
  return prisma.user.create({
    data: { email, role, password },
  });
};

export const createDoctoralStudent = async (
  data: DoctoralStudentRequest,
  userId: string
) => {
  const { thesisSupervisorId, thesisYear, ...rest } = data;
  return prisma.doctoralStudent.create({
    data: {
      ...rest,
      thesisYear: Number(data.thesisYear),
      user: { connect: { id: userId } },
      thesisSupervisor: { connect: { id: data.thesisSupervisorId } },
    },
  });
};

export const createMasterStudent = async (
  data: MasterStudentRequest,
  userId: string
) => {
  const { supervisorId, ...rest } = data;
  return prisma.masterStudent.create({
    data: {
      ...rest,
      masterYear: Number(data.masterYear),
      user: { connect: { id: userId } },
      supervisor: { connect: { id: data.supervisorId } },
    },
  });
};

export const createTeacherResearcher = async (
  data: TeacherResearcherRequest,
  userId: string
) => {
  return prisma.teacherResearcher.create({
    data: { ...data, userId },
  });
};

export const getSupervisor = async (
  email?: string,
  id?: string
): Promise<User | null> => {
  if (email) {
    const found = await prisma.user.findFirst({ where: { email } });
    if (found) return found;
  }

  if (id) {
    return await prisma.user.findFirst({
      where: {
        teacherResearcher: {
          masterStudents: { some: { id } },
        },
      },
    });
  }

  return null;
};

export const getUserByID = async (id: string) => {
  let user = await prisma.user.findFirst({
    where: {
      OR: [
        { id },
        { teacherResearcher: { id } },
        { doctoralStudent: { id } },
        { masterStudent: { id } },
      ],
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      admin: { select: { lastName: true, firstName: true } },
      masterStudent: { select: masterStudentFields },
      teacherResearcher: { select: teacherResearcherFields },
      doctoralStudent: { select: doctoralStudentFields },
    },
  });

  if (!user) return null;

  return {
    userId: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    ...user.admin,
    ...user.masterStudent,
    ...user.teacherResearcher,
    ...user.doctoralStudent,
  };
};

export const getDirector = async (): Promise<User | null> => {
  return await prisma.user.findFirst({ where: { role: Role.DIRECTEUR } });
};

export const checkSupervisorExists = async (id: string) => {
  const supervisor = await prisma.teacherResearcher.findUnique({
    where: { id },
  });
  if (!supervisor) {
    throw new Error("Encadrant ou directeur de thèse non existant");
  }
  return supervisor;
};
