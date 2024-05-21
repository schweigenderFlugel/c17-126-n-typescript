import { Request, Response, NextFunction } from 'express'
import bankAccountService from '../services/bankAccount.services'
import { ERROR_MESSAGES, HTTP_STATUS } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import apiSuccessResponse from '../utils/apiResponse.utils'
import { IAccountData, IBankAccount } from '../interfaces/bankAccount.interface'
import HistorialUtils from '../utils/historial.utils'
import { ITokenPayload } from '../interfaces/auth.interface'

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
      const accountId = req.params.id as unknown as IBankAccount['id'];
      const { amount } = req.body;

      const tokenPayload: ITokenPayload = req.user as ITokenPayload

      if (!tokenPayload || !tokenPayload.id) {
        throw new HttpError(
          ERROR_MESSAGES.TOKEN_ERROR,
          'Token payload error',
          HTTP_STATUS.FORBIDDEN
        )
      }

      const accountFound =
        await bankAccountService.getBankAccountById(accountId)

      if (!accountFound) {
        throw new HttpError(
          ERROR_MESSAGES.INVALID_CREDENTIALS,
          'Account not found',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const accountData: IAccountData =
        accountFound.dataValues as unknown as IAccountData;

      if (accountData.user.auth.id !== tokenPayload.id) {
        throw new HttpError(
          ERROR_MESSAGES.INVALID_CREDENTIALS,
          'Conclict with bank account and id from the token payload',
          HTTP_STATUS.CONFLICT
        )
      }

      if (!amount || amount <= 0) {
        throw new HttpError(
          ERROR_MESSAGES.NO_AMOUNT,
          'Amount not found',
          HTTP_STATUS.BAD_REQUEST
        )
      }

      accountFound.dataValues.balance = accountFound.dataValues.balance + amount

      const accountUpdated = await bankAccountService.updateBankAccount(
        accountId,
        accountFound.dataValues
      )

      const historialUpdated = await HistorialUtils.updateHistorials(accountFound, null);
      
      const response = apiSuccessResponse({
        accountUpdated,
        historialUpdated,
      })

      res.status(HTTP_STATUS.OK).json(response)
    } catch (err) {
      next(err)
    }
  }
}
