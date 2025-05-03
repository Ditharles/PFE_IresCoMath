import { RequestHandler, Router } from "express";
import {
  getAllRequests,
  getPossibleRequests,
  getRequests,
  submitMaterialPurchaseRequest,
} from "../controllers/requestsController";

const router: Router = Router();

router.get("/get-possible-requests", getPossibleRequests as RequestHandler);

//Route pour obtenir les requetes effectués par l'utilisateur
router.get("/get-requests", getRequests as RequestHandler);

//Routes pour obtenir toutes les requetes
router.get("/get-all-requests", getAllRequests as RequestHandler);

router.post(
  "/requests/material/purchase",
  submitMaterialPurchaseRequest as RequestHandler
);
router.post(
  "/requests/material/rent",
  submitMaterialPurchaseRequest as RequestHandler
);

export default router;
