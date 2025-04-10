import express from "express";
import {
  registerDoctorant,
  registerEnseignant,
  registerMaster,
  login,
  confirmRequest,
  submitPassword,
  logout,
  resendConfirmLinkWithMail,
  resendConfirmLink,
  changePassword,
  forgetPassword,
  confirmResetPassword,
  resetPassword,
  validateAccount,
} from "../controllers/authController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// Routes d'inscription
router.post("/registerEnseignant", registerEnseignant);
router.post("/registerMaster", registerMaster);
router.post("/registerDoctorant", registerDoctorant);

// Routes de confirmation
router.get("/confirmRequest/:token", confirmRequest);
router.post("/submitPassword", verifyToken, submitPassword);

//Routes de validation
router.get("/validation", validateAccount);
// Routes de connexion et déconnexion
router.post("/login", login);
router.get("/logout", logout);

// Routes de gestion de confirmation
router.get("/resendConfirmationLink", verifyToken, resendConfirmLink);
router.post("/resendConfirmationLink", resendConfirmLinkWithMail);

// Routes de gestion de mot de passe
router.post("/changePassword", verifyToken, changePassword);
router.post("/forgetPassword", forgetPassword);
router.get("/confirmResetPassword/:token", confirmResetPassword);
router.post("/resetPassword/:token", resetPassword);

export default router;
