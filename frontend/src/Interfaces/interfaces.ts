export interface ILoginPayload {
  email: string
  password: string
}

export interface ISignUpPayload {
  email: string
  password: string
}

export interface IUserPayload {
  name: string;
  lastname: string;
  alias: string;
  address: string;
  phone: string;
  authId: number;
}
