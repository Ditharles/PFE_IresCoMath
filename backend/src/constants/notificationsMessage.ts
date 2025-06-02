import { NotificationType } from "../../generated/prisma";

const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
export const NotificationTemplates = {
  REQUEST_RECEIVED: (requestType: string, requestId: string) => ({
    type: NotificationType.REQUEST_RECEIVED,
    title: "Demande reçue",
    message: `Votre demande d'${requestType} a été soumise avec succès. Vous serez informé(e) de la validation après l'approbation de notre directeur.`,
    url: `${frontend_url}/demande/${requestId}`,
  }),

  NEW_REQUEST_DIRECTOR: (nom: string, requestId: string, requestType?: string) => ({
    type: NotificationType.NEW_REQUEST,
    title: "Nouvelle demande",
    message: `${nom} a soumis une nouvelle demande${
      requestType ? ` de ${requestType}` : ""
    }.`,
    url: `${frontend_url}/demande/${requestId}`,
  }),

  NEW_REQUEST_SUPERVISOR: (nom: string, requestId: string, requestType?: string) => ({
    type: NotificationType.NEW_REQUEST,
    title: "Nouvelle demande",
    message: `${nom} a soumis une nouvelle demande${
      requestType ? ` de ${requestType}` : ""
    }.`,
    url: `${frontend_url}/demande/${requestId}`,
  }),

  REQUEST_APPROVED_BY_DIRECTOR: (requestId: string) => ({
    type: NotificationType.REQUEST_APPROVED,
    title: "Demande approuvée par le directeur",
    message: "Votre demande a été approuvée.",
    url: `${frontend_url}/demande/${requestId}`,
  }),
  REQUEST_APPROVED_BY_SUPERVISOR: (requestId: string) => ({
    type: NotificationType.REQUEST_APPROVED,
    title: "Demande approuvée par votre superviseur",
    message:
      "Votre demande a été approuvée par votre superviseur au sein du laboratoire en attente d'une approbation du directeur.",
    url: `${frontend_url}/demande/${requestId}`,
  }),

  REQUEST_REJECTED_BY_DIRECTOR: (requestId: string, raison?: string) => ({
    type: NotificationType.REQUEST_REJECTED,
    title: "Demande rejetée par le directeur",
    message: `Votre demande a été rejetée.${
      raison ? " Raison : " + raison : ""
    }`,
    url: `${frontend_url}/demande/${requestId}`,
  }),
  REQUEST_REJECTED_BY_SUPERVISOR: (requestId: string, raison?: string) => ({
    type: NotificationType.REQUEST_REJECTED,
    title: "Demande rejetée par votre superviseur",
    message: `Votre demande a été rejetée par votre superviseur au sein du laboratoire.${
      raison ? " Raison : " + raison : ""
    }`,
    url: `${frontend_url}/demande/${requestId}`,
  }),

  GENERAL: (message: string, url: string) => ({
    type: NotificationType.OTHER,
    title: "Notification",
    message,
    url
  }),
  REQUEST_REIGNITED_BY_USER: (requestId: string) => ({
    type: NotificationType.OTHER,
    title: "Relance de demande",
    message: `Vous n'avez pas fini le  de la demande  #${requestId} .`,
    url: `${frontend_url}/demande/${requestId}`,
  }),

  REQUEST_REIGNITED_BY_DIRECTOR: (requestId: string) => ({
    type: NotificationType.OTHER,
    title: "Relance de demande",
    message: `Le directeur vous invite a poursuivre la demande #${requestId} .`,
    url: `${frontend_url}/demande/${requestId}`,
  }),
  DOCUMENTS_ADDED: (requestId: string) => ({
    type: NotificationType.OTHER,
    title: "Documents ajoutés",
    message: `Les documents ont été ajoutés à votre demande #${requestId}.`,
    url: `${frontend_url}/demande/${requestId}`,
  }),

  REQUEST_COMPLETED: (requestId: string) => ({
    type: NotificationType.REQUEST_COMPLETED,
    title: "Demande complétée",
    message: `La demande  #${requestId} a été marquée comme complétée.`,
    url: `${frontend_url}/demande/${requestId}`,
  }),

  REQUEST_CLOSED: (requestId: string) => ({
    type: NotificationType.REQUEST_CLOSED,
    title: "Demande clôturée",
    message: `La demande #${requestId} a été marquée comme clôturée.`,
    url: `${frontend_url}/demande/${requestId}`,
  }),
};
