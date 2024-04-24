import { ICommon } from './common.interface'
import { IUserPreferenceData } from './preference.interface'

export type AccountType = 'personal' | 'enterprise'

export interface IUser extends ICommon {
  name: string
  lastname: string
  accountType: AccountType
  address: string
  alias: string
  phone: string
  authId: number
}

export interface IUserData {
  dataValues: { id: number; alias: string; preference: IUserPreferenceData }
}

export interface IUserToken {
  id: number
  role: string
}
export interface ICreateUser
  extends Omit<Omit<Omit<IUser, 'id'>, 'createdAt'>, 'updatedAt'> {}

export interface IUpdateUser extends Omit<Omit<IUser, 'id'>, 'updatedAt'> {}
