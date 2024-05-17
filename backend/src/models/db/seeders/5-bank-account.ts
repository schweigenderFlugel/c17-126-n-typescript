import { IBankAccount } from "../../../interfaces/bankAccount.interface";
import { BankAccount } from "../entity/bank-account.entity";
import { adminUser, normalUser } from "./3-user";

interface BankAccountFixture extends Omit<IBankAccount, 'userId'> {
  user_id: number;
}

export const bankAccount1: BankAccountFixture = {
  id: 1,
  user_id: adminUser.id,
  number_account: `${Math.floor(Math.random() * 1000000000)}${
    adminUser.account_type[0]
  }`,
  balance: 0,
  expenses: 0,
  investments: 0,
}

export const bankAccount2: BankAccountFixture = {
  id: 2,
  user_id: normalUser.id,
  number_account: `${Math.floor(Math.random() * 1000000000)}${
    normalUser.account_type[0]
  }`,
  balance: 100,
  expenses: 50,
  investments: 100,
}

const bankAccountFixtures = [bankAccount1, bankAccount2];

export function up({context}: any) {
  return context.bulkInsert(BankAccount.getTableName(), bankAccountFixtures);
}