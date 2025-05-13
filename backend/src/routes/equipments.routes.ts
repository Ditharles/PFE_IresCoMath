import { RequestHandler, Router } from "express";
import {
  getAllCategories,
  getCategory,
  getAllEquipments,
  getEquipment,
} from "../controllers/equipment.controller";

const router = Router();

router.get("/categories", getAllCategories as RequestHandler);
router.get("/categories/:id", getCategory as RequestHandler);

router.get("/", getAllEquipments as RequestHandler);
router.get("/:id", getEquipment as RequestHandler);

export default router;
