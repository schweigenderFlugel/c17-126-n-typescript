import { TRANSACTION_STATUS } from '../config/constants'
import {
  IBankAccount,
  IDestinationAccountData,
  ISourceAccountData,
} from '../interfaces/bankAccount.interface'
import { ITransaction } from '../interfaces/transaction.interface'
import transactionDao from '../models/daos/transaction.dao'
import { BankAccountModel } from '../models/db/entity/bank-account.entity'
import { TransactionModel } from '../models/db/entity/transaction.entity'
export default class transactionService {
  /**
   * Creates a transaction based on the provided payload.
   *
   * @param {ITransaction} transactionPayload - The payload containing the transaction information.
   * @return {Promise<TransactionModel>} A promise that resolves to the created transaction.
   */
  static async createTransaction(
    transactionPayload: ITransaction
  ): Promise<TransactionModel> {
    const transactionCreated = await transactionDao
      .getInstance()
      .createTransaction(transactionPayload)
    return transactionCreated
  }

  /**
   * Retrieves a transaction by its ID.
   *
   * @param {number} id - The ID of the transaction to retrieve
   * @return {Promise<TransactionModel | null>} The transaction model if found, otherwise null
   */
  static async getTransactionById(
    id: number
  ): Promise<TransactionModel | null> {
    const transactionFound = await transactionDao
      .getInstance()
      .getTransactionById(id)
    return transactionFound
  }

  /**
   * Retrieves a transaction by its operation number
   *
   * @param {number} operationNumber - The operation number of the transaction to retrieve
   * @return {Promise<TransactionModel | null>} The transaction operation number if found, otherwise null
   */
  static async getTransactionByOperationNumber(
    operationNumber: number
  ): Promise<TransactionModel | null> {
    const transactionFound = await transactionDao
      .getInstance()
      .getTransactionByOperationNumber(operationNumber)
    return transactionFound
  }

  /**
   * Retrieves all transactions from the database.
   *
   * @return {Promise<TransactionModel[]>} An array of transaction models.
   */
  static async getAllTransactions(): Promise<TransactionModel[]> {
    const transactionsFound = await transactionDao
      .getInstance()
      .getAllTransactions()
    return transactionsFound
  }

  /**
   * Retrieves all transactions by the source account ID.
   *
   * @param {number} accountId - The ID of the source account.
   * @return {Promise<TransactionModel[]>} An array of transaction models.
   */
  static async getAllTransactionsBySourceAccount(
    accountId: number
  ): Promise<TransactionModel[]> {
    const transactionsFound = await transactionDao
      .getInstance()
      .getAllTransactionsBySourceAccount(accountId)
    return transactionsFound
  }

  /**
   * Retrieves all transactions by the destination account ID.
   *
   * @param {number} accountId - The ID of the destination account.
   * @return {Promise<TransactionModel[]>} An array of transaction models.
   */
  static async getAllTransactionsByDestinationAccount(
    accountId: number
  ): Promise<TransactionModel[]> {
    const transactionsFound = await transactionDao
      .getInstance()
      .getAllTransactionsByDestinationAccount(accountId)
    return transactionsFound
  }

  /**
   * Retrieves all transactions by the destination account ID and status.
   *
   * @param {number} accountId - The ID of the destination account.
   * @param {TRANSACTION_STATUS} status - The status of the transactions.
   * @return {Promise<TransactionModel[]>} An array of transaction models.
   */
  static async getAllTransactionsByDestinationAccountAndStatus(
    accountId: number,
    status: TRANSACTION_STATUS
  ): Promise<TransactionModel[]> {
    const transactionsFound = await transactionDao
      .getInstance()
      .getAllTransactionsByDestinationAccountAndStatus(accountId, status)
    return transactionsFound
  }

  /**
   * Updates a transaction by its ID with the provided transaction payload.
   *
   * @param {number} id - The ID of the transaction to update.
   * @param {ITransaction} transactionPayload - The payload containing the updated transaction information.
   * @return {Promise<TransactionModel>} A Promise that resolves to the updated transaction.
   */
  static async updateTransactionById(
    id: number,
    transactionPayload: ITransaction
  ): Promise<TransactionModel> {
    const transactionUpdated = await transactionDao
      .getInstance()
      .updateTransactionById(id, transactionPayload)
    return transactionUpdated
  }

  static async updateManyTransactions(
    transactions: ITransaction[],
    bankAccount: IBankAccount
  ): Promise<{
    transactionUpdated: TransactionModel[]
    bankAccountUpdated: BankAccountModel
  }> {
    const transactionUpdated = await transactionDao
      .getInstance()
      .updateManyTransactions(transactions, bankAccount)
    return transactionUpdated
  }

  /**
   * Deletes a transaction by its ID.
   *
   * @param {number} id - The ID of the transaction to delete
   * @return {Promise<void>} A promise that resolves when the transaction is deleted
   */
  static async deleteTransactionById(id: number): Promise<void> {
    await transactionDao.getInstance().deleteTransactionById(id)
  }

  static async transferTransaction(
    transactionPayload: ITransaction,
    sourceAccountData: ISourceAccountData,
    destinationAccountPayload: IDestinationAccountData,
    amount: number
  ): Promise<TransactionModel | null> {
    const sourceAccountUpdated = await transactionDao
      .getInstance()
      .transferTransaction(
        transactionPayload, 
        sourceAccountData, 
        destinationAccountPayload,
        amount
      )

    return sourceAccountUpdated
  }
}
