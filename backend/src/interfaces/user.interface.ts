import { IUserAuthData } from './auth.interface'
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

export interface IUpdateUser extends Partial<IUser> {}

export interface ICreateUser extends Omit<Omit<Omit<Omit<IUser, 'id'>, 'createdAt'>, 'updatedAt'>, 'avatar'> {}

export interface IUserToken {
  id: number
  role: string
}