import { ICommon } from "./common.interface";

export interface IUser extends ICommon {
  name: string;
  lastname: string;
  address: string;
  alias: string;
  phone: string;
  authId: number;
}

export interface ICreateUser extends Omit<Omit<Omit<IUser, 'id'>, 'createdAt'>, 'updatedAt'> {}

export interface IUpdateUser extends Omit<Omit<IUser, 'id'>, 'updatedAt'> {}