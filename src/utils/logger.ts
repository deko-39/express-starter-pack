import { NextFunction, Request, RequestHandler, Response } from 'express';
import { randomUUID } from 'node:crypto';
import winston from 'winston';
import { env } from '../config/env.js';

type LogMeta = Record<string, unknown>;
type LogLevel = 'fatal' | 'error' | 'warn' | 'info';

class Logger {
  private static readonly levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
    fatal: 5,
  };

  private static readonly formatError = winston.format((info) => {
    const errorValue = info.err;

    if (errorValue instanceof Error) {
      info.err = {
        message: errorValue.message,
        name: errorValue.name,
        stack: errorValue.stack,
      };
    }

    return info;
  });

  private static readonly developmentFormat = winston.format.combine(
    Logger.formatError(),
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      const serializedMeta = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';

      return `${timestamp} ${level}: ${message}${serializedMeta}`;
    }),
  );

  private static readonly productionFormat = winston.format.combine(
    Logger.formatError(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  );

  private readonly baseLogger = winston.createLogger({
    level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    levels: Logger.levels,
    format: env.NODE_ENV === 'production' ? Logger.productionFormat : Logger.developmentFormat,
    transports: [new winston.transports.Console()],
  });

  private normalizeLogInput(metaOrMessage: unknown, message?: string) {
    if (typeof metaOrMessage === 'string') {
      return {
        message: metaOrMessage,
        meta: {},
      };
    }

    return {
      message: message ?? 'Application log',
      meta: (metaOrMessage ?? {}) as LogMeta,
    };
  }

  private writeLog(level: LogLevel, metaOrMessage: unknown, message?: string) {
    const normalized = this.normalizeLogInput(metaOrMessage, message);

    this.baseLogger.log({
      level,
      message: normalized.message,
      ...normalized.meta,
    });
  }

  public fatal(metaOrMessage: unknown, message?: string) {
    this.writeLog('fatal', metaOrMessage, message);
  }

  public error(metaOrMessage: unknown, message?: string) {
    this.writeLog('error', metaOrMessage, message);
  }

  public warn(metaOrMessage: unknown, message?: string) {
    this.writeLog('warn', metaOrMessage, message);
  }

  public info(metaOrMessage: unknown, message?: string) {
    this.writeLog('info', metaOrMessage, message);
  }

  public readonly requestLogger: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const requestIdHeader = req.header('x-request-id');
    const requestId = requestIdHeader || randomUUID();
    const startedAt = process.hrtime.bigint();

    res.setHeader('x-request-id', requestId);

    res.on('finish', () => {
      const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
      const meta = {
        durationMs: Number(durationMs.toFixed(2)),
        requestId,
        req: {
          ip: req.ip,
          method: req.method,
          url: req.originalUrl,
          userAgent: req.get('user-agent'),
        },
        res: {
          statusCode: res.statusCode,
        },
      };

      const message = `${req.method} ${req.originalUrl}`;

      if (res.statusCode >= 500) {
        this.error(meta, message);
        return;
      }

      if (res.statusCode >= 400) {
        this.warn(meta, message);
        return;
      }

      this.info(meta, message);
    });

    next();
  };
}

const logger = new Logger();
const requestLogger = logger.requestLogger;

export { Logger, logger, requestLogger };
