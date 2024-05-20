import { IAnualHistorialResponse } from './anualHistorial.interface'
import { IAuth, IAuthDataValues } from './auth.interface'
import { IBankAccount, IBankAccountDataValues } from './bankAccount.interface'
import { ICommon } from './common.interface'
import { IPreferenceDataValues } from './preference.interface'

export type AccountType = 'personal' | 'enterprise'

export interface IUser extends ICommon {
  id: `${string}-${string}-${string}-${string}-${string}`;
  name: string;
  lastname: string;
  avatar: string;
  accountType: AccountType;
  alias: string;
  address: string;
  phone: string;
  authId: IAuth['id'];
}

export interface IUserData {
  dataValues: { id: number; alias: string; preference: IPreferenceDataValues; auth: IAuthDataValues }
}

export interface IAllUserDataValues {
  id: number;
  name: string;
  lastname: string;
  accountType: string;
  avatar: string;
  address: string;
  phone: string
  alias: string;
  auth: IAuthDataValues,
  preference: IPreferenceDataValues,
  bank_account: IBankAccountDataValues,
}

export interface IUserResponse {
  id: number;
  name: string;
  lastname: string;
  accountType: string;
  avatar: string;
  address: string;
  phone: string;        
  alias: string;
  auth: {
    id: IAuth['id'],
    email: string,
  },
  preferences: {
    min_ammount_transfers: number;
    max_ammount_transfers: number;
  },
  bank_account: {
    id: IBankAccount['id'];
    number_account: string;
    balance: number;
    expenses: number;
    investments: number;
    anual_historial: Partial<IAnualHistorialResponse[]>,
  }
}

export interface IUserCreatedData {
  success: boolean,
  payload: {
    userCreatedResponse: IUserResponse
  }
}

export interface ICreateUser extends Omit<Omit<IUser, 'createdAt'>, 'updatedAt'> {}

export interface IUserToken {
  id: IAuth['id']
  role: string
}