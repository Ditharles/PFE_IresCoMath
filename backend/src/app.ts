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
import { teacherResearcherFields } from "./constants/userFields";
import pinoHttp from "pino-http";
import logger from "./logger";
import loggingMiddleware from "./middleware/logging.middleware";
dotenv.config();

console.log("Allowed frontend:", process.env.FRONTEND_URL);

const prisma = new PrismaClient();
const app = express();
//Middleware pour pino
app.use(loggingMiddleware());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
    ],
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
app.use("/equipments/", verifyToken as RequestHandler, equipmentsRoutes);
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
        OR: [{ role: "ENSEIGNANT" }, { role: "DIRECTEUR" }],
      },
      select: {
        id: true,
        lastName: true,
        firstName: true,
        teacherResearcher: true,
      },
    });

    const formattedData = data.map((user) => ({
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      ...user.teacherResearcher,
    }));
    res.json(formattedData);
  } catch (error) {
    logger.error(
      error,
      "Erreur lors de la récupération des enseignants chercheurs"
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// Fermer la connexion Prisma proprement
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  logger.info("Prisma disconnected (SIGINT)");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  logger.info("Prisma disconnected (SIGTERM)");
  process.exit(0);
});
