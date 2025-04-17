import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import validateRoutes from "./routes/validateRoutes";

import usersRoutes from "./routes/usersRoutes";

dotenv.config();

const app = express();

app.use(express.json());


app.use("/auth/", authRoutes);
app.use("/validate/", validateRoutes);
app.use("/users/", usersRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
