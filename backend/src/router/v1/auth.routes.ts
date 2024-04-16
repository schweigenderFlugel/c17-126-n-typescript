import { Router } from 'express'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import {
  loginSchema,
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

export default authRouter
