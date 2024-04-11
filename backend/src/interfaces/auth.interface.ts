export interface IAuth {
  id: number
  email: string
  password: string
  role: string;
  refreshToken: string
  status: boolean
}
