import { AppError, errorWrapper } from '@src/utils';
import { HttpStatusCode } from 'axios';
import express, { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { UserService } from './user.service';

@Service()
export class UserController {
  public readonly router = express.Router();

  constructor(private readonly userService: UserService) {
    this.registerRoutes();
  }

  private registerRoutes() {
    this.router.get('/', errorWrapper(this.getUser));
    this.router.get('/:id', errorWrapper(this.getUserById));
    this.router.get('/:id/profile', errorWrapper(this.getUserProfile));
    this.router.post('/', errorWrapper(this.createUser));
    this.router.patch('/:id', errorWrapper(this.updateUserById));
    this.router.delete('/:id', errorWrapper(this.deleteUserById));
  }

  private readonly getUser = (_req: Request, res: Response, _next: NextFunction) => {
    res.status(HttpStatusCode.Ok).json(this.userService.getUsers());
  };

  private readonly getUserById = (req: Request, res: Response, _next: NextFunction) => {
    res.status(HttpStatusCode.Ok).json(this.userService.getUserById(req.params.id));
  };

  private readonly createUser = (req: Request, res: Response, _next: NextFunction) => {
    res.status(HttpStatusCode.Created).json(this.userService.createUser(req.body));
  };

  private readonly updateUserById = (req: Request, res: Response, _next: NextFunction) => {
    res
      .status(HttpStatusCode.Accepted)
      .json(this.userService.updateUserById(req.params.id, req.body));
  };

  private readonly deleteUserById = (_req: Request, res: Response, _next: NextFunction) => {
    res.sendStatus(HttpStatusCode.NoContent);
  };

  private readonly getUserProfile = (req: Request, res: Response, _next: NextFunction) => {
    if (!req.params.id) {
      throw new AppError(HttpStatusCode.BadRequest, 'User id is required.');
    }

    res.status(HttpStatusCode.Ok).json(this.userService.getUserProfile(req.params.id));
  };
}
