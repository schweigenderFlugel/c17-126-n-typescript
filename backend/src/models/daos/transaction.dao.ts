import { TRANSACTION_STATUS } from '../../config/constants'
import { ITransaction } from '../../interfaces/transaction.interface'
import { Transaction, TransactionModel } from '../db/entity/transaction.entity'

export default class TransactionDao {
  private static intance: TransactionDao | null = null

  private constructor() {}

  static getInstance() {
    if (!this.intance) {
      this.intance = new TransactionDao()
    }

    return this.intance
  }

  /**
   * Creates a new transaction with the given transaction payload.
   *
   * @param {ITransaction} transactionPayload - the payload for creating the transaction
   * @return {Promise<TransactionModel>} the created transaction model
   */
  async createTransaction(
    transactionPayload: ITransaction
  ): Promise<TransactionModel> {
    const transactionCreated: TransactionModel =
      await Transaction.create(transactionPayload)
    return transactionCreated
  }

  /**
   * Retrieves a transaction by its ID.
   *
   * @param {number} id - The ID of the transaction to retrieve
   * @return {Promise<TransactionModel | null>} The transaction model if found, otherwise null
   */
  async getTransactionById(id: number): Promise<TransactionModel | null> {
    const transactionFound = await Transaction.findByPk(id)
    return transactionFound
  }

  /**
   * Retrieves all transactions from the database.
   *
   * @return {Promise<TransactionModel[]>} An array of transaction models.
   */
  async getAllTransactions(): Promise<TransactionModel[]> {
    const transactionsFound = await Transaction.findAll()
    return transactionsFound
  }

  /**
   * Retrieves all transactions by the source account ID.
   *
   * @param {number} accountId - The ID of the source account.
   * @return {Promise<TransactionModel[]>} An array of transaction models.
   */
  async getAllTransactionsBySourceAccount(
    accountId: number
  ): Promise<TransactionModel[]> {
    const transactionsFound = await Transaction.findAll({
      where: { source_account: accountId },
    })
    return transactionsFound
  }

  /**
   * Retrieves all transactions by the destination account ID.
   *
   * @param {number} accountId - The ID of the destination account.
   * @return {Promise<TransactionModel[]>} An array of transaction models.
   */
  async getAllTransactionsByDestinationAccount(
    accountId: number
  ): Promise<TransactionModel[]> {
    const transactionsFound = await Transaction.findAll({
      where: { destination_account: accountId },
    })
    return transactionsFound
  }

  /**
   * Retrieves all transactions by the destination account ID and status.
   *
   * @param {number} accountId - The ID of the destination account.
   * @param {TRANSACTION_STATUS} status - The status of the transactions.
   * @return {Promise<TransactionModel[]>} An array of transaction models.
   */
  async getAllTransactionsByDestinationAccountAndStatus(
    accountId: number,
    status: TRANSACTION_STATUS
  ): Promise<TransactionModel[]> {
    const transactionsFound = await Transaction.findAll({
      where: { destination_account: accountId, status },
    })
    return transactionsFound
  }

  /**
   * Updates a transaction in the database.
   *
   * @param {number} id - The ID of the transaction to update.
   * @param {ITransaction} transactionPayload - The updated transaction payload.
   * @return {Promise<TransactionModel | null>} The updated transaction model or null if not found.
   */
  async updateTransactionById(
    id: number,
    transactionPayload: ITransaction
  ): Promise<TransactionModel> {
    const transactionUpdated = await Transaction.update(transactionPayload, {
      where: { id },
      returning: true,
    })
    return transactionUpdated[1][0]
  }

  /**
   * Deletes a transaction by its ID.
   *
   * @param {number} id - The ID of the transaction to delete
   * @return {Promise<number>} The number of transactions deleted
   */
  async deleteTransactionById(id: number): Promise<number> {
    const transactionDeleted = await Transaction.destroy({ where: { id } })
    return transactionDeleted
  }
}
