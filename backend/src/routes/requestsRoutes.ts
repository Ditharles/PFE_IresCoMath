import { Router } from "express";
import { getPossibleRequests, submitMaterialPurchaseRequest } from "../controllers/requestsController";

const router: Router = Router();

router.get("/get-possible-requests",getPossibleRequests);
router.post("/requests/material/purchase",submitMaterialPurchaseRequest);
router.post("/requests/material/rent",submitMaterialPurchaseRequest);

export default router;