import { IDestinationAccountData, ISourceAccountData } from "./bankAccount.interface"

export interface ITransaction {
  id?: number
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

