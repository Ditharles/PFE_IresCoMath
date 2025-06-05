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
  ExtendedUser,
} from "../types/auth";
import transporter from "../utils/mailer";

import { generateRandomToken } from "../utils/authUtils";
import {
  masterStudentFields,
  teacherResearcherFields,
  doctoralStudentFields,
  userFields,
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

export const createSession = async (
  userId: string,
  browserInfo: { browserName: string; browserVersion: string },
  ipAddress: string
) => {
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
          browserName: browserInfo.browserName,
          browserVersion: browserInfo.browserVersion,
          ipAddress,
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
        password: string;
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
          password: req.password,
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
        password: string;

        firstName: string;
        email: string;
        thesisYear: number | string;
        thesisSupervisorId: string;
        photo: string;
      };

      return prisma.doctoralStudentRequest.create({
        data: {
          cin: req.cin,
          phone: req.phone,
          lastName: req.lastName,
          firstName: req.firstName,
          email: req.email,
          password: req.password,
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
        password: string;

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
          password: req.password,
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
  return await prisma.user.create({
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
  return prisma.doctoralStudent.create({
    data: {
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
  return prisma.masterStudent.create({
    data: {
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
    data: {
      institution: data.institution,
      position: data.position,
      grade: data.grade,
      user: { connect: { id: userId } },
    },
  });
};

export const getSupervisor = async (
  email?: string,
  id?: string
): Promise<User | null> => {
  if (email) {
    const found = await prisma.user.findFirst({
      where: { email },
    });
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

export const getUserByID = async (
  id: string,
  requesterRole?: Role
): Promise<ExtendedUser | null> => {
  const teacherFieldsMapRequesterRole = {
    MASTER: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      admin: true,
    },
    DOCTORANT: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      admin: true,
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
      firstName: true,
      lastName: true,
      photo: true,
      phone: true,
      cin: true,
      createdAt: true,
      admin: true,
      masterStudent: { select: masterStudentFields },
      teacherResearcher:
        requesterRole && teacherFieldsMapRequesterRole[requesterRole]
          ? { select: teacherFieldsMapRequesterRole[requesterRole] }
          : { select: teacherResearcherFields },
      doctoralStudent: { select: doctoralStudentFields },
    },
  });

  if (!user) return null;

  if (user.role === Role.MASTER && user.masterStudent) {
    const supervisor = await prisma.user.findFirst({
      where: {
        teacherResearcher: {
          id: user.masterStudent.supervisorId,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });
    return {
      userId: user.id,
      id: user.masterStudent.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
      phone: user.phone,
      cin: user.cin,
      createdAt: user.createdAt,
      masterYear: user.masterStudent.masterYear,
      supervisorId: user.masterStudent.supervisorId,
      supervisor: supervisor,
    };
  }

  if (user.role === Role.DOCTORANT && user.doctoralStudent) {
    const thesisSupervisor = await prisma.user.findFirst({
      where: {
        teacherResearcher: {
          id: user.doctoralStudent.thesisSupervisorId,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });
    return {
      userId: user.id,
      id: user.doctoralStudent.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
      phone: user.phone,
      cin: user.cin,
      createdAt: user.createdAt,
      thesisYear: user.doctoralStudent.thesisYear,
      thesisSupervisorId: user.doctoralStudent.thesisSupervisorId,
      thesisSupervisor: thesisSupervisor,
    };
  }

  return {
    userId: user.id,
    id:
      user.doctoralStudent?.id ??
      user.masterStudent?.id ??
      user.teacherResearcher?.id ??
      "",
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    photo: user.photo,
    phone: user.phone,
    cin: user.cin,
    createdAt: user.createdAt,
  };
};

export const getDirector = async (): Promise<User | null> => {
  return await prisma.user.findFirst({ where: { role: Role.DIRECTEUR } });
};

export const checkSupervisorExists = async (id: string) => {
  const supervisor = await prisma.user.findFirst({
    where: {
      OR: [{ id }, { teacherResearcher: { id } }],
    },
  });
  if (!supervisor) {
    throw new Error("Encadrant ou directeur de thèse non existant");
  }
  return supervisor;
};

export const getUserSessions = async (userId: string) => {
  return await prisma.session.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      browserName: true,
      browserVersion: true,
      ipAddress: true,
      createdAt: true,
      accessToken: true,
      refreshToken: true,
    },
  });
};
