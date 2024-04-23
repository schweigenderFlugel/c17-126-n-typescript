import { Router } from 'express'

import transfersController from '../../controllers/transfers.controllers'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import { createTransfer } from '../../middlewares/validators/transfers.validator'
import { errorHandler } from '../../middlewares/errorHandler.middleware'
import checkRoles from '../../middlewares/checkRoles.middleware'
import { Roles } from '../../models/db/entity/auth.entity'
import userAuth from '../../middlewares/userAuth.middlewares'

const transferRouter = Router()

transferRouter.post(
  '/',
  userAuth,
  schemaValidator(createTransfer, null),
  checkRoles(Roles.NORMAL),
  transfersController.createTransfer,
  errorHandler
)

export default transferRouter
