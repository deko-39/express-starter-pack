import { HttpStatusCode } from 'axios';
import express from 'express';
import userRouter from './user/index.js';

const router = express.Router();

router.get('/health', (_, res) => {
  res.status(HttpStatusCode.Ok).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

router.use('/users', userRouter);

export default router;
