import { ICommon } from "./common.interface";

export type AccountType = "personal" | "enterprise";

export interface IUser extends ICommon {
  name: string;
  lastname: string;
  accountType: AccountType;
  address: string;
  alias: string;
  phone: string;
  authId: number;
}

export interface ICreateUser extends Omit<Omit<Omit<IUser, 'id'>, 'createdAt'>, 'updatedAt'> {}

export interface IUpdateUser extends Omit<Omit<IUser, 'authId'>, 'createdAt'> {}