import express from "express";
import {
  getRequestInfo,
  getWaitingList,
  validateRequest,
} from "../controllers/validateController";
import { checkRole } from "../middleware/checkRole";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get(
  "/getWaitingRequests",
  verifyToken,
  checkRole(["admin", "enseignant"]),
  getWaitingList
);

router.post(
  "/validateRequest",
  verifyToken,
  checkRole(["admin", "enseignant"]),
  validateRequest
);

router.get(
  "/getInfo",
  verifyToken,
  checkRole(["admin", "enseignant"]),
  getRequestInfo
);

export default router;
