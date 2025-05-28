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

export const createUser = async (
  email: string,
  role: Role,
  password: string,
  firstName: string,
  lastName: string,
  cin: string,
  phone: string,
  photo: string | null = null
): Promise<User> => {
  return prisma.user.create({
    data: {
      email,
      role,
      password,
      firstName,
      lastName,
      cin,
      phone,
      photo: null,
    },
  });
};

export const createDoctoralStudent = async (
  data: DoctoralStudentRequest,
  userId: string
) => {
  const {
    thesisSupervisorId,
    thesisYear,
    firstName,
    lastName,
    cin,

    ...rest
  } = data;
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
  const { supervisorId, firstName, lastName, cin, ...rest } = data;
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
  const { firstName, lastName, cin, ...rest } = data;
  return prisma.teacherResearcher.create({
    data: { ...rest, userId },
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

export const getUserByID = async (id: string, requesterRole?: Role) => {
  const teacherFieldsMapRequesterRole = {
    MASTER: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      admin:true,
    },
    DOCTORANT: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      admin:true,
    },
    ENSEIGNANT: teacherResearcherFields,
    DIRECTEUR: teacherResearcherFields,
    ADMIN: teacherResearcherFields,
  };
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
      admin: true,
      masterStudent: { select: masterStudentFields },
      teacherResearcher: {
        select:
          requesterRole && teacherFieldsMapRequesterRole[requesterRole]
            ? teacherFieldsMapRequesterRole[requesterRole]
            : teacherResearcherFields,
      },
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
