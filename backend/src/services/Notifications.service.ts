import { NotificationType } from "../../generated/prisma";
import prisma from "../utils/db";
type CreateNotificationInput = {
  userId: string;
  titre: string;
  message: string;
  type: NotificationType;
};

class NotificationsService {
  createNotification = async ({
    userId,
    titre,
    message,
    type,
  }: CreateNotificationInput) => {
    try {
      await prisma.notification.create({
        data: {
          userId,
          titre,
          message,
          type,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création de la notification :", error);
    }
  };

  async getNotifications() {}
}

export default new NotificationsService();