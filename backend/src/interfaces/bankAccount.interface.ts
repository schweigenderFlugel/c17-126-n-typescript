import { IUserData } from './user.interface'

export interface IBankAccount {
  id: number
  user_id: number
  number_account: string
  balance: number
}

export interface ISourceAccountData {
  id: number
  user_id: number
  number_account: string
  balance: number
  user: IUserData
}

export interface IGenerateBankAccount extends Omit<IBankAccount, 'id'> {}
