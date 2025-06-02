import { RequestHandler, Router } from "express";
import {
  getAllCategories,
  getCategory,
  getAllEquipments,
  getEquipment,
  addCategory,
  editCategory,
  addEquipment,
  editEquipment,
  deleteCategory,
  deleteEquipment,
} from "../controllers/equipment.controller";

const router = Router();

router.get("/categories", getAllCategories as RequestHandler);
router.get("/category/:id", getCategory as RequestHandler);

router.get("/", getAllEquipments as RequestHandler);
router.get("/:id", getEquipment as RequestHandler);
router.post("/add-category", addCategory as RequestHandler);
router.post("/edit-category/:id", editCategory as RequestHandler);
router.delete("/delete-category/:id", deleteCategory as RequestHandler);
router.post("/edit-equipment/:id", editEquipment as RequestHandler);
router.post("/add-equipment", addEquipment as RequestHandler);
router.delete("/delete-equipment/:id", deleteEquipment as RequestHandler);
export default router;
