import { Response } from "express";
import { ERROR_MESSAGES } from "../utils/authUtils";
import prisma from "../utils/db";
import { NotificationStatus } from "../../generated/prisma";

export const getNotifications = async (req: any, res: Response) => {
  try {
   
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.userId },
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getNotification = async (req: any, res: Response) => {
  try {
    const notification = await prisma.notification.findUnique({
      where: { id: req.params.id },
    });
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const readNotification = async (req: any, res: Response) => {
  try {
    const notification = await prisma.notification.update({
      where: { id: req.params.id },
      data: { status: NotificationStatus.READ },
    });
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const readAllNotifications = async (req: any, res: Response) => {
  try {
    const notifications = await prisma.notification.updateMany({
      where: { userId: req.user.userId },
      data: { status: NotificationStatus.READ },
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export const getUnreadNumberNotifications = async (req: any, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.userId, status: NotificationStatus.UNREAD },
    });
    res.status(200).json(notifications.length);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};
