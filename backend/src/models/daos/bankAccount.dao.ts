import { Model } from 'sequelize'
import {
  IBankAccount,
  IGenerateBankAccount,
} from '../../interfaces/bankAccount.interface'
import { BankAccount, BankAccountModel } from '../db/entity/bank-account.entity'
import { Preferences } from '../db/entity/preference.entity'
import { User } from '../db/entity/user.entity'
import { Auth } from '../db'
import { IUser } from '../../interfaces/user.interface'

export default class bankAccountDao {
  private static intance: bankAccountDao | null = null

  private constructor() {}

  static getInstance(): bankAccountDao {
    if (!this.intance) {
      this.intance = new bankAccountDao()
    }

    return this.intance
  }

  /**
   * Creates a new bank account with the given bank account payload.
   *
   * @param {IBankAccount} bankAccountPayload - The payload for creating the bank account.
   * @return {Promise<BankAccountModel>} The created bank account.
   */
  async createBankAccount(
    bankAccountPayload: IGenerateBankAccount
  ): Promise<BankAccountModel> {
    const bankAccountCreated: BankAccountModel = await BankAccount.create(
      bankAccountPayload as IBankAccount
    )

    return bankAccountCreated
  }

  /**
   * A description of the entire function.
   *
   * @param {IBankAccount['id']} id - The ID of the bank account to retrieve
   * @return {Promise<BankAccountModel | null>} The bank account found, or null if not found
   */
  async getBankAccountById(id: IBankAccount['id']): Promise<BankAccountModel | null> {
    const bankAccountFound: BankAccountModel | null =
      await BankAccount.findByPk(id, {
        include: [{
          model: User,
          include: [{
            model: Auth,
            attributes: ['id']
          }]
        }]
      })
    return bankAccountFound
  }

  /**
   * Retrieves a bank account by its account number.
   *
   * @param {string} accountNumber - The account number to search for
   * @return {Promise<BankAccountModel | null>} The bank account found, or null if not found
   */
  async getBankAccountByAccountNumber(
    accountNumber: string
  ): Promise<BankAccountModel | null> {
    const bankAccountFound: BankAccountModel | null = await BankAccount.findOne(
      { where: { number_account: accountNumber } }
    )
    return bankAccountFound
  }

  async getBankAccountWithUserPreferences(bankAccountId: IBankAccount['id']) {
    const bankAccountFound = await BankAccount.findOne({
      where: { id: bankAccountId },
      include: [
        {
          model: User,
          attributes: ['alias', 'id'],
          include: [
            {
              model: Auth,
              attributes: ['id'],
            },
            {
              model: Preferences,
              attributes: ['max_ammount_transfers', 'min_ammount_transfers'],
          },]
        }],
    })
    return bankAccountFound;
  }

  async getBankAccountByUserId(userId: IUser['id']) {
    const bankAccountFound = await BankAccount.findOne({
      where: { userId: userId },
    })
    return bankAccountFound
  }

  async getBankAccountByUserAlias(userAlias: string) {
    const bankAccountFound = await BankAccount.findOne({
      include: [
        {
          model: User,
          where: { alias: userAlias },
          attributes: ['alias', 'id'],
        },
      ],
    })
    return bankAccountFound
  }

  /**
   * Asynchronously updates a bank account by its ID.
   *
   * @param {IBankAccount['id']} id - The ID of the bank account to update.
   * @param {Partial<IBankAccount>} bankAccountPayload - The payload with the bank account data updated.
   * @return {Promise<BankAccountModel | null>} The updated bank account model or null if not found.
   */
  async updateBankAccount(
    id: IBankAccount['id'],
    bankAccountPayload: Partial<IBankAccount>
  ): Promise<BankAccountModel | null> {
    const bankAccountUpdated = await BankAccount.update(bankAccountPayload, {
      where: { id },
      returning: true,
    })
    return bankAccountUpdated[1][0]
  }

  async deleteBankAccount(id: IBankAccount['id']): Promise<number> {
    const bankAccountDeleted = await BankAccount.destroy({ where: { id } })
    return bankAccountDeleted
  }
}
