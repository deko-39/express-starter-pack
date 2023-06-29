import express, { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '~/utils/constant'
import { errorWrapper } from '~/utils/error-wrapper'

const router = express.Router()

const getUser = (_: Request, res: Response, __: NextFunction) => {
  res.status(HttpStatus.OK).send('Get user')
}

const getUserById = (_: Request, res: Response, __: NextFunction) => {
  res.status(HttpStatus.OK).send('Get user by id')
}

const createUser = (_: Request, res: Response, __: NextFunction) => {
  res.status(HttpStatus.CREATED).send('Create user')
}

const updateUserById = (_: Request, res: Response, __: NextFunction) => {
  res.status(HttpStatus.ACCEPTED).send('Update user by id')
}

const deleteUserById = (_: Request, res: Response, __: NextFunction) => {
  res.sendStatus(HttpStatus.NO_CONTENT)
}

router.get('', errorWrapper(getUser))
router.get(':id', errorWrapper(getUserById))
router.post('', errorWrapper(createUser))
router.patch(':id', errorWrapper(updateUserById))
router.delete(':id', errorWrapper(deleteUserById))

export default router
