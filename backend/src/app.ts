import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import validateRoutes from "./routes/validateRoutes";

import usersRoutes from "./routes/usersRoutes";

dotenv.config();
import cors from "cors";
import { PrismaClient } from "../generated/prisma";

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


app.use("/auth/", authRoutes);
app.use("/validate/", validateRoutes);
<<<<<<< Updated upstream
app.use("/users/", usersRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
=======
app.get("/enseignants", async (req, res) => {
  const data = await prisma.enseignantChercheur.findMany({
    select: { id: true, nom: true, prenom: true },
  });
  res.json(data);
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
>>>>>>> Stashed changes
});
