import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error.js';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(HttpStatusCode.NotFound, `Route ${req.originalUrl} not found.`));
};
