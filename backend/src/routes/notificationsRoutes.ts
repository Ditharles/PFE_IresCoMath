import express from "express";
import { getNotification, getNotifications, readNotification } from "../controllers/notificationsController";

const router = express.Router();

router.get("/get-notifications", getNotifications);
router.post("/get-notifications", getNotification);
router.post("/read-notifications", readNotification);

export default router;