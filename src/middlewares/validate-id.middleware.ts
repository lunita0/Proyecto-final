import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validateIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const idNum = Number(req.params.id);

  if (isNaN(idNum) || !Number.isInteger(idNum) || idNum <= 0) {
    return next(new AppError(400, "Invalid incident id"));
  }

  next();
};
