import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import validateRoutes from "./routes/validateRoutes";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth/", authRoutes as any);
app.use("/validate/", validateRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
