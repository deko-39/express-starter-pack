import { HttpStatusCode } from 'axios';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from '../../utils/app-error.js';
import { errorWrapper } from '../../utils/error-wrapper.js';

const router = express.Router();

const getUser = (_: Request, res: Response, __: NextFunction) => {
  res.status(HttpStatusCode.Ok).json({
    message: 'List users endpoint is ready.',
  });
};

const getUserById = (req: Request, res: Response, __: NextFunction) => {
  res.status(HttpStatusCode.Ok).json({
    message: 'Get user by id endpoint is ready.',
    data: {
      id: req.params.id,
    },
  });
};

const createUser = (req: Request, res: Response, __: NextFunction) => {
  res.status(HttpStatusCode.Created).json({
    message: 'Create user endpoint is ready.',
    data: req.body,
  });
};

const updateUserById = (req: Request, res: Response, __: NextFunction) => {
  res.status(HttpStatusCode.Accepted).json({
    message: 'Update user by id endpoint is ready.',
    data: {
      id: req.params.id,
      updates: req.body,
    },
  });
};

const deleteUserById = (_: Request, res: Response, __: NextFunction) => {
  res.sendStatus(HttpStatusCode.NoContent);
};

const getUserProfile = (req: Request, res: Response, __: NextFunction) => {
  if (!req.params.id) {
    throw new AppError(HttpStatusCode.BadRequest, 'User id is required.');
  }

  res.status(HttpStatusCode.Ok).json({
    message: 'Get user profile endpoint is ready.',
    data: {
      id: req.params.id,
      profileComplete: false,
    },
  });
};

router.get('/', errorWrapper(getUser));
router.get('/:id', errorWrapper(getUserById));
router.get('/:id/profile', errorWrapper(getUserProfile));
router.post('/', errorWrapper(createUser));
router.patch('/:id', errorWrapper(updateUserById));
router.delete('/:id', errorWrapper(deleteUserById));

export default router;
