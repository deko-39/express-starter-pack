import '@src/preload';
import { AppError, Logger } from '@src/utils';
import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

const logger = Container.get(Logger);

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
