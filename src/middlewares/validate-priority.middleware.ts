import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validatePriorityMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { priority } = req.body;

  if (priority) {
    const validPriorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    if (!validPriorities.includes(priority)) {
      return next(new AppError(400, "Invalid priority"));
    }
  }

  next();
};
