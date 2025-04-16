import express, { RequestHandler } from "express";
import {
  registerDoctorant,
  registerEnseignant,
  registerMaster,
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
} from "../controllers/authController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// Routes d'inscription
router.post("/register/enseignant", registerEnseignant as RequestHandler);
router.post("/register/master", registerMaster as RequestHandler);
router.post("/register/doctorant", registerDoctorant as RequestHandler);

// Routes de confirmation
router.get("/confirm-request/:token", confirmRequest as RequestHandler);
router.post(
  "/submit-additional-info",
  verifyToken as RequestHandler,
  submitAdditionalInfo as RequestHandler
);

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
router.post("/forget-password", forgetPassword as RequestHandler);
router.get(
  "/confirm-reset-password/:token",
  confirmResetPassword as RequestHandler
);
router.post("/reset-password/:token", resetPassword as RequestHandler);

// Route de rafraîchissement du token
router.post(
  "/refresh-token",
  verifyToken as RequestHandler,
  refreshToken as RequestHandler
);

export default router;
