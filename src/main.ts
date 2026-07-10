import './preload';

import { app } from '@src/app';
import { ConfigService } from '@src/config';
import { Logger } from '@src/utils';
import { createServer } from 'node:http';
import { Container } from 'typedi';

const server = createServer(app);
const configService = Container.get(ConfigService);
const logger = Container.get(Logger);

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

server.listen(configService.PORT, () => {
  logger.info({ port: configService.PORT }, 'API server is listening.');
});
