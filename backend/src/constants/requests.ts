import { title } from "process";
import { RequestType } from "../../generated/prisma";
import { userFields } from "./userFields";

export const requestFields = {
  id: true,
  type: true,
  status: true,
  createdAt: true,
  notes: true,
  awaitForm: true,
  signForm: true,
  user: {
    select: {
      id: true,

      role: true,
    },
  },
  purchaseRequest: {
    select: {
      id: true,
      equipmentType: true,
      name: true,
      quantity: true,
      url: true,
      photo: true,
      specifications: true,
      costEstimation: true,
    },
  },
  loanRequest: {
    select: {
      id: true,
      quantity: true,
      startDate: true,
      endDate: true,
      equipment: {
        select: {
          id: true,
          name: true,
          category: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
  },
  stage: {
    select: {
      id: true,
      organization: true,
      organizationEmail: true,
      organizationUrl: true,
      supervisor: true,
      supervisorEmail: true,
      supervisorPhone: true,
      letter: true,
      country: true,
      startDate: true,
      endDate: true,
    },
  },
  mission: {
    select: {
      id: true,
      hostOrganization: true,
      objective: true,
      country: true,
      startDate: true,
      endDate: true,
      specificDocument: true,
      document: true,
    },
  },
  scientificEvent: {
    select: {
      id: true,
      location: true,
      urlEvent: true,
      mailAcceptation: true,
      title: true,
      articlesAccepted: true,
      articleCover: true,
      startDate: true,
      endDate: true,
    },
  },
  articleRegistration: {
    select: {
      title: true,
      id: true,
      conference: true,
      urlConference: true,
      articleCover: true,
      amount: true,
    },
  },
};

export const extendRequestFields = {
  ...requestFields,
  user: {
    select: userFields,
  },
};

export const requestRelationFieldByType = {
  [RequestType.MISSION]: "mission",
  [RequestType.INTERNSHIP]: "stage",
  [RequestType.CONFERENCE_NATIONAL]: "scientificEvent",
  [RequestType.EQUIPMENT_PURCHASE]: "purchaseRequest",
  [RequestType.EQUIPMENT_LOAN]: "loanRequest",
  [RequestType.ARTICLE_REGISTRATION]: "articleRegistration",
  [RequestType.REPAIR_MAINTENANCE]: "repairMaintenanceRequest",
};



export const allowedFieldsByType: Record<RequestType, string[]> = {
  [RequestType.EQUIPMENT_PURCHASE]: [
    "equipmentType", "name", "url", "quantity", "photo", "specifications", "costEstimation"
  ],
  [RequestType.EQUIPMENT_LOAN]: [
    "categoryId", "equipmentId", "quantity", "startDate", "endDate"
  ],
  [RequestType.REPAIR_MAINTENANCE]: [
    "description", "photos"
  ],
  [RequestType.INTERNSHIP]: [
    "organization", "organizationEmail", "organizationUrl",
    "supervisor", "supervisorEmail", "supervisorPhone",
    "letter", "country", "startDate", "endDate"
  ],
  [RequestType.MISSION]: [
    "hostOrganization", "objective", "country", "startDate", "endDate", "specificDocument", "document"
  ],
  [RequestType.CONFERENCE_NATIONAL]: [
    "location", "urlEvent", "mailAcceptation", "title",
    "articlesAccepted", "articleCover", "startDate", "endDate"
  ],
  [RequestType.ARTICLE_REGISTRATION]: [
    "title", "conference", "urlConference", "articleCover", "amount"
  ],
}
