import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Vérification de l'existence de JWT_SECRET_KEY (variables d'environnement)
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined");
}

export default transporter;
