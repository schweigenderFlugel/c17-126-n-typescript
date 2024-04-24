export interface ITransaction {
  id?: number
  source_account: number
  destination_account: number
  type_transfer: string
  amount: number
  date_transaction: Date
  status: string
}
