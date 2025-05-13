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

