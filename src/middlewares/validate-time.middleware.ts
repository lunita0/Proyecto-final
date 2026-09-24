import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validateTimeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { estimatedMinutes, priority } = req.body;

  if (estimatedMinutes !== undefined) {
    if (typeof estimatedMinutes !== "number" || estimatedMinutes <= 0 || estimatedMinutes > 480) {
      return next(new AppError(400, "Invalid estimated minutes"));
    }

    // Reto 4: Regla especial para incidentes críticos (máximo 60 minutos)
    if (priority === "CRITICAL" && estimatedMinutes > 60) {
      return next(new AppError(400, "Critical incidents cannot exceed 60 estimated minutes"));
    }
  }

  next();
};
