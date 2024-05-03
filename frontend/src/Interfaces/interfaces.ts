export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ISignUpPayload {
  email: string;
  password: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface ICreateUserPayload {
  name: string;
  lastname: string;
  accountType: string;
  alias: string;
  address: string;
  phone: string;
}

export interface To {
  number_account: string;
  user: {
    name: string;
    lastname: string;
  }
}

export interface From {
  number_account: string;
  user: {
    name: string;
    lastname: string;
  }
}

export interface ITransactionsReceived {
  id: number;
  source_account: number;
  destination_account: number;
  type_transfer: string;
  amount: number;
  date_transaction: string;
  status: string;
  from: From;
}

export interface ITransactionsSent {
  id: number;
  source_account: number;
  destination_account: number;
  type_transfer: string;
  amount: number;
  date_transaction: string;
  status: string;
  to: To;
}

export interface ITransactions {
  id: number;
  source_account: number;
  destination_account: number;
  type_transfer: string;
  amount: number;
  date_transaction: string;
  status: string;
  to?: To;
  from?: From;
}

export interface IPreference {
  min_ammount_transfers: number;
  max_ammount_transfers: number;
}

export interface IBankAccount {
  id: number;
  number_account: string;
  balance: number;
  expenses: number;
  investments: number;
  transactions_sent: ITransactionsSent[];
  transactions_received: ITransactionsReceived[];
}

export interface IUser {
  id: number;
  name: string;
  lastname: string;
  avatar: string | null;
  accountType: string;
  alias: string;
  address: string;
  phone: string;
  auth: {
    id: number;
    email: string;
  };
  preference: IPreference;
  bank_account: IBankAccount;
}

export interface UserSettingsType {
  name: string;
  lastname: string;
  avatar: string;
  alias: string;
  address: string;
  phone: string;
  min_ammount_transfers: number;
  max_ammount_transfers: number;
};

export interface ICreateTransaction {
  source_account: number,
  destination_alias: string;
  amount: number;
  type: string;
}

export interface IDeposit {
  accountId: number;
  amount: number;
}