export interface ISign {
  email: string;
  password: string;
  activationCode: `${string}-${string}-${string}-${string}`
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

export interface ICodeBlocks {
  first: string;
  second: string;
  third: string;
  fourth: string;
}