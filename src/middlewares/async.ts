import { Request, Response, NextFunction } from "express";

export const asyncHandler =
  <T extends Request = Request>(
    func: (req: T, res: Response, next: NextFunction) => any
  ) =>
  (req: T, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
