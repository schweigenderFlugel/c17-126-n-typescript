import { AxiosResponse } from 'axios'
import { Axios, AxiosAuth } from './axios'
import { 
  IChangePassword, 
  ICreateUserPayload, 
  ISign,
  UserSettingsType 
} from '../Interfaces/auth.interface'
import { IUser } from '../Interfaces/user.interface'

const controller = new AbortController()

export const signup = async (
  payload: Omit<ISign, 'activationCode'>
): Promise<void> => {
  await Axios({
    method: 'POST',
    url: '/auth/signup',
    data: payload,
    signal: controller.signal,
  })
}

export const login = async (
  payload: Omit<ISign, 'activationCode'>
): Promise<{ accessToken: string }> => {
  const res: AxiosResponse<{ accessToken: string }> = await AxiosAuth({
    method: 'POST',
    url: '/auth/login',
    data: payload, 
    signal: controller.signal,
  })
  return res.data;
}

export const activate = async ( 
  email: ISign['email'] | null, activationCode: ISign['activationCode'] | null,
): Promise<{ accessToken: string }> => {
  console.log(activationCode)
  const res: AxiosResponse<{ accessToken: string }> = await AxiosAuth({
    method: 'POST',
    url: '/auth/activate',
    data: { email, activationCode }, 
    signal: controller.signal,
  })
  return res.data;
}

export const forgotPassword = async (
  payload: Omit<Omit<ISign, 'id'>, 'activationCode'>
): Promise<{ recoveryToken : string}> => {
  const res: AxiosResponse<{ recoveryToken: string }> = await Axios({
    method: 'POST',
    url: '/auth/forgot-password',
    data: payload,
    signal: controller.signal,
  })
  return res.data;
}

export const changePassword = async (id: string, payload: IChangePassword) => {
  const res: AxiosResponse<{ recoveryToken: string }> = await Axios({
    method: 'PUT',
    url: `/auth/change-password/${id}`,
    data: payload,
    signal: controller.signal,
  })
  return res.data;
}

export const logout = async (accessToken: string | null): Promise<void> => {
  await AxiosAuth({
    method: 'GET',
    url: '/auth/logout',
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

export const setSession = (accessToken: string | null) => {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}

export const refreshSession = async (): Promise<{ accessToken: string | null }> => {
  const res: AxiosResponse<{ accessToken: string }> = await AxiosAuth({
    method: 'GET',
    url: '/auth/refresh'
  })
  return res.data; 
}

export const getUser = async (): Promise<IUser | null > => {
  const response: AxiosResponse<IUser | null > = await Axios({
    method: 'GET',
    url: '/user'
  })
  return response.data
}

export const getAliases = async (alias: string): Promise<string[] | null> => {
  const response: AxiosResponse<string[] | null> = await Axios({
    method: 'POST',
    url: '/user/all-alias',
    data: { alias: alias }
  })
  return response.data;
}

export const createUser = async (payload: ICreateUserPayload): Promise<void> => {
  await Axios({
    method: 'POST',
    url: '/user',
    data: payload,
    signal: controller.signal,
  })
}

export const updateUser = async (id: string, payload: UserSettingsType): Promise<void> => {
  await Axios({
    method: 'PUT',
    url: `/user/${id}`,
    data: payload,
    signal: controller.signal,
  })
}