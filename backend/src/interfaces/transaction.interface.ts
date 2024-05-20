import { IBankAccount, IDestinationAccountData, ISourceAccountData } from "./bankAccount.interface"
import { IHistorial } from "./historial.interface"

export interface ITransaction {
  id?: `${string}-${string}-${string}-${string}-${string}-${string}-`
  historial_id: IHistorial['id']
  operation_number: number
  source_account: IBankAccount['id']
  destination_account: IBankAccount['id']
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

export interface ITransactionSentDataValues {
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

export interface ITransactionSentResponse {
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

export interface ITransactionReceivedDataValues {
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

export interface ITransactionReceivedResponse {
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

export interface ITransactionsResponse {
  sent: Partial<ITransactionSentResponse[]>;
  received: Partial<ITransactionReceivedResponse[]>;
}

export interface ITransactionCreatedResponse extends ITransaction {
  historial: Partial<IHistorial>
}

export interface ITransactionCreatedResponseTesting {
  success: boolean;
  payload: ITransactionCreatedResponse;
}