export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const handleError = (error: Error) => {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      isOperational: error.isOperational,
    };
  }

  // Erreurs Prisma
  if (error.name === "PrismaClientKnownRequestError") {
    return {
      statusCode: 400,
      message: "Erreur de base de données",
      isOperational: true,
    };
  }

  // Erreurs JWT
  if (error.name === "JsonWebTokenError") {
    return {
      statusCode: 401,
      message: "Token invalide",
      isOperational: true,
    };
  }

  // Erreur par défaut
  return {
    statusCode: 500,
    message: "Erreur interne du serveur",
    isOperational: false,
  };
};
