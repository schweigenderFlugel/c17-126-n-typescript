import { Router } from 'express'
import bankAccountController from '../../controllers/bankAccount.controllers'
import userAuth from '../../middlewares/userAuth.middlewares'
import schemaValidator from '../../middlewares/schemasValidator.middlewares'
import { depositMoney } from '../../middlewares/validators/bankAccount.validator'

const bankAccountRouter = Router()

bankAccountRouter.post(
  '/deposit',
  userAuth,
  schemaValidator(depositMoney, null),
  bankAccountController.depositMoney
)

export default bankAccountRouter
