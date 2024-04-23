import {
  IBankAccount,
  IGenerateBankAccount,
} from '../../interfaces/bankAccount.interface'
import { BankAccount, BankAccountModel } from '../db/entity/bank-account.entity'
import { Preferences } from '../db/entity/preference.entity'
import { User } from '../db/entity/user.entity'

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
   * @param {number} id - The ID of the bank account to retrieve
   * @return {Promise<BankAccountModel | null>} The bank account found, or null if not found
   */
  async getBankAccountById(id: number): Promise<BankAccountModel | null> {
    const bankAccountFound: BankAccountModel | null =
      await BankAccount.findByPk(id)
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

  async getBankAccountWithUserPreferences(bankAccountId: number) {
    const bankAccountFound = await BankAccount.findOne({
      where: { id: bankAccountId },
      include: [
        {
          model: User,
          attributes: ['alias', 'id'],
          include: [
            {
              model: Preferences,
              attributes: ['max_ammount_transfers'],
            },
          ],
        },
      ],
    })
    return bankAccountFound
  }

  /**
   * Asynchronously updates a bank account by its ID.
   *
   * @param {number} id - The ID of the bank account to update.
   * @return {Promise<BankAccountModel | null>} The updated bank account model or null if not found.
   */
  async updateBankAccount(
    id: number,
    bankAccountPayload: IBankAccount
  ): Promise<BankAccountModel | null> {
    const bankAccountUpdated = await BankAccount.update(bankAccountPayload, {
      where: { id },
      returning: true,
    })

    return bankAccountUpdated[1][0]
  }

  async deleteBankAccount(id: number): Promise<number> {
    const bankAccountDeleted = await BankAccount.destroy({ where: { id } })
    return bankAccountDeleted
  }
}
