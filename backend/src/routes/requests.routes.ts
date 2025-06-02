import { RequestHandler, Router } from "express";
import {
  addDocuments,
  approveRequest,
  closeRequest,
  completeRequest,
  deleteRequest,
  editRequest,
  getAllRequests,
  getPossibleRequests,
  getRequest,
  getRequests,
  reigniteRequest,
  signFormUpload,
  submitArticleRegistrationRequest,
  submitEquipmentLendRequest,
  submitEquipmentPurchaseRequest,
  submitMissionRequest,
  submitRequestStage,
  submitScientificEventRequest,
} from "../controllers/requests.controller";
import { checkRole } from "../middleware/checkRole";

const router: Router = Router();

router.get("/get-possible-requests", getPossibleRequests as RequestHandler);

//Route pour obtenir les requetes effectués par l'utilisateur
router.get("/get-requests", getRequests as RequestHandler);

router.get("/get-request/:id", getRequest as RequestHandler);

router.get(
  "/get-all-requests",
  checkRole(["DIRECTEUR"]),
  getAllRequests as RequestHandler
);
//Routes pour obtenir toutes les requetes
router.get(
  "/get-all-requests",
  checkRole(["DIRECTEUR"]),
  getAllRequests as RequestHandler
);

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
  submitScientificEventRequest as RequestHandler
);

router.post(
  "/article-registration",
  submitArticleRegistrationRequest as RequestHandler
);
export default router;

router.post(
  "/approve-request/:id",
  checkRole(["DIRECTEUR", "ENSEIGNANT"]),
  approveRequest as RequestHandler
);

router.post(
  "/reignite-request/:id",

  reigniteRequest as RequestHandler
);
router.post("/close-request/:id", closeRequest as RequestHandler);

router.post("/add-document/:id", addDocuments as RequestHandler);

router.post("/complete-request/:id", completeRequest as RequestHandler);

router.post("/edit-request/:id", editRequest as RequestHandler);

router.delete("/delete-request/:id", deleteRequest as RequestHandler);

router.post("/submit-sign-form/:id", signFormUpload as RequestHandler);
