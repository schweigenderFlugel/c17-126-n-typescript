import { TRANSACTION_STATUS, TYPETRANSFERS } from "../../../config/constants";
import { ITransaction } from "../../../interfaces/transaction.interface";
import { Transaction } from "../entity/transaction.entity";
import { bankAccount1, bankAccount2 } from "./4-bank-account";
import { historial1, historial3, historial5, historial7 } from "./6-historial";

export const transaction1: ITransaction = {
  id: 1,
  historial_id: historial1.id,
  operation_number: Math.floor(Math.random() * 10**16),
  source_account: bankAccount1.id,
  destination_account: bankAccount2.id,
  type_transfer: TYPETRANSFERS.DEFERRED,
  amount: 10,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.PENDING,
}

export const transaction2: ITransaction = {
  id: 2,
  historial_id: historial1.id,
  operation_number: Math.floor(Math.random() * 10**16),
  source_account: bankAccount2.id,
  destination_account: bankAccount1.id,
  type_transfer: TYPETRANSFERS.DEFERRED,
  amount: 50,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.PENDING,
}

export const transaction3: ITransaction = {
  id: 3,
  historial_id: historial3.id,
  operation_number: Math.floor(Math.random() * 10**16),
  source_account: bankAccount1.id,
  destination_account: bankAccount2.id,
  type_transfer: TYPETRANSFERS.CREDIT,
  amount: 25,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.FAILED,
}

export const transaction4: ITransaction = {
  id: 4,
  historial_id: historial3.id,
  operation_number: Math.floor(Math.random() * 10**16),
  source_account: bankAccount2.id,
  destination_account: bankAccount1.id,
  type_transfer: TYPETRANSFERS.DEBIT,
  amount: 100,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.SUCCESS,
}

export const transaction5: ITransaction = {
  id: 5,
  historial_id: historial5.id,
  operation_number: Math.floor(Math.random() * 10**16),
  source_account: bankAccount1.id,
  destination_account: bankAccount2.id,
  type_transfer: TYPETRANSFERS.DEFERRED,
  amount: 60,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.PENDING,
}

export const transaction6: ITransaction = {
  id: 6,
  historial_id: historial5.id,
  operation_number: Math.floor(Math.random() * 10**16),
  source_account: bankAccount2.id,
  destination_account: bankAccount1.id,
  type_transfer: TYPETRANSFERS.DEFERRED,
  amount: 15,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.PENDING,
}

export const transaction7: ITransaction = {
  id: 7,
  historial_id: historial7.id,
  operation_number: Math.floor(Math.random() * 10**16),
  source_account: bankAccount1.id,
  destination_account: bankAccount2.id,
  type_transfer: TYPETRANSFERS.CREDIT,
  amount: 20,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.FAILED,
}

export const transaction8: ITransaction = {
  id: 8,
  historial_id: historial7.id,
  operation_number: Math.floor(Math.random() * 10**16),
  source_account: bankAccount2.id,
  destination_account: bankAccount1.id,
  type_transfer: TYPETRANSFERS.DEBIT,
  amount: 35,
  date_transaction: new Date(),
  status: TRANSACTION_STATUS.SUCCESS,
}

const transactionFixtures = [
  transaction1, 
  transaction2, 
  transaction3, 
  transaction4, 
  transaction5, 
  transaction6, 
  transaction7, 
  transaction8,
];

export function up({context}: any) {
  return context.bulkInsert(Transaction.getTableName(), transactionFixtures);
}