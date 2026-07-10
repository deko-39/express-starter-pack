import type { NextFunction, Request, Response } from 'express';

export const errorWrapper =
  (fn: (req: Request, res: Response, next: NextFunction) => unknown | Promise<unknown>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: unknown) {
      next(error);
    }
  };
