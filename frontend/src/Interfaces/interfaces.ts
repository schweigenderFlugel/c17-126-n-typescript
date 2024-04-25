export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ISignUpPayload {
  email: string;
  password: string;
}

export interface ICreateUserPayload {
  name: string;
  lastname: string;
  accountType: string;
  alias: string;
  address: string;
  phone: string;
}

export interface IUser {
  id: number;
  name: string;
  lastname: string;
  accountType: string;
  alias: string;
  address: string;
  phone: string;
  auth: {
    email: string;
  };
}

export interface IUserBalance {
  accountFound: {
    id: number;
    user_id: number;
    number_account: string;
    balance: number;
  };
}

export interface UserSettingsType {
  email: string;
  name: string;
  lastname: string;
  accountType: string;
  alias: string;
  maxAmountTransfer: number;
}

export interface ITypeTransfer {
  name: string;
  description: string | null;
}

export interface ITransactions {
  id: number;
  source_account: number;
  destination_account: number;
  type_transfer_id: number;
  amount: number;
  date_transaction: Date;
  status: string;
}

export interface ICreateTransaction {}
