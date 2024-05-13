import { IAnualHistorialResponse } from './anualHistorial.interface'
import { IUserAuthData } from './auth.interface'
import { IUserBankAccount } from './bankAccount.interface'
import { ICommon } from './common.interface'
import { IUserPreferenceData } from './preference.interface'

export type AccountType = 'personal' | 'enterprise'

export interface IUser extends ICommon {
  name: string
  lastname: string
  avatar: string
  accountType: AccountType
  alias: string
  address: string
  phone: string
  authId: number
}

export interface IUserData {
  dataValues: { id: number; alias: string; preference: IUserPreferenceData; auth: IUserAuthData  }
}

export interface IAllUserData {
  id: number;
  name: string;
  lastname: string;
  avatar: string;
  address: string;
  phone: string
  alias: string;
  auth: IUserAuthData,
  preference: IUserPreferenceData,
  bank_account: IUserBankAccount,
}

export interface IUserResponse {
  id: number;
  name: string;
  lastname: string;
  avatar: string;
  address: string;
  phone: string;        
  alias: string;
  auth: {
    id: number,
    email: string,
  },
  preferences: {
    min_ammount_transfers: number;
    max_ammount_transfers: number;
  },
  bank_account: {
    number_account: string;
    balance: number;
    expenses: number;
    investments: number;
    anual_historial: Partial<IAnualHistorialResponse[]>,
  }
}

export interface IUpdateUser extends Partial<IUser> {}

export interface ICreateUser extends Omit<Omit<Omit<Omit<IUser, 'id'>, 'createdAt'>, 'updatedAt'>, 'avatar'> {}

export interface IUserToken {
  id: number
  role: string
}