import { Request, Response, NextFunction } from "express";

export interface RequestWithInfo extends Request {
  requestInfo?: {
    timestamp: string;
    method: string;
    path: string;
  };
}

export const requestInfoMiddleware = (req: RequestWithInfo, res: Response, next: NextFunction) => {
  req.requestInfo = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path
  };
  next();
};
