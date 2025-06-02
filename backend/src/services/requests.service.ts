import { extendRequestFields, requestFields } from "../constants/requests";
import {
  PrismaClient,
  RequestType,
  RequestStatus,
  Prisma,
} from "../../generated/prisma";
import { AuthRequest } from "../types/auth";
import { validateRequestBody, ERROR_MESSAGES } from "../utils/authUtils";
import { sendRequestNotifications } from "../utils/notificationUtils";

const prisma = new PrismaClient();

interface SubmitRequestOptions {
  type: RequestType;
  userId: string;
  notes?: string | null;
  data: any;
  requiredFields: string[];
  createSpecificRequest: (requestId: string, data: any) => Promise<any>;
  successMessage: string;
}

export const submitRequest = async (
  req: AuthRequest,

  options: SubmitRequestOptions
) => {
  const { type, data, requiredFields, createSpecificRequest, successMessage } =
    options;

  if (!validateRequestBody(data, requiredFields)) {
    return {
      status: 400,
      message: ERROR_MESSAGES.MISSING_FIELDS,
    };
  }

  try {
    const request = await prisma.request.create({
      data: {
        type,
        userId: req.user.userId,
        notes: data.notes || null,
        status: RequestStatus.PENDING,
      },
    });

    const specificRequest = await createSpecificRequest(request.id, data);

    await sendRequestNotifications(req.user, successMessage);
    return {
      status: 201,
      message: "La demande a bien été soumise",
    };
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        status: 400,
        message: "Cette demande existe deja",
      };
    }

    return {
      status: 500,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
    };
  }
};

export const getRequestById = async (requestId: string) => {
  const request = await prisma.request.findFirst({
    where: {
      OR: [
        { id: requestId },
        { purchaseRequest: { id: requestId } },
        { loanRequest: { id: requestId } },
        { stage: { id: requestId } },
        { mission: { id: requestId } },
        { scientificEvent: { id: requestId } },
        { articleRegistration: { id: requestId } },
      ],
    },
    select: requestFields,
  });

  return request;
};
