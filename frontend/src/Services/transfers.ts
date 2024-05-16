import { Axios } from './axios';
import { ICreateTransaction } from '../Interfaces/transactions.interface'; 
import { IDeposit } from '../Interfaces/transactions.interface'; 
const controller = new AbortController();

export const createTransaction = async (data: ICreateTransaction): Promise<void> => {
  await Axios({
    method: 'POST',
    url: '/transfer',
    data: data,
    signal: controller.signal,
  })
}

export const makeDeposit = async (payload: IDeposit) => {
  await Axios({
    method: 'PUT',
    url: `/bank-account/deposit/${payload.accountId}`,
    data: payload,
    signal: controller.signal,
  });
};
