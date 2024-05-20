import { ICommon } from "./common.interface";

export interface IAuth extends ICommon {
  id: `${string}-${string}-${string}-${string}-${string}`;
  email: string;
  password: string;
  role: string;
  activationCode: `${string}-${string}-${string}-${string}`;
  status: boolean;
}

export interface ISign {
  email: string;
  password: string;
}

export type ITokenPayload = {
  id: IAuth['id'];
  role: string;
}

export interface INewAuthResponse {
  email: string;
  role: string;
  status: boolean;
}

export interface IUpdateAuth extends Omit<Omit<Omit<IAuth, 'id'>, 'email'>, 'createdAt'> {
  currentPassword: string;
  newPassword: string;
}

export interface IAuthDataValues { 
  dataValues: {
    id: IAuth['id'];
    email: string;
  }
} 