import { Request, Response, NextFunction, Router } from 'express'
import { errorHandler } from '../../middlewares/errorHandler.middleware'
import typeTransfersController from '../../controllers/typeTransfers.controllers'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import { createTypeTransfer } from '../../middlewares/validators/typeTransfers.validator'
import userAuth from '../../middlewares/userAuth.middlewares'
import checkRoles from '../../middlewares/checkRoles.middleware'
import { Roles } from '../../models/db/entity/auth.entity'

const typeTransfersRouter = Router()

typeTransfersRouter.post(
  '/',
  userAuth,
  checkRoles(Roles.ADMIN),
  schemaValidator(createTypeTransfer, null),
  typeTransfersController.createTypeTransfer,
  errorHandler
)

typeTransfersRouter.get(
  '/all',
  typeTransfersController.getAllTypeTransfers,
  errorHandler
)

export default typeTransfersRouter
