import express, { RequestHandler } from "express";

import { verifyToken } from "../middleware/verifyToken";
import {
  confirmRequest,
  validateAccount,
  resendConfirmLink,
  resendConfirmLinkWithMail,
  submitAdditionalInfo,
} from "../controllers/auth/confirm.controller";
import { login } from "../controllers/auth/login.controller";
import {
  logout,
  refreshToken,
  logoutSession,
} from "../controllers/auth/other.controller";
import {
  changePassword,
  forgetPassword,
  confirmResetPassword,
  resetPassword,
} from "../controllers/auth/password.controller";
import {
  registerTeacherResearcher,
  registerDoctoralStudent,
  registerMasterStudent,
} from "../controllers/auth/register.controller";
import { getUser } from "../controllers/auth/other.controller";
import { getUserSessions } from "../services/auth.service";

const router = express.Router();
// Routes d'inscription
router.post(
  "/register/enseignant",
  registerTeacherResearcher as RequestHandler
);
router.post("/register/doctorant", registerDoctoralStudent as RequestHandler);
router.post("/register/master", registerMasterStudent as RequestHandler);

// Routes de confirmation
router.get("/confirm-request/:token", confirmRequest as RequestHandler);

// Routes de validation de compte
router.get("/validate-account/:token", validateAccount as RequestHandler);

// Routes de connexion et déconnexion
router.post("/login", login as RequestHandler);
router.get("/logout", logout as RequestHandler);

// Routes de gestion de confirmation
router.get("/resend-confirmation-link", resendConfirmLink as RequestHandler);
router.post(
  "/resend-confirmation-link",
  resendConfirmLinkWithMail as RequestHandler
);

// Routes de gestion de mot de passe
router.post(
  "/change-password",
  verifyToken as RequestHandler,
  changePassword as RequestHandler
);
router.post("/forgot-password", forgetPassword as RequestHandler);
router.get(
  "/confirm-reset-password/:token",
  confirmResetPassword as RequestHandler
);
router.post("/reset-password/:token", resetPassword as RequestHandler);

// Routes de rafraîchissement et de fermeture de session
router.post("/refresh-token", refreshToken as RequestHandler);
router.get(
  "/sessions",
  verifyToken as RequestHandler,
  getUserSessions as RequestHandler
);
router.delete(
  "/sessions/:sessionId",
  verifyToken as RequestHandler,
  logoutSession as RequestHandler
);

// Routes supplémentaires
router.post(
  "/submit-additional-info/:token",
  submitAdditionalInfo as RequestHandler
);

// Routes de l'utilisateur
router.get("/me", verifyToken as RequestHandler, getUser as RequestHandler);

export default router;
