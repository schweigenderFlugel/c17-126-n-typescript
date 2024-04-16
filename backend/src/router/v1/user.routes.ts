// LIBRERIES
import { Router } from 'express'
// MIDDLEWARES
import userAuth from '../../middlewares/userAuth.middlewares'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import { userCreate } from '../../middlewares/validators/user.validator'
// CONTROLLERS
import userController from '../../controllers/user.controllers'
import { errorHandler } from '../../middlewares/errorHandler.middleware'

const userRouter = Router()

userRouter.post(
  '/',
  userAuth,
  schemaValidator(userCreate, null),
  userController.createUser,
  errorHandler
)

export default userRouter
