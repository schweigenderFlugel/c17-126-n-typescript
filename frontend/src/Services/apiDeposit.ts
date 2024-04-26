import { IDeposit } from '../Interfaces/interfaces';
import { Axios } from './axios';

const controller = new AbortController();

export const makeDeposit = async (payload: IDeposit) => {
  await Axios({
    method: 'POST',
    url: '/bank-account/deposit',
    data: payload,
    signal: controller.signal,
  });
};
