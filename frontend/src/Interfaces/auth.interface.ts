export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ISignUpPayload {
  email: string;
  password: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface ICreateUserPayload {
  name: string;
  lastname: string;
  accountType: string;
  alias: string;
  address: string;
  phone: string;
}

export interface UserSettingsType {
  name: string;
  lastname: string;
  avatar: string;
  alias: string;
  address: string;
  phone: string;
  min_ammount_transfers: number;
  max_ammount_transfers: number;
};