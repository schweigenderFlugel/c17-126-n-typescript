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
  anual_historial: IAnualHistorial[];
}

export interface IAnualHistorial {
  id: number;
  year: number;
  month: IMonths;
}

export interface IMonths {
  jan: IHistorial | null;
  feb: IHistorial | null;
  mar: IHistorial | null;
  apr: IHistorial | null;
  may: IHistorial | null;
  jun: IHistorial | null;
  jul: IHistorial | null;
  aug: IHistorial | null;
  sep: IHistorial | null;
  oct: IHistorial | null;
  nov: IHistorial | null;
  dec: IHistorial | null;
}

export interface IHistorial {
  balance: number;
  expenses: number;
  investments: number;
  transactions: ITransactions,
}

export interface ITransactions {
  sent: ITransactionSent[] | null;
  received: ITransactionReceived[] | null;
}

export interface ITransactionSent {
  id: number;
  source_account: number;
  destination_account: number;
  amount: number;
  date_transaction: string;
  month: number;
  year: number;
  to: {
    user: {
      name: string;
      lastname: string;
    }
  }
}

export interface ITransactionReceived {
  id: number;
  source_account: number;
  destination_account: number;
  amount: number;
  date_transaction: string;
  month: number;
  year: number;
  from: {
    user: {
      name: string;
      lastname: string;
    }
  }
}

export interface ITransactionsTable {
  id: number;
  source_account: number;
  destination_account: number;
  amount: number;
  date_transaction: string;
  month: number;
  year: number;
  to?: {
    user: {
      name: string;
      lastname: string;
    }
  },
  from?: {
    user: {
      name: string;
      lastname: string;
    }
  }
}