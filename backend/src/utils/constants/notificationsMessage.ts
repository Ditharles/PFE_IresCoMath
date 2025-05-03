import { NotificationType } from "../../../generated/prisma";

export const NotificationTemplates = {
  DEMANDE_REÇUE: (requestType: string) => ({
    type: NotificationType.DEMANDE_REÇUE,
    titre: "Demande reçue",
    message: `Votre demande d'${requestType} a été soumise avec succès. Vous serez informé(e) de la validation après l'approbation de notre directeur.`,
  }),
  DIRECTOR_NEW_REQUEST: (nom: string, requestType?: string) => ({
    type: NotificationType.NOUVELLE_DEMANDE,
    titre: "Nouvelle demande",
    message: `${nom} a soumis une nouvelle demande${
      requestType ? ` de ${requestType}` : ""
    }.`,
  }),
  SUPERVISOR_NEW_REQUEST: (nom: string, requestType?: string) => ({
    type: NotificationType.NOUVELLE_DEMANDE,
    titre: "Nouvelle demande",
    message: `${nom} a soumis une nouvelle demande${
      requestType ? ` de ${requestType}` : ""
    }.`,
  }),
  REQUEST_APPROVED: {
    type: NotificationType.DEMANDE_ACCEPTEE,
    titre: "Demande approuvée",
    message: "Votre demande a été approuvée.",
  },
  REQUEST_REJECTED: (raison?: string) => ({
    type: NotificationType.DEMANDE_REJETEE,
    titre: "Demande rejetée",
    message: `Votre demande a été rejetée.${
      raison ? " Raison : " + raison : ""
    }`,
  }),
  GENERAL: (message: string) => ({
    type: NotificationType.AUTRE,
    titre: "Notification",
    message,
  }),
};
