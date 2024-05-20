import { TRANSACTION_STATUS } from '../../config/constants'
import {
  IBankAccount,
  IDestinationAccountData,
  ISourceAccountData,
} from '../../interfaces/bankAccount.interface'
import { ITransaction } from '../../interfaces/transaction.interface'
import { User } from '../db'
import { sequelize } from '../db/database.manager'
import { BankAccount, BankAccountModel } from '../db/entity/bank-account.entity'
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
   * @param {ITransaction['id']} id - The ID of the transaction to retrieve
   * @return {Promise<TransactionModel | null>} The transaction model if found, otherwise null
   */
  async getTransactionById(id:ITransaction['id']): Promise<TransactionModel | null> {
    const transactionFound = await Transaction.findByPk(id, {
      attributes: ['operation_number', 'type_transfer', 'amount', 'date_transaction', 'status'],
      include: [{
        association: 'to',
        attributes: ['number_account'],
        include: [{
          model: User,
          attributes: ['name', 'lastname']
        }]
      },
      {
        association: 'from',
        attributes: ['number_account'],
        include: [{
          model: User,
          attributes: ['name', 'lastname']
        }]
      }
    ]
    })
    return transactionFound;
  }

  /**
   * Retrieves a transaction by its operation number
   *
   * @param {number} operationNumber - The operation number of the transaction to retrieve
   * @return {Promise<TransactionModel | null>} The transaction operation number if found, otherwise null
   */
  async getTransactionByOperationNumber(
    operationNumber: number
  ): Promise<TransactionModel | null> {
    const transactionFound = await Transaction.findOne({
      where: { operation_number: operationNumber },
      attributes: ['operation_number']
    })
    return transactionFound;
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
    accountId: IBankAccount['id']
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
    accountId: IBankAccount['id']
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
   * @param {ITransaction['id']} id - The ID of the transaction to update.
   * @param {Partial<ITransaction>} transactionPayload - The updated transaction payload.
   * @return {Promise<TransactionModel | null>} The updated transaction model or null if not found.
   */
  async updateTransactionById(
    id: ITransaction['id'],
    transactionPayload: Partial<ITransaction>
  ): Promise<TransactionModel> {
    const transactionUpdated = await Transaction.update(transactionPayload, {
      where: { id },
      returning: true,
    })
    return transactionUpdated[1][0]
  }

  async updateManyTransactions(
    transactions: ITransaction[],
    bankAccount: IBankAccount
  ): Promise<{
    transactionUpdated: TransactionModel[]
    bankAccountUpdated: BankAccountModel
  }> {
    const transaction = await sequelize.transaction()

    try {
      const updatePromises = transactions.map(async transactionData => {
        transactionData.status = TRANSACTION_STATUS.SUCCESS
        const [count, updatedRows] = await Transaction.update(transactionData, {
          where: { id: transactionData.id },
          returning: true,
          transaction,
        })
        return updatedRows[0]
      })

      const updatedTransactions = await Promise.all(updatePromises)
      const [count, bankAccountUpdated] = await BankAccount.update(
        bankAccount,
        { where: { id: bankAccount.id }, returning: true, transaction }
      )

      // Confirmar la transacción
      await transaction.commit()

      return {
        transactionUpdated: updatedTransactions,
        bankAccountUpdated: bankAccountUpdated[0],
      }
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback()
      throw error
    }
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

  async transferTransaction(
    transactionPayload: ITransaction,
    sourceAccountPayload: ISourceAccountData,
    destinationAccountPayload: IDestinationAccountData,
  ): Promise<TransactionModel | null> {
    const transaction = await sequelize.transaction()
    try {
      const transactionCreated = await Transaction.create(transactionPayload, {
        transaction: transaction,
      })

      await BankAccount.update(sourceAccountPayload,
        {
          where: { id: sourceAccountPayload.id },
          transaction: transaction,
        }
      )

      await BankAccount.update(destinationAccountPayload,
        {
          where: { id: destinationAccountPayload.id },
          transaction: transaction,
        }
      )

      await transaction.commit()
      return transactionCreated
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
