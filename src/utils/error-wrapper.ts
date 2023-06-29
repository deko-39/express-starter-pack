import { NextFunction, Request, Response } from 'express'
import { logger } from './logger'

export const errorWrapper =
  (fn: Awaited<Function>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error: unknown) {
      logger.error('Handling request error!')
      logger.error(error)
    }
  }
