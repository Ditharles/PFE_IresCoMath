import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../../generated/prisma";
import { getUser } from "../controllers/authController";
import { getUserByID } from "../services/auth.service";

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token d'authentification manquant ou mal formaté" });
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as {
      token: string;
    };

    const session = await prisma.session.findFirst({
      where: {
        accessToken: decoded.token,
      },
      include: {
        user: true,
      },
    });

    if (!session || !session.user) {
      return res
        .status(401)
        .json({ message: "Session ou utilisateur non trouvé" });
    }

    const user = await getUserByID(session.user.id);
    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }
    console.log(user.role);
    req.user = user;
    return next(); 
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: "Token expiré" });
    } else if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: "Token invalide" });
    } else {
      console.error("Erreur de vérification du token:", error);
      return res
        .status(500)
        .json({ message: "Erreur serveur lors de l'authentification" });
    }
  }
};
