import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import validateRoutes from "./routes/validate.routes";
import usersRoutes from "./routes/users.routes";
import templateRoutes from "./routes/templates.routes";
import helmet from "helmet";
import cors from "cors";
import { PrismaClient } from "../generated/prisma";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";

import { verifyToken } from "./middleware/verifyToken";
import requestsRoutes from "./routes/requests.routes";
import notificationsRoutes from "./routes/notifications.routes";
import equipmentsRoutes from "./routes/equipments.routes";
import { checkRole } from "./middleware/checkRole";
dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(helmet());

app.use("/auth/", authRoutes);
app.use("/validate/", validateRoutes);
app.use("/users/", verifyToken as RequestHandler, usersRoutes);
app.use("/requests/", verifyToken as RequestHandler, requestsRoutes);
app.use("/notifications/", verifyToken as RequestHandler, notificationsRoutes);
app.use(
  "/equipments/",
  verifyToken as RequestHandler,
  // checkRole(["ADMIN", "DIRECTEUR"]),
  equipmentsRoutes
);
app.use(
  "/templates",
  verifyToken as RequestHandler,
  checkRole(["DIRECTEUR"]),
  templateRoutes
);
app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      token: process.env.UPLOADTHING_TOKEN,
    },
  })
);

app.get("/teachers-researchers", async (req, res) => {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: "ENSEIGNANT",
      },
      select: { id: true, lastName: true, firstName: true },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Fermer la connexion Prisma proprement
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
