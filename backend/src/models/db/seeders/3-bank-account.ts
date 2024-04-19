import { IBankAccount } from "../../../interfaces/bankAccount.interface";
import { BankAccount } from "../entity/bank-account.entity";
import { adminUser, normalUser } from "./2-user";

export const bankAccount1: IBankAccount = {
  id: 1,
  user_id: adminUser.id,
  number_account: `${Math.floor(Math.random() * 1000000000)}${
    adminUser.account_type[0]
  }`,
  balance: 0,
}

export const bankAccount2: IBankAccount = {
  id: 2,
  user_id: normalUser.id,
  number_account: `${Math.floor(Math.random() * 1000000000)}${
    normalUser.account_type[0]
  }`,
  balance: 0,
}

const bankAccountFixtures = [bankAccount1, bankAccount2];

export function up({context}: any) {
  return context.bulkInsert(BankAccount.getTableName(), bankAccountFixtures);
}