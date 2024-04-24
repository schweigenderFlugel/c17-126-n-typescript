export interface ITransaction {
  id?: number
  source_account: number
  destination_account: number
  type_transfer_id: number
  amount: number
  date_transaction: Date
  status: string
}
