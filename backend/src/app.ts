import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import validateRoutes from "./routes/validateRoutes";
import usersRoutes from "./routes/usersRoutes";
import helmet from "helmet";
import cors from "cors";
import { PrismaClient } from "../generated/prisma";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";
import { verify } from "crypto";
import { verifyToken } from "./middleware/verifyToken";
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
app.use("/requests/,", verifyToken as RequestHandler, usersRoutes);

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      token: process.env.UPLOADTHING_TOKEN,
    },
  })
);

app.get("/enseignants", async (req, res) => {
  try {
    const data = await prisma.enseignantChercheur.findMany({
      select: { id: true, nom: true, prenom: true },
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
