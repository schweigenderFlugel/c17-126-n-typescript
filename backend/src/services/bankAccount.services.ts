import { IBankAccount, IGenerateBankAccount } from '../interfaces/bankAccount.interface'
import bankAccountDao from '../models/daos/bankAccount.dao'

export default class bankAccountService {
  /**
   * Creates a new bank account with the given bank account payload.
   *
   * @param {IBankAccount} bankAccountPayload - The payload for creating the bank account.
   * @return {Promise<IBankAccount>} The created bank account.
   */
  static async createBankAccount(
    bankAccountPayload: IGenerateBankAccount
  ): Promise<IBankAccount> {
    const bankAccountCreated = await bankAccountDao
      .getInstance()
      .createBankAccount(bankAccountPayload)
    return bankAccountCreated
  }

  /**
   * Retrieves a bank account by its ID.
   *
   * @param {number} id - The ID of the bank account to retrieve.
   * @return {Promise<IBankAccount | null>} The bank account found, or null if not found.
   */
  static async getBankAccountById(id: number): Promise<IBankAccount | null> {
    const bankAccountFound = await bankAccountDao
      .getInstance()
      .getBankAccountById(id)
    return bankAccountFound
  }

  /**
   * Retrieves a bank account by its account number.
   *
   * @param {string} accountNumber - The account number to search for
   * @return {Promise<IBankAccount | null>} The bank account found, or null if not found
   */
  static async getBankAccountByAccountNumber(
    accountNumber: string
  ): Promise<IBankAccount | null> {
    const bankAccountFound = await bankAccountDao
      .getInstance()
      .getBankAccountByAccountNumber(accountNumber)
    return bankAccountFound
  }

  /**
   * Updates a bank account by its ID with the provided bank account payload.
   *
   * @param {number} id - The ID of the bank account to update.
   * @param {IBankAccount} bankAccountPayload - The payload containing the updated bank account information.
   * @return {Promise<IBankAccount | null>} The updated bank account model or null if not found.
   */
  static async updateBankAccount(
    id: number,
    bankAccountPayload: IBankAccount
  ): Promise<IBankAccount | null> {
    const bankAccountUpdated = await bankAccountDao
      .getInstance()
      .updateBankAccount(id, bankAccountPayload)
    return bankAccountUpdated
  }

  /**
   * Deletes a bank account with the given ID.
   *
   * @param {number} id - The ID of the bank account to be deleted.
   * @return {Promise<number>} The number of bank accounts deleted.
   */
  static async deleteBankAccount(id: number): Promise<number> {
    const bankAccountDeleted = await bankAccountDao
      .getInstance()
      .deleteBankAccount(id)
    return bankAccountDeleted
  }
}
