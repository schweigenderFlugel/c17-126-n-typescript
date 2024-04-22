import { TRANSACTION_STATUS } from "../../../config/constants";
import { ITransaction } from "../../../interfaces/transaction.interface";
import { Transaction } from "../entity/transaction.entity";
import { bankAccount1, bankAccount2 } from "./3-bank-account";
import { typeTransfer1, typeTransfer2, typeTransfer3 } from "./4-type-transfer";

interface TransactionFixture extends Omit<ITransaction, 'id'> {}

const transaction1: TransactionFixture = {
  source_account: bankAccount1.id,
  destination_account: bankAccount2.id,
  type_transfer_id: typeTransfer1.id,
  amount: 0,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.PENDING,
}

const transaction2: TransactionFixture = {
  source_account: bankAccount2.id,
  destination_account: bankAccount1.id,
  type_transfer_id: typeTransfer2.id,
  amount: 0,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.FAILED,
}

const transaction3: TransactionFixture = {
  source_account: bankAccount1.id,
  destination_account: bankAccount2.id,
  type_transfer_id: typeTransfer3.id,
  amount: 0,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.SUCCESS,
}

const transactionFixtures = [transaction1, transaction2, transaction3];

export function up({context}: any) {
  return context.bulkInsert(Transaction.getTableName(), transactionFixtures);
}