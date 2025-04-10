import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }
  console.log(token);
  const possibleRole = ["enseignant", "admin", "doctorant", "master"];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    console.log(decoded);
    (req as Request & { user: { id: string; role: string } }).user =
      decoded as { id: string; role: string };

    console.log(
      (req as Request & { user: { id: string; role: string } }).user.role
    );

    if (
      !possibleRole.includes(
        (req as Request & { user: { id: string; role: string } }).user.role
      )
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: "Token expiré" });
    } else if (error instanceof JsonWebTokenError) {
      res.status(401).json({ message: "Token invalide" });
    } else {
      console.error("Erreur de vérification du token:", error);
      res.status(400).json({ message: "Token non valide" });
    }
  }
};
