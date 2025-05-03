import { Express, RequestHandler, Router } from "express";
import { getUser } from "../controllers/usersController";
import { getUsers } from "../controllers/usersController";

const router: Router = Router();

router.get("/get-users", getUsers);
router.get("/get-user/:id", getUser as RequestHandler);

export default router;
