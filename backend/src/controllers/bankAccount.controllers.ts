import { Request, Response, NextFunction, response } from 'express'
import bankAccountService from '../services/bankAccount.services'
import { HTTP_STATUS } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import apiSuccessResponse from '../utils/apiResponse.utils'
import { IUserToken } from '../interfaces/user.interface'
import transactionService from '../services/transaction.services'
import transactionHelper from '../utils/transactionsHelper'

export default class bankAccountController {
  /**
   * Deposits money into a bank account.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function.
   * @return {Promise<void>} Promise that resolves when the money is deposited.
   */
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

  static async getBalance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user as IUserToken

      const accountFound = await bankAccountService.getBankAccountByUserId(
        user.id
      )

      if (!accountFound) {
        throw new HttpError(
          'Account not found',
          'Account not found',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const transactionsFound =
        await transactionService.getAllTransactionsByDestinationAccount(
          accountFound.id
        )

      let response = apiSuccessResponse({ accountFound, transactionsFound })

      if (transactionsFound) {
        const amountToImprove = await transactionHelper.transactionsImprover(
          transactionsFound,
          accountFound.dataValues
        )

        response = apiSuccessResponse({
          accountFound: amountToImprove.resultBankAccount,
          transactionsFound: amountToImprove.allTransactions,
        })
      }

      res.status(HTTP_STATUS.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}
