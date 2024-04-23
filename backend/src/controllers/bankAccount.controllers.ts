import { Request, Response, NextFunction, response } from 'express'
import bankAccountService from '../services/bankAccount.services'
import { HTTP_STATUS } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import apiSuccessResponse from '../utils/apiResponse.utils'

export default class bankAccountController {
  static async depositMoney(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { accountId, amount } = req.body
      const accountFound =
        await bankAccountService.getBankAccountById(accountId)

      if (!accountFound) {
        throw new HttpError(
          'Account not found',
          'Account not found',
          HTTP_STATUS.NOT_FOUND
        )
      }
      if (!amount || amount <= 0) {
        throw new HttpError(
          'Must provide an amount',
          'Amount not found',
          HTTP_STATUS.BAD_REQUEST
        )
      }

      accountFound.dataValues.balance = accountFound.dataValues.balance + amount

      const accountUpdated = await bankAccountService.updateBankAccount(
        accountId,
        accountFound.dataValues
      )

      if (!accountUpdated) {
        throw new HttpError(
          'Account was not updated',
          'Account was not updated',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const response = apiSuccessResponse(accountUpdated)

      res.status(HTTP_STATUS.OK).json(response)
    } catch (err) {
      next(err)
    }
  }
}
