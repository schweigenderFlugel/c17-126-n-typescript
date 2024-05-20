import { IBankAccount } from '../interfaces/bankAccount.interface'
import { IUser } from '../interfaces/user.interface'
import bankAccountDao from '../models/daos/bankAccount.dao'
import { BankAccountModel } from '../models/db/entity/bank-account.entity'

export default class bankAccountService {
  /**
   * Creates a new bank account with the given bank account payload.
   *
   * @param {IGenerateBankAccount} bankAccountPayload - The payload for creating the bank account.
   * @return {Promise<BankAccountModel>} The created bank account.
   */
  static async createBankAccount(
    bankAccountPayload: IBankAccount
  ): Promise<BankAccountModel> {
    const bankAccountCreated = await bankAccountDao
      .getInstance()
      .createBankAccount(bankAccountPayload)
    return bankAccountCreated
  }

  /**
   * Retrieves a bank account by its ID.
   *
   * @param {IBankAccount['id']} id - The ID of the bank account to retrieve.
   * @return {Promise<BankAccountModel | null>} The bank account found, or null if not found.
   */
  static async getBankAccountById(
    id: IBankAccount['id']
  ): Promise<BankAccountModel | null> {
    const bankAccountFound = await bankAccountDao
      .getInstance()
      .getBankAccountById(id)
    return bankAccountFound
  }

  /**
   * Retrieves a bank account by its account number.
   *
   * @param {string} accountNumber - The account number to search for
   * @return {Promise<BankAccountModel | null>} The bank account found, or null if not found
   */
  static async getBankAccountByAccountNumber(
    accountNumber: string
  ): Promise<BankAccountModel | null> {
    const bankAccountFound = await bankAccountDao
      .getInstance()
      .getBankAccountByAccountNumber(accountNumber)
    return bankAccountFound
  }

  static async getBankAccountWithUserPreferences(bankAccountId: IBankAccount['id']) {
    const bankAccountFound = await bankAccountDao
      .getInstance()
      .getBankAccountWithUserPreferences(bankAccountId)
    return bankAccountFound
  }

  static async getBankAccountByUserId(userId: IUser['id']) {
    const bankAccountFound = await bankAccountDao
      .getInstance()
      .getBankAccountByUserId(userId)
    return bankAccountFound
  }

  static async getBankAccountByUserAlias(userAlias: string) {
    const bankAccountFound = await bankAccountDao
      .getInstance()
      .getBankAccountByUserAlias(userAlias)
    return bankAccountFound
  }

  /**
   * Updates a bank account by its ID with the provided bank account payload.
   *
   * @param {IBankAccount['id']} id - The ID of the bank account to update.
   * @param {Partial<IBankAccount>} bankAccountPayload - The payload containing the updated bank account information.
   * @return {Promise<BankAccountModel | null>} The updated bank account model or null if not found.
   */
  static async updateBankAccount(
    id: IBankAccount['id'],
    bankAccountPayload: Partial<IBankAccount>,
  ): Promise<BankAccountModel | null> {
    const bankAccountUpdated = await bankAccountDao
      .getInstance()
      .updateBankAccount(id, bankAccountPayload)
    return bankAccountUpdated
  }

  /**
   * Deletes a bank account with the given ID.
   *
   * @param {IBankAccount['id']} id - The ID of the bank account to be deleted.
   * @return {Promise<number>} The number of bank accounts deleted.
   */
  static async deleteBankAccount(id: IBankAccount['id']): Promise<number> {
    const bankAccountDeleted = await bankAccountDao
      .getInstance()
      .deleteBankAccount(id)
    return bankAccountDeleted
  }
}
