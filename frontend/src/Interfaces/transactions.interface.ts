import { IUserRelated } from "./user.interface";

export interface ICreateTransaction {
  source_account: string,
  destination_alias: string;
  amount: number;
  type: string;
}
  
export interface IDeposit {
  accountId: string;
  amount: number;
}

export interface ITransactions {
  sent: ITransactionsSent[] | null;
  received: ITransactionsReceived[] | null;
}

export interface ITransactionsSent {
  id: number;
  source_account: string;
  destination_account: string;
  amount: number;
  date_transaction: string;
  month: number;
  year: number;
  to: IUserRelated;
}

export interface ITransactionsReceived {
  id: number;
  source_account: string;
  destination_account: string;
  amount: number;
  date_transaction: string;
  month: number;
  year: number;
  from: IUserRelated;
}

export interface ITransactionsTable {
  id: number;
  source_account: string;
  destination_account: string;
  amount: number;
  date_transaction: string;
  month: number;
  year: number;
  from?: IUserRelated;
  to?: IUserRelated;
}


export interface ITransactionDetails {
  operation_number: number;
  source_account: string;
  destination_account: string;
  type_transfer: string;
  amount: number;
  date_transaction: string;
  status: string;
  from?: IUserRelated;
  to?: IUserRelated;
}