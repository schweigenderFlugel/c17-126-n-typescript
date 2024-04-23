import { AxiosResponse } from 'axios';
import { Axios } from './axios';
import { ICreateTransaction, ITransactions, ITypeTransfer } from '../Interfaces/interfaces';

export const getTypeTransfers = async (): Promise<{ typeTransfer: ITypeTransfer }> => {
  const res: AxiosResponse<{ typeTransfer: ITypeTransfer }> = await Axios({
    method: 'GET',
    url: '/types-transfers/all',
  })
  return res.data;
}

export const getAllTransactions = async (): Promise<{ transactions: ITransactions }> => {
  const res: AxiosResponse<{ transactions: ITransactions }> = await Axios({
    method: 'GET',
    url: '/transactions/all',
  })
  return res.data;
}

export const createTransaction = async (data: ICreateTransaction): Promise<void> => {
  await Axios({
    method: 'POST',
    url: '/transactions',
    data: data,
  })
}