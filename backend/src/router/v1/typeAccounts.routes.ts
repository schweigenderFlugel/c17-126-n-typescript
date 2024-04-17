import { Router } from 'express'
import typesAccountsController from '../../controllers/typesAccounts.controllers'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import { createTypeAccount } from '../../middlewares/validators/types-account.validator'
import { errorHandler } from '../../middlewares/errorHandler.middleware'

const typesAccountsRouter = Router()

typesAccountsRouter.post(
  '/',
  schemaValidator(createTypeAccount, null),
  typesAccountsController.createTypeAccount,
  errorHandler
)

typesAccountsRouter.get(
  '/all',
  typesAccountsController.getAllTypeAccounts,
  errorHandler
)

export default typesAccountsRouter
