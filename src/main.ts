import { createServer } from 'node:http';
import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/index.js';

const server = createServer(app);

const shutdown = (signal: NodeJS.Signals) => {
  logger.warn({ signal }, 'Shutdown signal received. Closing server.');

  server.close((error) => {
    if (error) {
      logger.error({ err: error }, 'Failed to close server gracefully.');
      process.exit(1);
    }

    logger.info('Server closed gracefully.');
    process.exit(0);
  });
};

process.on('uncaughtException', (error: unknown) => {
  logger.fatal({ err: error }, 'Uncaught exception detected.');
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.fatal({ err: reason }, 'Unhandled promise rejection detected.');
  process.exit(1);
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

server.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, 'API server is listening.');
});
