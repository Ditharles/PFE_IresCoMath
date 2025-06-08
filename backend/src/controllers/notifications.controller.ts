import { Response } from "express";
import { ERROR_MESSAGES } from "../utils/authUtils";
import prisma from "../utils/db";
import { NotificationStatus } from "../../generated/prisma";
import logger from "../logger";

export const getNotifications = async (req: any, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.userId },
    });

    res.status(200).json(notifications);
  } catch (error) {
    logger.error(
      { context: "GET_NOTIFICATIONS", error, userId: req.user.userId },
      "Erreur lors de la récupération des notifications"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getNotification = async (req: any, res: Response) => {
  try {
    const notification = await prisma.notification.findUnique({
      where: { id: req.params.id },
    });
    if (!notification) {
      logger.warn(
        { context: "GET_NOTIFICATION", notificationId: req.params.id },
        "Notification introuvable"
      );
    }
    res.status(200).json(notification);
  } catch (error) {
    logger.error(
      { context: "GET_NOTIFICATION", error, notificationId: req.params.id },
      "Erreur lors de la récupération d'une notification"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const readNotification = async (req: any, res: Response) => {
  try {
    const notification = await prisma.notification.update({
      where: { id: req.params.id },
      data: { status: NotificationStatus.READ },
    });
    logger.info(
      {
        context: "READ_NOTIFICATION",
        notificationId: req.params.id,
        userId: req.user.userId,
      },
      "Notification marquée comme lue"
    );
    res.status(200).json(notification);
  } catch (error) {
    logger.error(
      { context: "READ_NOTIFICATION", error, notificationId: req.params.id },
      "Erreur lors du marquage de la notification comme lue"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const readAllNotifications = async (req: any, res: Response) => {
  try {
    const notifications = await prisma.notification.updateMany({
      where: { userId: req.user.userId },
      data: { status: NotificationStatus.READ },
    });
    logger.info(
      {
        context: "READ_ALL_NOTIFICATIONS",
        userId: req.user.userId,
        count: notifications.count,
      },
      "Toutes les notifications marquées comme lues"
    );
    res.status(200).json(notifications);
  } catch (error) {
    logger.error(
      { context: "READ_ALL_NOTIFICATIONS", error, userId: req.user.userId },
      "Erreur lors du marquage de toutes les notifications comme lues"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getUnreadNumberNotifications = async (req: any, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.userId, status: NotificationStatus.UNREAD },
    });
    logger.debug(
      {
        context: "GET_UNREAD_NOTIFICATIONS_COUNT",
        userId: req.user.userId,
        count: notifications.length,
      },
      "Récupération du nombre de notifications non lues"
    );
    res.status(200).json(notifications.length);
  } catch (error) {
    logger.error(
      {
        context: "GET_UNREAD_NOTIFICATIONS_COUNT",
        error,
        userId: req.user.userId,
      },
      "Erreur lors de la récupération du nombre de notifications non lues"
    );
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
