import { ConfigService } from '@src/config';
import { errorHandler, notFoundHandler } from '@src/middleware';
import { ApiController } from '@src/routes';
import { Logger } from '@src/utils';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { Container } from 'typedi';
import './preload';

const app = express();
const configService = Container.get(ConfigService);
const logger = Container.get(Logger);
const apiController = Container.get(ApiController);

app.disable('x-powered-by');

app.use(helmet());
app.use(
  cors({
    origin: configService.CLIENT_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger.requestLogger);

app.use('/api/v1', apiController.router);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
