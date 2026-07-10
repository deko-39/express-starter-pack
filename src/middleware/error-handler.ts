import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      errors: error.details,
    });
    return;
  }

  logger.error({ err: error }, 'Unhandled request error.');

  res.status(HttpStatusCode.InternalServerError).json({
    message: 'Internal server error.',
  });
};
