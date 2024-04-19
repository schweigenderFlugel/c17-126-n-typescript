import { ITypeAccount } from '../../interfaces/type-account.interface'
import { TypeAccount, TypeAccountModel } from '../db/entity/type-account.entity'

export default class typeAccountDao {
  private static intance: typeAccountDao | null = null

  private constructor() {}

  static getInstance(): typeAccountDao {
    if (!this.intance) {
      this.intance = new typeAccountDao()
    }

    return this.intance
  }

  /**
   * Creates a new type account with the given payload.
   *
   * @param {ITypeAccount} typeAccountPayload - The payload for creating the type account.
   * @return {Promise<TypeAccountModel>} The created type account.
   */
  async createTypeAccount(
    typeAccountPayload: ITypeAccount
  ): Promise<TypeAccountModel> {
    const typeAccountCreated: TypeAccountModel =
      await TypeAccount.create(typeAccountPayload)
    return typeAccountCreated
  }

  /**
   * Retrieves a type account by its ID.
   *
   * @param {number} id - The ID of the type account to retrieve
   * @return {Promise<Model<ITypeAccount> | null>} The type account found, or null if not found
   */
  async getTypeAccountById(id: number): Promise<TypeAccountModel | null> {
    const typeAccountFound: TypeAccountModel | null =
      await TypeAccount.findByPk(id)
    return typeAccountFound
  }

  /**
   * Retrieves a TypeAccountModel by its name.
   *
   * @param {string} name - The name of the TypeAccountModel to retrieve.
   * @return {Promise<TypeAccountModel | null>} The TypeAccountModel found, or null if not found.
   */
  async getTypeAccountByName(name: string): Promise<TypeAccountModel | null> {
    const typeAccountFound: TypeAccountModel | null = await TypeAccount.findOne(
      { where: { name } }
    )
    return typeAccountFound
  }

  /**
   * Retrieves all account types from the database.
   *
   * @return {Promise<TypeAccountModel[]>} An array of account types
   */
  async getAllAccountTypes(): Promise<TypeAccountModel[]> {
    const accountTypesFound: TypeAccountModel[] = await TypeAccount.findAll()
    return accountTypesFound
  }

  /**
   * Updates an account type in the database.
   *
   * @param {number} id - The ID of the account type to update.
   * @param {ITypeAccount} typeAccountPayload - The payload containing the updated account type information.
   * @return {Promise<TypeAccountModel | null>} A Promise resolving to the updated account type model or null if not found.
   */
  async updateAccountType(
    id: number,
    typeAccountPayload: ITypeAccount
  ): Promise<TypeAccountModel | null> {
    const accountTypeUpdated = await TypeAccount.update(typeAccountPayload, {
      where: { id },
      returning: true,
    })
    return accountTypeUpdated[1][0]
  }

  /**
   * Deletes an account type from the database.
   *
   * @param {number} id - The ID of the account type to be deleted.
   * @return {Promise<number>} The number of account types deleted.
   */
  async deleteAccountType(id: number): Promise<number> {
    const accountTypeDeleted = await TypeAccount.destroy({
      where: { id },
    })
    return accountTypeDeleted
  }
}
