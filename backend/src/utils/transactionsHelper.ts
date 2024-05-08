import { HTTP_STATUS, TRANSACTION_STATUS, TYPETRANSFERS } from '../config/constants'
import { IBankAccount } from '../interfaces/bankAccount.interface'
import { ITransaction } from '../interfaces/transaction.interface'
import { TransactionModel } from '../models/db/entity/transaction.entity'
import transactionService from '../services/transaction.services'
import HttpError from './HttpError.utils';

export default class transactionHelper {
  static async transactionsImprover(
    transactions: TransactionModel[],
    bankAccount: IBankAccount
  ): Promise<{
    allTransactions: ITransaction[]
    resultBankAccount: IBankAccount
  }> {
    let total: number = 0

    const allTransactions: ITransaction[] = []
    const transactionsToUpdate: ITransaction[] = []

    transactions.forEach(async (transaction: TransactionModel) => {
      const transactionDayTranscepted = this.calculateDaysElapsed(
        transaction.dataValues.date_transaction
      )

      const isDeferedAndTransferable =
        transaction.dataValues.type_transfer === TYPETRANSFERS.DEFERRED &&
        transactionDayTranscepted >= 1

      if (
        transaction.dataValues.status === TRANSACTION_STATUS.PENDING &&
        (transaction.dataValues.type_transfer === TYPETRANSFERS.DEFERRED ||
          isDeferedAndTransferable)
      ) {
        transactionsToUpdate.push(transaction.dataValues)
        bankAccount.balance += Number(transaction.dataValues.amount)
        total += Number(transaction.dataValues.amount)
      } else {
        allTransactions.push(transaction.dataValues)
      }
    })

    let resultBankAccount = bankAccount

    if (transactionsToUpdate.length > 0) {
      const { transactionUpdated, bankAccountUpdated } =
        await transactionService.updateManyTransactions(
          transactionsToUpdate,
          bankAccount
        )

      resultBankAccount = bankAccountUpdated.dataValues as IBankAccount

      if (!transactionUpdated) {
        throw new HttpError(
          'Error updating transactions',
          'Error updating transactions',
          HTTP_STATUS.SERVER_ERROR
        )
      }

      allTransactions.push(...transactionUpdated)
    }

    return {
      allTransactions,
      resultBankAccount,
    }
  }

  static calculateDaysElapsed(desde: Date): number {
    // Fecha actual
    const today = new Date()

    // Convertir ambas fechas a milisegundos desde el 1 de enero de 1970
    const dateSince = desde.getTime()
    const dateToday = today.getTime()

    // Calcular la diferencia en milisegundos
    const msDiference = dateToday - dateSince

    // Convertir la diferencia de milisegundos a días (1 día = 86400000 milisegundos)
    const daysElapsed = Math.floor(msDiference / (1000 * 60 * 60 * 24))

    return daysElapsed
  }

  static async updateTransactionStatus(
    transaction: TransactionModel
  ): Promise<TransactionModel> {
    const id: number = transaction.dataValues.id as number
    const transactionPayload: ITransaction = transaction.dataValues
    transactionPayload.status = TRANSACTION_STATUS.SUCCESS

    const transactionUpdated = await transactionService.updateTransactionById(
      id,
      transactionPayload
    )

    if (!transactionUpdated) {
      throw new HttpError(
        'Transaction was not updated',
        'Transaction was not updated',
        HTTP_STATUS.SERVER_ERROR
      )
    }

    return transactionUpdated
  }

  static async generateOperationNumber(): Promise<number> {
    while (true) {
      const operationNumber = Math.floor(Math.random() * 10**16);
      const transactionFound =
        await transactionService.getTransactionByOperationNumber(operationNumber)

      if (!transactionFound) {
        return operationNumber;
      }
    }
  }
}
