import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { logger } from "../logger/Logger.js";
import { ENV } from "../utils/env.js";

export const notFound = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err instanceof AppError ? err.statusCode : 500;
  const isOperational = err instanceof AppError ? err.isOperational : false;

  logger.error(err.message, { status, isOperational, stack: err.stack });

  res.status(status).json({
    message: err.message || "Internal Server Error",
    ...(ENV.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
