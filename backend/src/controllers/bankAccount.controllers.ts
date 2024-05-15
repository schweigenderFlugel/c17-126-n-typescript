import { Request, Response, NextFunction, response } from 'express'
import bankAccountService from '../services/bankAccount.services'
import { HTTP_STATUS } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import apiSuccessResponse from '../utils/apiResponse.utils'
import { IUserToken } from '../interfaces/user.interface'
import transactionService from '../services/transaction.services'
import transactionHelper from '../utils/transactionsHelper'
import { ITokenPayload } from '../interfaces/token.interface'
import { IAccountData } from '../interfaces/bankAccount.interface'
import HistorialUtils from '../utils/historial.utils'

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
      const accountId = req.params.id as unknown as number;
      const { amount } = req.body;

      const tokenPayload: ITokenPayload = req.user as ITokenPayload

      if (!tokenPayload || !tokenPayload.id) {
        throw new HttpError(
          'Token payload error',
          'Token payload error',
          HTTP_STATUS.FORBIDDEN
        )
      }

      const accountFound =
        await bankAccountService.getBankAccountById(accountId)

      if (!accountFound) {
        throw new HttpError(
          'Account not found',
          'Account not found',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const accountData: IAccountData =
        accountFound.dataValues as unknown as IAccountData;

      if (accountData.user.auth.id !== tokenPayload.id) {
        throw new HttpError(
          'Conflict',
          'Conclict with bank account and id from the token payload',
          HTTP_STATUS.CONFLICT
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

      const historialUpdated = await HistorialUtils.updateHistorials(accountFound);
      
      const response = apiSuccessResponse({
        accountUpdated,
        historialUpdated,
      })

      res.status(HTTP_STATUS.OK).json(response)
    } catch (err) {
      console.log(err)
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

      const transactionsReceivedFound =
        await transactionService.getAllTransactionsByDestinationAccount(
          accountFound.id
        )

      const transactionsMadeFound =
        await transactionService.getAllTransactionsBySourceAccount(
          accountFound.id
        )

      let response = apiSuccessResponse({
        accountFound,
        transactionsMade: transactionsMadeFound,
        transactionsReceived: transactionsReceivedFound,
      })

      if (transactionsReceivedFound) {
        const amountImproved = await transactionHelper.transactionsImprover(
          transactionsReceivedFound,
          accountFound.dataValues
        )

        response = apiSuccessResponse({
          accountFound: amountImproved.resultBankAccount,
          transactionsReceivedFound: amountImproved.allTransactions,
          transactionsMade: transactionsMadeFound,
        })
      }

      res.status(HTTP_STATUS.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}
