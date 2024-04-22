import { Router } from 'express'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import {
  loginSchema,
  recoverySchema,
  signUpSchema,
} from '../../middlewares/validators/auth.validator'
import authsController from '../../controllers/auths.controllers'
import { errorHandler } from '../../middlewares/errorHandler.middleware'

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

export default authRouter
