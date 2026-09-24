import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export interface AuthenticatedRequest extends Request {
  userRole?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1];

  if (token !== "instructor-token" && token !== "technician-token") {
    return next(new AppError(401, "Unauthorized"));
  }

  req.userRole = token;
  next();
};
