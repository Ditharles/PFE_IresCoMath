import { PrismaClient, RequestStatus } from "../../generated/prisma";
import {
  doctoralStudentRequestFields,
  masterStudentRequestFields,
} from "../constants/userFields";

const prisma = new PrismaClient();

export type Role = "ENSEIGNANT" | "MASTER" | "DOCTORANT" | "DIRECTEUR";
export type RequestRole = "ENSEIGNANT" | "MASTER" | "DOCTORANT";

export interface Filters {
  status?: RequestStatus;
  thesisYear?: number;
  masterYear?: number;
  supervisor?: { id: string };
  thesisSupervisor?: { id: string };
  position?: string;
  email?: string;
  roleRequest?: RequestRole;
}

type RequestModel =
  | typeof prisma.teacherResearcherRequest
  | typeof prisma.masterStudentRequest
  | typeof prisma.doctoralStudentRequest;

type RoleModel = typeof prisma.teacherResearcher;

export const requestRoleMap: Record<RequestRole, RequestModel> = {
  ENSEIGNANT: prisma.teacherResearcherRequest,
  MASTER: prisma.masterStudentRequest,
  DOCTORANT: prisma.doctoralStudentRequest,
};

export const roleMap: Record<Role, RoleModel> = {
  ENSEIGNANT: prisma.teacherResearcher,
  DIRECTEUR: prisma.teacherResearcher,
  MASTER: prisma.teacherResearcher,
  DOCTORANT: prisma.teacherResearcher,
};

export const fields: Record<RequestRole, any> = {
  ENSEIGNANT: {
    id: true,
    lastName: true,
    firstName: true,
    email: true,
    position: true,
    grade: true,
    createdAt: true,
    photo: true,
    status: true,
  },
  MASTER: masterStudentRequestFields,
  DOCTORANT: doctoralStudentRequestFields,
};

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
  COMPLETED: {},
  APPROVED_BY_SUPERVISOR: {},
  APPROVED_BY_DIRECTOR: {},
  REJECTED_BY_SUPERVISOR: {},
  REJECTED_BY_DIRECTOR: {},
};

export const buildFilters = (query: any): Filters => {
  const filters: Filters = {};
  if (query.status) filters.status = query.status;
  if (query.thesisYear) filters.thesisYear = query.thesisYear;
  if (query.masterYear) filters.masterYear = query.masterYear;
  if (query.supervisor) filters.supervisor = { id: query.supervisor };
  if (query.thesisSupervisor)
    filters.thesisSupervisor = { id: query.thesisSupervisor };
  if (query.position) filters.position = query.position;
  if (query.email) filters.email = query.email;
  return filters;
};
