import { Router } from 'express'

import transfersController from '../../controllers/transfers.controllers'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import { createTransfer } from '../../middlewares/validators/transfers.validator'
import { errorHandler } from '../../middlewares/errorHandler.middleware'
import userAuth from '../../middlewares/userAuth.middlewares'

const transferRouter = Router()

transferRouter.get(
  '/:id',
  userAuth,
  transfersController.getTransferDetails,
  errorHandler
)


transferRouter.post(
  '/',
  userAuth,
  schemaValidator(createTransfer, null),
  transfersController.createTransfer,
  errorHandler
)

export default transferRouter
