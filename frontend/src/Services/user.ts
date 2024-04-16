import { AxiosResponse } from 'axios'
import { ILoginPayload, ISignUpPayload } from '../Interfaces/interfaces'
import { Axios, AxiosAuth } from './axios'

const controller = new AbortController()

export const login = async (payload: ILoginPayload): Promise<{ accessToken: string }> => {
  const res: AxiosResponse<{ accessToken: string }> = await AxiosAuth({
    method: 'POST',
    url: '/auth/login',
    data: payload, 
    signal: controller.signal,
  })
  return res.data;
}

export const signup = async (payload: ISignUpPayload): Promise<void> => {
  await Axios({
    method: 'POST',
    url: '/auth/signup',
    data: payload,
    signal: controller.signal,
  })
}

export const logout = async (accessToken: string | null): Promise<void> => {
  await AxiosAuth({
    method: 'GET',
    url: '/auth/logout',
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const setSession = (accessToken: string | null) => {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}

export const refreshSession = async (): Promise<{ accessToken: string | null}> => {
  const res: AxiosResponse<{ accessToken: string }> = await AxiosAuth({
    method: 'GET',
    url: '/auth/refresh'
  })
  return res.data; 
}
