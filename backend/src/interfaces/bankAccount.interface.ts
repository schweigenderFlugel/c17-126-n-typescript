import { IAnualHistorialDataValues } from './anualHistorial.interface'
import { IAuth } from './auth.interface';
import { ITransactionReceivedDataValues, ITransactionSentDataValues } from './transaction.interface'
import { IUser, IUserData } from './user.interface'

export interface IBankAccount {
  id: `${string}-${string}-${string}-${string}-${string}-${string}-`;
  userId: IUser['id']
  number_account: string
  balance: number
  expenses: number
  investments: number
}

export interface IBankAccountDataValues {
  dataValues: {
    id: number;
    number_account: string;
    balance: number;
    expenses: number;
    investments: number;
    transactions_sent: ITransactionSentDataValues[],
    transactions_received: ITransactionReceivedDataValues[],
    anual_historial: IAnualHistorialDataValues[],
  }
}

export interface IAccountData {
  id: IBankAccount['id'];
  user: {
    id: IUser['id'];
    auth: {
      id: IAuth['id'];
    }
  }
}

export interface ISourceAccountData {
  id: IBankAccount['id']
  userId: IUser['id']
  number_account: string
  balance: number
  expenses: number
  investments: number;
  user: IUserData
}

export interface IDestinationAccountData {
  id: IBankAccount['id']
  number_account: string
  balance: number
  user?: IUserData
}

export interface IGenerateBankAccount extends Omit<IBankAccount, 'id'> {}
