export interface ILoginPayload {
  email: string
  password: string
}

export interface ISignUpPayload {
  email: string
  password: string
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
  },
  preferences: {
    min_ammount_transfers: number;
    max_ammount_transfers: number;
  }
  bank_account: {
    id: number;
    number_account: string;
    balance: number;
  } 
}

export interface UserSettingsType {
  name: string;
  lastname: string;
  alias: string;
  address: string;
  phone: string;
  min_ammount_transfers: number;
  max_ammount_transfers: number;
};

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

export interface ICreateTransaction {
  source_account: string,
  destination_account: string;
  amount: number;
  type: string;
}