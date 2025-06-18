import { Express, RequestHandler, Router } from "express";
import {
  deleteUser,
  desactivateUser,
  getStudents,
  getUser,
  reactivateUser,
  updateUser,
} from "../controllers/users.controller";
import { getUsers } from "../controllers/users.controller";
import { checkRole } from "../middleware/checkRole";

const router: Router = Router();
router.get("/get-students/:id", getStudents as RequestHandler);
router.get("/get-users", getUsers as RequestHandler);
router.get("/get-user/:id", getUser as RequestHandler);
router.post("/update-user", updateUser as RequestHandler);
router.delete("/:id", checkRole(["ADMIN"]), deleteUser as RequestHandler);
router.post(
  "/desactivate/:id",
  checkRole(["DIRECTEUR"]),
  desactivateUser as RequestHandler
);

router.post(
  "/reactivate/:id",
  checkRole(["DIRECTEUR"]),
  reactivateUser as RequestHandler
);
export default router;
