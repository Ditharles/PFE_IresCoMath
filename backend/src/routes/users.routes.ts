import { Express, RequestHandler, Router } from "express";
import { getUser } from "../controllers/users.controller";
import { getUsers } from "../controllers/users.controller";

const router: Router = Router();

router.get("/get-users", getUsers);
router.get("/get-user/:id", getUser as RequestHandler);

export default router;
