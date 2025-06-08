import { Express, RequestHandler, Router } from "express";
import {
  deleteUser,
  desactivateUser,
  getStudents,
  getUser,
  updateUser,
} from "../controllers/users.controller";
import { getUsers } from "../controllers/users.controller";
import { checkRole } from "../middleware/checkRole";

const router: Router = Router();
router.get("/get-students/:id", getStudents as RequestHandler);
router.get("/get-users", getUsers as RequestHandler);
router.get("/get-user/:id", getUser as RequestHandler);
router.post("/update-user", updateUser as RequestHandler);
router.post(
  "/delete-user/:id",
  checkRole(["ADMIN"]),
  deleteUser as RequestHandler
);
router.post("/desactivate-user/:id", desactivateUser as RequestHandler);
export default router;

router.delete("/delete-user/:id", deleteUser as RequestHandler);
