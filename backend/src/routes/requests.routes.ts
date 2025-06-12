import { RequestHandler, Router } from "express";

import { checkRole } from "../middleware/checkRole";
import {
  getAllRequests,
  getPossibleRequests,
  getRequest,
  getRequests,
} from "../controllers/requests/info.controller";

import {
  addDocuments,
  signFormUpload,
} from "../controllers/requests/documents.controller";
import {
  editRequest,
  deleteRequest,
} from "../controllers/requests/edit.controller";
import {
  submitEquipmentPurchaseRequest,
  submitEquipmentLendRequest,
  submitMissionRequest,
  submitRequestStage,
  submitScientificEventRequest,
  submitArticleRegistrationRequest,
  submitRepairMaintenanceRequest,
} from "../controllers/requests/submit.controller";
import {
  reigniteRequest,
  closeRequest,
  completeRequest,
} from "../controllers/requests/actions.controller";
import { approveRequest } from "../controllers/requests/approbal.controller";

const router: Router = Router();

// Routes pour obtenir les requetes
router.get("/get-possible-requests", getPossibleRequests as RequestHandler);
router.get("/get-requests", getRequests as RequestHandler);
router.get("/get-request/:id", getRequest as RequestHandler);
router.get(
  "/get-all-requests",
  checkRole(["DIRECTEUR"]),
  getAllRequests as RequestHandler
);

// Routes pour soumettre une requete
router.post(
  "/equipment/purchase",
  submitEquipmentPurchaseRequest as RequestHandler
);
router.post("/equipment/rent", submitEquipmentLendRequest as RequestHandler);

router.post("/mission", submitMissionRequest as RequestHandler);

router.post(
  "/internship",
  checkRole(["MASTER", "DOCTORANT"]),
  submitRequestStage as RequestHandler
);

router.post(
  "/conference-national",
  checkRole(["ENSEIGNANT", "DOCTORANT"]),
  submitScientificEventRequest as RequestHandler
);

router.post(
  "/article-registration",
  checkRole(["ENSEIGNANT", "DOCTORANT"]),
  submitArticleRegistrationRequest as RequestHandler
);

router.post(
  "/repair-maintenance",
  checkRole(["ENSEIGNANT", "DOCTORANT"]),
  submitRepairMaintenanceRequest as RequestHandler
);
// Routes pour approuver une requete
router.post(
  "/approve-request/:id",
  checkRole(["DIRECTEUR"]),
  approveRequest as RequestHandler
);

// Routes pour gérer les documents
router.post("/add-document/:id", addDocuments as RequestHandler);
router.post(
  "/submit-sign-form/:id",
  checkRole(["DIRECTEUR"]),
  signFormUpload as RequestHandler
);

// Routes pour editer une requete
router.put("/edit-request/:id", editRequest as RequestHandler);

// Routes pour supprimer une requete
router.delete("/:id", deleteRequest as RequestHandler);

// Routes pour gérer l'état d'une requete
router.post("/reignite-request/:id", reigniteRequest as RequestHandler);
router.post(
  "/close-request/:id",
  checkRole(["DIRECTEUR"]),
  closeRequest as RequestHandler
);
router.post("/complete-request/:id", completeRequest as RequestHandler);

export default router;
