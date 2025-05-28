import { RequestHandler, Router } from "express";
import {
  deleteTemplate,
  getTemplate,
  getTemplates,
  submitTemplate,
  updateTemplate,
  verifyTemplate,
} from "../controllers/template.controller";

const router: Router = Router();
router.post("/verify", verifyTemplate as RequestHandler);
router.post("/submit", submitTemplate as RequestHandler);
router.put("/:id", updateTemplate as RequestHandler);
router.delete("/:id", deleteTemplate as RequestHandler);
router.get("/", getTemplates as RequestHandler);
router.get("/:id", getTemplate as RequestHandler);

export default router;
