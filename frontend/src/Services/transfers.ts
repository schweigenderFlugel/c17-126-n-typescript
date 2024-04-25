import { Axios } from './axios';
import { ICreateTransaction } from '../Interfaces/interfaces';

export const createTransaction = async (data: ICreateTransaction): Promise<void> => {
  await Axios({
    method: 'POST',
    url: '/transfer',
    data: data,
  })
}