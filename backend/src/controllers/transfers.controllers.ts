import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS, TRANSACTION_STATUS } from '../config/constants'
import bankAccountService from '../services/bankAccount.services'
import HttpError from '../utils/HttpError.utils'
import { ISourceAccountData } from '../interfaces/bankAccount.interface'
import transactionService from '../services/transaction.services'
import typeTrnasfersService from '../services/typeTransfers.services'
import { ITransaction } from '../interfaces/transaction.interface'
import { IUserToken } from '../interfaces/user.interface'
import apiSuccessResponse from '../utils/apiResponse.utils'

export default class transfersController {
  static async createTransfer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { source_account, destination_account, amount, type } = req.body

      const requestingUser = req.user as IUserToken

      if (requestingUser.id !== source_account) {
        throw new HttpError(
          'You are not allowed to perform this action',
          'You are not allowed to perform this action',
          HTTP_STATUS.UNAUTHORIZED
        )
      }

      const sourceAccountFound =
        await bankAccountService.getBankAccountWithUserPreferences(
          source_account
        )

      if (!sourceAccountFound) {
        throw new HttpError(
          'Source Account not found',
          'Source Account not found',
          HTTP_STATUS.NOT_FOUND
        )
      }
      const sourceAccountData: ISourceAccountData =
        sourceAccountFound.dataValues as ISourceAccountData

      const destinationAccountFound =
        await bankAccountService.getBankAccountById(destination_account)

      if (!destinationAccountFound) {
        throw new HttpError(
          'Destination Account not found',
          'Destination Account not found',
          HTTP_STATUS.NOT_FOUND
        )
      }

      if (sourceAccountData.balance < amount) {
        throw new HttpError(
          'Insufficient funds',
          'Insufficient funds',
          HTTP_STATUS.UNAUTHORIZED
        )
      }

      const typeTrnasferFound =
        await typeTrnasfersService.getTypeTransfersByName(type)

      if (!typeTrnasferFound) {
        throw new HttpError(
          'Type Transfer not found',
          'Type Transfer not found',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const transactionPayload: ITransaction = {
        source_account: sourceAccountData.id,
        destination_account: destinationAccountFound.id,
        amount,
        type_transfer_id: typeTrnasferFound.id,
        date_transaction: new Date(),
        status: TRANSACTION_STATUS.PENDING,
      }

      const transactionCreated = await transactionService.transferTransaction(
        transactionPayload,
        sourceAccountData,
        amount
      )

      if (!transactionCreated) {
        throw new HttpError(
          'Transaction not created',
          'Transaction not created',
          HTTP_STATUS.SERVER_ERROR
        )
      }

      const response = apiSuccessResponse(transactionCreated)

      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }
}
