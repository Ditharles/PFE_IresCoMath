import express, { RequestHandler } from "express";
import {
  login,
  confirmRequest,
  submitAdditionalInfo,
  logout,
  resendConfirmLinkWithMail,
  resendConfirmLink,
  changePassword,
  forgetPassword,
  confirmResetPassword,
  resetPassword,
  validateAccount,
  refreshToken,
  registerDoctoralStudent,
  registerMasterStudent,
  registerTeacherResearcher,
  getUser,
  getUserSessions,
  logoutSession,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

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

// Route de validation de compte
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

// Route de rafraîchissement du token
router.post("/refresh-token", refreshToken as RequestHandler);

// Route pour les informations de l'utilisateur
router.get("/me", verifyToken as RequestHandler, getUser as RequestHandler);

// Routes supplémentaires
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

router.post(
  "/submit-additional-info",
  verifyToken as RequestHandler,
  submitAdditionalInfo as RequestHandler
);

export default router;
