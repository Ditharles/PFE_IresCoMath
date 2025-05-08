import { requestFields } from "../constants/requests";
import prisma from "../utils/db";

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
console.log(request);
  return request;
};
