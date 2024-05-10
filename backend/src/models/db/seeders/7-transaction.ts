import { TRANSACTION_STATUS, TYPETRANSFERS } from "../../../config/constants";
import { ITransaction } from "../../../interfaces/transaction.interface";
import { Transaction } from "../entity/transaction.entity";
import { bankAccount1, bankAccount2 } from "./3-bank-account";
import { historial1, historial2 } from "./6-historial";

interface TransactionFixture extends Omit<ITransaction, 'id'> {}

export const transaction1: TransactionFixture = {
  historial_id: historial1.id,
  operation_number: Math.floor(Math.random() * 10**16),
  source_account: bankAccount1.id,
  destination_account: bankAccount2.id,
  type_transfer: TYPETRANSFERS.DEFERRED,
  amount: 0,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.PENDING,
}

export const transaction2: TransactionFixture = {
  historial_id: historial2.id,
  operation_number: Math.floor(Math.random() * 10**16),
  source_account: bankAccount2.id,
  destination_account: bankAccount1.id,
  type_transfer: TYPETRANSFERS.CREDIT,
  amount: 0,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.FAILED,
}

export const transaction3: TransactionFixture = {
  historial_id: historial1.id,
  operation_number: Math.floor(Math.random() * 10**16),
  source_account: bankAccount1.id,
  destination_account: bankAccount2.id,
  type_transfer: TYPETRANSFERS.DEBIT,
  amount: 0,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.SUCCESS,
}

const transactionFixtures = [transaction1, transaction2, transaction3];

export function up({context}: any) {
  return context.bulkInsert(Transaction.getTableName(), transactionFixtures);
}