import { IDestinationAccountData, ISourceAccountData } from "./bankAccount.interface"

export interface ITransaction {
  id?: number
  historial_id: number
  operation_number: number
  source_account: number
  destination_account: number
  type_transfer: string
  amount: number
  date_transaction: Date
  status: string
}

export interface ITransactionDataDetails {
  operation_number: number
  type_transfer: string
  amount: number
  date_transaction: Date
  status: string
  from?: Partial<ISourceAccountData>  
  to?: Partial<IDestinationAccountData>
}

export interface IUserTransactionSentData {
  dataValues: {
    id: number;
    source_account: number;
    destination_account: number;
    amount: number;
    date_transaction: string;
    month: { 
      dataValues: { 
        month: number;
        year: {
          dataValues: {
            year: number;
            bank_account: number;
          }
        }
      }
    };
    to: {
      dataValues: {
        user: {
          dataValues: {
            name: string;
            lastname: string;
          }
        }
      }
    }
  }
}

export interface IUserTransactionSentResponse {
  id: number;
  bank_account: number;
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

export interface IUserTransactionReceivedData {
  dataValues: {
    id: number;
    source_account: number;
    destination_account: number;
    amount: number;
    date_transaction: string;
    month: { 
      dataValues: { 
        month: number;
        year: {
          dataValues: {
            year: number;
            bank_account: number;
          }
        }
      }
    };
    from: {
      dataValues: {
        user: {
          dataValues: {
            name: string;
            lastname: string;
          }
        }
      }
    }
  }
}

export interface IUserTransactionReceivedResponse {
  id: number;
  bank_account: number;
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

export interface IUserTransactionsResponse {
  sent: Partial<IUserTransactionSentResponse[]>;
  received: Partial<IUserTransactionReceivedResponse[]>;
}