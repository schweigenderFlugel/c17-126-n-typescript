import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS, TRANSACTION_STATUS } from '../config/constants'
import bankAccountService from '../services/bankAccount.services'
import HttpError from '../utils/HttpError.utils'
import { IDestinationAccountData, ISourceAccountData } from '../interfaces/bankAccount.interface'
import transactionService from '../services/transaction.services'
import { ITransaction, ITransactionData } from '../interfaces/transaction.interface'
import { IUserToken } from '../interfaces/user.interface'
import apiSuccessResponse from '../utils/apiResponse.utils'
import transactionHelper from '../utils/transactionsHelper'

export default class transfersController {
  static async getTransferDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const transactionId = req.params.id as unknown as number;
      const requestingUser = req.user as IUserToken;
    
      if (!requestingUser || !requestingUser.id) throw new HttpError(
        'Token payload error',
        'Token payload error',
        HTTP_STATUS.FORBIDDEN
      )

      const transactionFound = await transactionService.getTransactionById(transactionId);

      if (!transactionFound) throw new HttpError(
        'Transaction not found',
        'Transaction not found',
        HTTP_STATUS.NOT_FOUND
      )

      const transactionData: ITransactionData = 
        transactionFound.dataValues as ITransactionData;

      res.status(200).json(transactionData);
    } catch (error) {
      next(error)
    }
  }

  static async createTransfer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { source_account, destination_alias, amount, type } = req.body

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

      const requestingUser = req.user as IUserToken

      if (requestingUser.id !== sourceAccountData.user.dataValues.auth.dataValues.id) {
        throw new HttpError(
          'You are not allowed to perform this action',
          'You are not allowed to perform this action',
          HTTP_STATUS.CONFLICT
        )
      }

      const destinationAccountFound =
        await bankAccountService.getBankAccountByUserAlias(destination_alias)

      if (!destinationAccountFound) {
        throw new HttpError(
          'Destination Account not found',
          'Destination Account not found',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const destinationAccountData: IDestinationAccountData = 
        destinationAccountFound.dataValues as IDestinationAccountData;

      if (sourceAccountData.id === destinationAccountFound.id) {
        throw new HttpError(
          'The source and the destination account are the same',
          'The source and the destination account are the same',
          HTTP_STATUS.BAD_REQUEST
        )
      }

      if (sourceAccountData.balance < amount) {
        throw new HttpError(
          'Insufficient funds',
          'Insufficient funds',
          HTTP_STATUS.FORBIDDEN
        )
      }

      const operationNumber = await transactionHelper.generateOperationNumber();

      const transactionPayload: Omit<ITransaction, 'historial_id'> = {
        operation_number: operationNumber,
        source_account: sourceAccountData.id,
        destination_account: destinationAccountFound.id,
        amount,
        type_transfer: type,
        date_transaction: new Date(),
        status: TRANSACTION_STATUS.PENDING,
      }

      const transactionCreated = await transactionService.transferTransaction(
        transactionPayload,
        sourceAccountData,
        destinationAccountData,
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
      console.log(err)
      next(err)
    }
  }
}
