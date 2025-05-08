import express from "express";
import {
  getNotification,
  getNotifications,
  getUnreadNumberNotifications,
  readAllNotifications,
  readNotification,
} from "../controllers/notificationsController";
import { get } from "http";

const router = express.Router();

router.get("/get-notifications", getNotifications);
router.get("/get-notification", getNotification);
router.get("/read-notification/:id", readNotification);
router.get("/read-all-notifications", readAllNotifications);
router.get("/get-unread-number-notifications", getUnreadNumberNotifications);
export default router;
