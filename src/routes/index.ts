import { UserController } from '@src/features/user';
import { HttpStatusCode } from 'axios';
import express, { Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
export class ApiController {
  public readonly router = express.Router();

  constructor(private readonly userController: UserController) {
    this.registerRoutes();
  }

  private registerRoutes() {
    this.router.get('/health', this.getHealth);
    this.router.use('/users', this.userController.router);
  }

  private readonly getHealth = (_req: Request, res: Response) => {
    res.status(HttpStatusCode.Ok).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  };
}
