import { HTTP_STATUS, TRANSACTION_STATUS } from '../config/constants'
import { ISourceAccountData } from '../interfaces/bankAccount.interface'
import { ITransaction } from '../interfaces/transaction.interface'
import transactionDao from '../models/daos/transaction.dao'
import HttpError from '../utils/HttpError.utils'
export default class transactionService {
  /**
   * Creates a transaction based on the provided payload.
   *
   * @param {ITransaction} transactionPayload - The payload containing the transaction information.
   * @return {Promise<ITransaction>} A promise that resolves to the created transaction.
   */
  static async createTransaction(
    transactionPayload: ITransaction
  ): Promise<ITransaction> {
    const transactionCreated = await transactionDao
      .getInstance()
      .createTransaction(transactionPayload)
    return transactionCreated
  }

  /**
   * Retrieves a transaction by its ID.
   *
   * @param {number} id - The ID of the transaction to retrieve
   * @return {Promise<ITransaction | null>} The transaction model if found, otherwise null
   */
  static async getTransactionById(id: number): Promise<ITransaction | null> {
    const transactionFound = await transactionDao
      .getInstance()
      .getTransactionById(id)
    return transactionFound
  }

  /**
   * Retrieves all transactions from the database.
   *
   * @return {Promise<ITransaction[]>} An array of transaction models.
   */
  static async getAllTransactions(): Promise<ITransaction[]> {
    const transactionsFound = await transactionDao
      .getInstance()
      .getAllTransactions()
    return transactionsFound
  }

  /**
   * Retrieves all transactions by the source account ID.
   *
   * @param {number} accountId - The ID of the source account.
   * @return {Promise<ITransaction[]>} An array of transaction models.
   */
  static async getAllTransactionsBySourceAccount(
    accountId: number
  ): Promise<ITransaction[]> {
    const transactionsFound = await transactionDao
      .getInstance()
      .getAllTransactionsBySourceAccount(accountId)
    return transactionsFound
  }

  /**
   * Retrieves all transactions by the destination account ID.
   *
   * @param {number} accountId - The ID of the destination account.
   * @return {Promise<ITransaction[]>} An array of transaction models.
   */
  static async getAllTransactionsByDestinationAccount(
    accountId: number
  ): Promise<ITransaction[]> {
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
   * @return {Promise<ITransaction[]>} An array of transaction models.
   */
  static async getAllTransactionsByDestinationAccountAndStatus(
    accountId: number,
    status: TRANSACTION_STATUS
  ): Promise<ITransaction[]> {
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
   * @return {Promise<ITransaction>} A Promise that resolves to the updated transaction.
   */
  static async updateTransactionById(
    id: number,
    transactionPayload: ITransaction
  ): Promise<ITransaction> {
    const transactionUpdated = await transactionDao
      .getInstance()
      .updateTransactionById(id, transactionPayload)
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
    amount: number
  ): Promise<Boolean> {
    const sourceAccountUpdated = await transactionDao
      .getInstance()
      .transferTransaction(transactionPayload, sourceAccountData, amount)

    if (!sourceAccountUpdated) {
      throw new HttpError(
        'Source Account not updated',
        'Source Account not updated',
        HTTP_STATUS.SERVER_ERROR
      )
    }

    return true
  }
}
