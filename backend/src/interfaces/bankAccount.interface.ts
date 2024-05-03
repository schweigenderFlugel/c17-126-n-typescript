import { IUserData } from './user.interface'

export interface IBankAccount {
  id: number
  userId: number
  number_account: string
  balance: number
  expenses: number
  investments: number
}

export interface IAccountData {
  id: number;
  user: {
    id: number;
    auth: {
      id: number;
    }
  }
}

export interface ISourceAccountData {
  id: number
  userId: number
  number_account: string
  balance: number
  expenses: number
  user: IUserData
}

export interface IGenerateBankAccount extends Omit<IBankAccount, 'id'> {}
