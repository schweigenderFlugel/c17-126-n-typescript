import { IAuth, IUserAuthData } from './auth.interface'
import { IBankAccount } from './bankAccount.interface'
import { ICommon } from './common.interface'
import { IPreferences, IUserPreferenceData } from './preference.interface'

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
  auth: {
    dataValues: {
      id: number;
      email: string;
    }
  },
  preferences: IUserPreferenceData,
  bank_account: {
    dataValues: {
      number_account: string;
      balance: number;
      expenses: number;
      investments: number;
      anual_historial: [{
        dataValues: {
          year: number;
          months: [{
            dataValues: {
              balance: number;
              expenses: number;
              investments: number;
              transactions_sent: [{
                dataValues: {
                  id: number;
                  source_account: number;
                  destination_account: number;
                  amount: number;
                  to: {
                    dataValues: {
                      user: {
                        dataValues: {
                          name: string;
                          lastname: string;
                        }
                      }
                    }
                  }
                }
              }]
              transactions_received: [{
                dataValues: {
                  id: number;
                  source_account: number;
                  destination_account: number;
                  amount: number;
                  from: {
                    dataValues: {
                      user: {
                        dataValues: {
                          name: string;
                          lastname: string;
                        }
                      }
                    }
                  }
                }
              }]
            }
          }]
        }
      }]
    }
  },
  
}

export interface IUpdateUser extends Partial<IUser> {}

export interface ICreateUser extends Omit<Omit<Omit<Omit<IUser, 'id'>, 'createdAt'>, 'updatedAt'>, 'avatar'> {}

export interface IUserToken {
  id: number
  role: string
}