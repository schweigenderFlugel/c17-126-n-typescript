import { Router } from 'express'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import { signUpSchema } from '../../middlewares/validators/auth.validator'
import authsController from '../../controllers/auths.controllers'
import passport from 'passport'

const authRouter = Router()

authRouter.post(
  '/signup',
  schemaValidator(signUpSchema, null),
  authsController.signUp
)

authRouter.post(
  '/login',
  authsController.login
)

authRouter.get(
  '/refresh',
  authsController.refresh
)

authRouter.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  authsController.logout
)

export default authRouter
