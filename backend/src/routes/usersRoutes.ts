import { Express, Router } from "express";
import { getUser } from "../controllers/authController";
import { getUsers } from "../controllers/usersController";

const router: Router = Router();

router.get("/get-users", getUsers);

export default router;
