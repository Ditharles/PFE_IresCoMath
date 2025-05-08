import express, { RequestHandler } from "express";
import {
  getCategories,
  getCategoriesByType,
  getEquipments,
  getEquipmentsByCategory,
  getEquipmentsByType,
} from "../controllers/equipmentsController";

const router = express.Router();

router.get("/get-equipments", getEquipments as RequestHandler);
router.get(
  "/get-equipment-by-type/:type",
  getEquipmentsByType as RequestHandler
);
router.get("/get-all-categories", getCategories as RequestHandler);
router.get(
  "/get-categories-by-type/:type",
  getCategoriesByType as RequestHandler
);

router.get(
  "/get-equipments-by-category/:id",
  getEquipmentsByCategory as RequestHandler
);
export default router;
