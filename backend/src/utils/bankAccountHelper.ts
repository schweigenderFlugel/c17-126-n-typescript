import { TypeAccountModel } from '../models/db/entity/type-account.entity'
import bankAccountService from '../services/bankAccount.services'

export default class bankAccountHelper {
  /**
   * Generates a unique account number based on the account type.
   *
   * @param {TypeAccountModel} accountTypeFound - The account type model.
   * @return {Promise<string>} The generated account number.
   */
  static async generateAccountNumber(
    accountType: string
  ): Promise<string> {
    while (true) {
      const accountNumber = `${Math.floor(Math.random() * 1000000000)}${
        accountType[0]
      }`
      const bankAccountFound =
        await bankAccountService.getBankAccountByAccountNumber(accountNumber)

      if (!bankAccountFound) {
        return accountNumber
      }
    }
  }
}
