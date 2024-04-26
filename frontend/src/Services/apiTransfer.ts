import { ITransfer } from '../Interfaces/interfaces';
import { Axios } from './axios';

const controller = new AbortController();

export const makeTransfer = async (payload: ITransfer) => {
  await Axios({
    method: 'POST',
    url: '/transfer',
    data: payload,
    signal: controller.signal,
  });
};
