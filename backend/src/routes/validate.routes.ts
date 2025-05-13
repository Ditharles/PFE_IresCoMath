import express, { RequestHandler } from "express";
import {
  getRequestInfo,
  getWaitingList,
  validateRequest,
  resendValidationMail,
} from "../controllers/validate.controller";
import { checkRole } from "../middleware/checkRole";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// Route pour obtenir les requêtes en attente
router.get(
  "/get-waiting-list",
  verifyToken as RequestHandler,
  checkRole(["ADMIN", "ENSEIGNANT", "DIRECTEUR"]),
  getWaitingList as RequestHandler
);

// Route pour valider une requête
router.post(
  "/validate-request",
  verifyToken as RequestHandler,
  checkRole(["DIRECTEUR"]),
  validateRequest as RequestHandler
);

// Route pour obtenir les informations d'une requête
router.get(
  "/get-request-info",
  verifyToken as RequestHandler,
  checkRole(["ADMIN", "ENSEIGNANT", "DIRECTEUR"]),
  getRequestInfo as RequestHandler
);

// Route pour renvoyer l'email de validation
router.post(
  "/resend-validation-mail",
  verifyToken as RequestHandler,
  checkRole(["ADMIN", "DIRECTEUR"]),
  resendValidationMail as RequestHandler
);

export default router;
