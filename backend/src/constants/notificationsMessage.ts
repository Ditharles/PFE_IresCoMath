import { NotificationType } from "../../generated/prisma";

export const NotificationTemplates = {
  REQUEST_RECEIVED: (requestType: string) => ({
    type: NotificationType.REQUEST_RECEIVED,
    title: "Demande reçue",
    message: `Votre demande d'${requestType} a été soumise avec succès. Vous serez informé(e) de la validation après l'approbation de notre directeur.`,
  }),

  NEW_REQUEST_DIRECTOR: (nom: string, requestType?: string) => ({
    type: NotificationType.NEW_REQUEST,
    title: "Nouvelle demande",
    message: `${nom} a soumis une nouvelle demande${requestType ? ` de ${requestType}` : ""}.`,
  }),

  NEW_REQUEST_SUPERVISOR: (nom: string, requestType?: string) => ({
    type: NotificationType.NEW_REQUEST,
    title: "Nouvelle demande",
    message: `${nom} a soumis une nouvelle demande${requestType ? ` de ${requestType}` : ""}.`,
  }),

  REQUEST_APPROVED_BY_DIRECTOR: {
    type: NotificationType.REQUEST_APPROVED,
    title: "Demande approuvée par le directeur",
    message: "Votre demande a été approuvée.",
  },
  REQUEST_APPROVED_BY_SUPERVISOR: {
    type: NotificationType.REQUEST_APPROVED,
    title: "Demande approuvée par votre superviseur",
    message: "Votre demande a été approuvée par votre superviseur au sein du laboratoire en attente d'une approbation du directeur.",
  },

  REQUEST_REJECTED_BY_DIRECTOR: (raison?: string) => ({
    type: NotificationType.REQUEST_REJECTED,
    title: "Demande rejetée par le directeur",
    message: `Votre demande a été rejetée.${raison ? " Raison : " + raison : ""}`,
  }),
  REQUEST_REJECTED_BY_SUPERVISOR: (raison?: string) => ({
    type: NotificationType.REQUEST_REJECTED,
    title: "Demande rejetée par votre superviseur",
    message: `Votre demande a été rejetée par votre superviseur au sein du laboratoire.${raison ? " Raison : " + raison : ""}`,
  }),

  GENERAL: (message: string) => ({
    type: NotificationType.OTHER,
    title: "Notification",
    message,
  }),
};
