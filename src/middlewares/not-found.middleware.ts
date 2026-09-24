import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, "Route not found"));
};
