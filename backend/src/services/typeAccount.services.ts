import { ITypeAccount } from '../interfaces/type-account.interface'
import typeAccountDao from '../models/daos/type-account.dao'
import { TypeAccountModel } from '../models/db/entity/type-account.entity'

export default class typeAccountService {
  /**
   * A description of the entire function.
   *
   * @param {ITypeAccount} typeAccountPayload - description of parameter
   * @return {Promise<ITypeAccount>} description of return value
   */
  static async createTypeAccount(
    typeAccountPayload: ITypeAccount
  ): Promise<ITypeAccount> {
    const typeAccountCreated = await typeAccountDao
      .getInstance()
      .createTypeAccount(typeAccountPayload)
    return typeAccountCreated
  }

  /**
   * Retrieves a TypeAccountModel by its ID.
   *
   * @param {number} id - The ID of the TypeAccountModel to retrieve.
   * @return {Promise<TypeAccountModel | null>} The TypeAccountModel found, or null if not found.
   */
  static async getTypeAccountById(
    id: number
  ): Promise<TypeAccountModel | null> {
    const authFound = await typeAccountDao.getInstance().getTypeAccountById(id)
    return authFound
  }

  /**
   * Retrieves a TypeAccountModel by its name.
   *
   * @param {string} name - The name of the TypeAccountModel to retrieve.
   * @return {Promise<TypeAccountModel | null>} The TypeAccountModel found, or null if not found.
   */
  static async getTypeAccountByName(
    name: string
  ): Promise<TypeAccountModel | null> {
    const authFound = await typeAccountDao
      .getInstance()
      .getTypeAccountByName(name)
    return authFound
  }

  /**
   * Retrieves all account types from the database.
   *
   * @return {Promise<TypeAccountModel[]>} An array of account types
   */
  static async getAllAccountTypes(): Promise<TypeAccountModel[]> {
    const accountTypesFound = await typeAccountDao
      .getInstance()
      .getAllAccountTypes()
    return accountTypesFound
  }

  /**
   * Updates an account type in the database.
   *
   * @param {number} id - The ID of the account type to update.
   * @param {ITypeAccount} typeAccountPayload - The payload containing the updated account type information.
   * @return {Promise<TypeAccountModel | null>} A Promise resolving to the updated account type model or null if not found.
   */
  static async updateAccountType(
    id: number,
    typeAccountPayload: ITypeAccount
  ): Promise<TypeAccountModel | null> {
    const accountTypehUpdated = await typeAccountDao
      .getInstance()
      .updateAccountType(id, typeAccountPayload)
    return accountTypehUpdated
  }

  /**
   * Deletes an account type from the database.
   *
   * @param {number} id - The ID of the account type to be deleted.
   * @return {Promise<number>} The number of account types deleted.
   */
  static async deleteAccountType(id: number): Promise<number> {
    const accountTypeDeleted = await typeAccountDao
      .getInstance()
      .deleteAccountType(id)
    return accountTypeDeleted
  }
}
