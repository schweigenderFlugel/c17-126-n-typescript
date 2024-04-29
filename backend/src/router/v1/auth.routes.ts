import { Router } from 'express'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import {
  loginSchema,
  recoverySchema,
  signUpSchema,
  updatePasswordSchema,
} from '../../middlewares/validators/auth.validator'
import authsController from '../../controllers/auths.controllers'
import { errorHandler } from '../../middlewares/errorHandler.middleware'
import userAuth from '../../middlewares/userAuth.middlewares'

const authRouter = Router()

authRouter.post(
  '/signup',
  schemaValidator(signUpSchema, null),
  authsController.signUp,
  errorHandler
)

authRouter.post(
  '/login',
  schemaValidator(loginSchema, null),
  authsController.login,
  errorHandler
)

authRouter.post(
  '/forgot-password',
  schemaValidator(recoverySchema, null),
  authsController.forgotPassword,
  errorHandler
)

authRouter.get(
  '/refresh',
  authsController.refresh,
  errorHandler,
)

authRouter.get(
  '/logout',
  authsController.logout,
  errorHandler
)

authRouter.put(
  '/change-password/:id',
  userAuth,
  schemaValidator(updatePasswordSchema, null),
  authsController.changePassword,
  errorHandler
)

export default authRouter
