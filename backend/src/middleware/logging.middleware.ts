import { Request, Response, NextFunction } from "express";
import logger from "../logger";

const loggingMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    // Log de la requête entrante
    logger.info(
      {
        method: req.method,
        url: req.originalUrl,
        context: "HTTP_REQUEST_IN",
      },
      "Requête entrante"
    );

    // Intercepter la réponse pour logger les informations
    const originalSend = res.send;
    res.send = function (body: any) {
      const responseTime = Date.now() - start;

      logger.info(
        {
          status: res.statusCode,
          responseTime: `${responseTime}ms`,
          context: "HTTP_RESPONSE_OUT",
        },
        "Réponse sortante"
      );

      return originalSend.call(this, body);
    };

    // Gestion des erreurs
    res.on("finish", () => {
      if (res.statusCode >= 400) {
        logger.error(
          {
            status: res.statusCode,
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            context: "HTTP_ERROR",
          },
          "Erreur HTTP"
        );
      }
    });

    next();
  };
};

export default loggingMiddleware;
