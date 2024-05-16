import { ICommon } from "./common.interface";
import { ISession } from "./session.interface";

export interface IAuth extends ICommon {
  email: string;
  password: string;
  role: string;
  refreshToken: string | null;
  status: boolean;
}

export interface INewAuthResponse {
  email: string;
  role: string;
  status: boolean;
}

export interface ISign extends Omit<Omit<Omit<Omit<Omit<Omit<IAuth, 'id'>, 'createdAt'>, 'updatedAt'>, 'role'>, 'refreshToken'>, 'status'> {}

export interface IUpdateAuth extends Omit<Omit<Omit<IAuth, 'id'>, 'email'>, 'createdAt'> {
  currentPassword: string;
  newPassword: string;
}

export interface IUserAuthData { 
  dataValues: {
    id: number;
    email: string;
  }
} 