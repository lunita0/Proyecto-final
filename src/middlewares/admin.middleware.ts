import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";
import { AppError } from "../errors/app-error";

export const adminMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.userRole !== "instructor-token") {
    return next(new AppError(403, "Forbidden: Admins only"));
  }
  next();
};