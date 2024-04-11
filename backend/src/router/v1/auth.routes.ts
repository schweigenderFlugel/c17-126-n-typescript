import { Router } from 'express'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import { signUpSchema } from '../../middlewares/validators/auth.validator'
import authsController from '../../controllers/auths.controllers'

const authRouter = Router()

authRouter.post(
  '/signup',
  schemaValidator(signUpSchema, null),
  authsController.signUp
)
export default authRouter
