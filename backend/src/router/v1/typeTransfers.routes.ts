import { Router } from 'express'
import { errorHandler } from '../../middlewares/errorHandler.middleware'
import typeTransfersController from '../../controllers/typeTransfers.controllers'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import { createTypeTransfer } from '../../middlewares/validators/typeTransfers.validator'

const typeTransfersRouter = Router()

typeTransfersRouter.post(
  '/',
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
