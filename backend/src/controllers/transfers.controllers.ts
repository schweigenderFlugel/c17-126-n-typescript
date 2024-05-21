import { Request, Response, NextFunction } from 'express'
import { ERROR_MESSAGES, HTTP_STATUS, TRANSACTION_STATUS } from '../config/constants'
import bankAccountService from '../services/bankAccount.services'
import HttpError from '../utils/HttpError.utils'
import { IDestinationAccountData, ISourceAccountData } from '../interfaces/bankAccount.interface'
import transactionService from '../services/transaction.services'
import { ITransaction, ITransactionCreatedResponse, ITransactionDataDetails } from '../interfaces/transaction.interface'
import apiSuccessResponse from '../utils/apiResponse.utils'
import transactionHelper from '../utils/transactionsHelper'
import HistorialUtils from '../utils/historial.utils'
import { ITokenPayload } from '../interfaces/auth.interface'

export default class transfersController {
  static async getTransferDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const transactionId = req.params.id as unknown as ITransaction['id'];
      const requestingUser = req.user as ITokenPayload;
    
      if (!requestingUser || !requestingUser.id) throw new HttpError(
        ERROR_MESSAGES.TOKEN_ERROR,
        'Token payload error',
        HTTP_STATUS.FORBIDDEN
      )

      const transactionFound = await transactionService.getTransactionById(transactionId);

      if (!transactionFound) throw new HttpError(
        ERROR_MESSAGES.NOT_FOUND,
        'Transaction not found',
        HTTP_STATUS.NOT_FOUND
      )

      const transactionData: ITransactionDataDetails = 
        transactionFound.dataValues as ITransactionDataDetails;

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
          ERROR_MESSAGES.INVALID_CREDENTIALS,
          'Source Account not found',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const sourceAccountData: ISourceAccountData =
        sourceAccountFound.dataValues as ISourceAccountData

      const requestingUser = req.user as ITokenPayload

      if (requestingUser.id !== sourceAccountData.user.dataValues.auth.dataValues.id) {
        throw new HttpError(
          ERROR_MESSAGES.INVALID_CREDENTIALS,
          'You are not allowed to perform this action',
          HTTP_STATUS.CONFLICT
        )
      }

      const destinationAccountFound =
        await bankAccountService.getBankAccountByUserAlias(destination_alias)

      if (!destinationAccountFound) {
        throw new HttpError(
          ERROR_MESSAGES.ALIAS_NOT_FOUND,
          'Destination Account not found',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const destinationAccountData: IDestinationAccountData = 
        destinationAccountFound.dataValues as IDestinationAccountData;

      if (sourceAccountData.id === destinationAccountFound.id) {
        throw new HttpError(
          ERROR_MESSAGES.ACCOUNTS_VALIDATION_ERROR,
          'The source and the destination account are the same',
          HTTP_STATUS.BAD_REQUEST
        )
      }

      if (sourceAccountData.balance < amount) {
        throw new HttpError(
          ERROR_MESSAGES.INSUFFICIENT_FUNDS,
          'Insufficient funds',
          HTTP_STATUS.FORBIDDEN
        )
      }

      sourceAccountData.balance = sourceAccountData.balance - amount;
      sourceAccountData.expenses = sourceAccountData.expenses + amount;
      destinationAccountData.balance = destinationAccountData.balance + amount;

      const operationNumber = await transactionHelper.generateOperationNumber();

      const { historialId, historialUpdatedData } = await HistorialUtils.updateHistorials(sourceAccountData, destinationAccountData);

      const transactionPayload: ITransaction = {
        historial_id: historialId,
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
      )

      if (!transactionCreated) {
        throw new HttpError(
          'Transaction not created',
          'Transaction not created',
          HTTP_STATUS.SERVER_ERROR
        )
      }

      const transactionCreatedResponse: ITransactionCreatedResponse = {
        ...transactionCreated.dataValues,
        historial: { ...historialUpdatedData }
      }

      const response = apiSuccessResponse(transactionCreatedResponse)

      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }
}
