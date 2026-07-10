import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundHandler } from './middleware/not-found.js';
import router from './routes/index.js';
import { requestLogger } from './utils/logger.js';

const app = express();

app.disable('x-powered-by');

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/api/v1', router);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
