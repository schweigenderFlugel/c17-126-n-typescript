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

export interface ITransactionData {
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

export interface IUserTransactionSentDataResponse {
  id: number;
  source_account: number;
  destination_account: number;
  amount: number;
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

export interface IUserTransactionReceivedDataResponse {
  id: number;
  source_account: number;
  destination_account: number;
  amount: number;
  from: {
    user: {
      name: string;
      lastname: string;
    }
  }
}