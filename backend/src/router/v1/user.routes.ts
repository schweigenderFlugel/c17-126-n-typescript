// LIBRERIES
import { Router } from 'express'
// MIDDLEWARES
import userAuth from '../../middlewares/userAuth.middlewares'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import { userCreate } from '../../middlewares/validators/user.validator'
// CONTROLLERS
import userController from '../../controllers/user.controllers'
import { errorHandler } from '../../middlewares/errorHandler.middleware'
import checkRoles from '../../middlewares/checkRoles.middleware'
import { Roles } from '../../models/db/entity/auth.entity'

const userRouter = Router()

userRouter.get(
  '/',
  userAuth,
  userController.getUser,
  errorHandler,
)

userRouter.get(
  '/all',
  userAuth,
  checkRoles(Roles.ADMIN),
  userController.getAllUser,
  errorHandler,
)

userRouter.post(
  '/',
  userAuth,
  schemaValidator(userCreate, null),
  userController.createUser,
  errorHandler,
)

export default userRouter
