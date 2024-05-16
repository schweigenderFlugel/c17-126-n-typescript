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

export interface ITransactions {
  id: number;
  source_account: number;
  destination_account: number;
  amount: number;
  date_transaction: string;
  to?: {
    user: {
      name: string;
      lastname: string;
    }
  }
  from?: {
    user: {
      name: string;
      lastname: string;
    }
  }
}

export interface ITransactionDetails {
  operation_number: number;
  source_account: number;
  destination_account: number;
  type_transfer: string;
  amount: number;
  date_transaction: string;
  status: string;
  to?: {
    user: {
      name: string;
      lastname: string;
    }
  }
  from?: {
    user: {
      name: string;
      lastname: string;
    }
  }
}