import { AxiosResponse } from 'axios';
import { IUserBalance } from '../Interfaces/interfaces';
import { Axios } from './axios';

export const getUserBalance = async (): Promise<IUserBalance> => {
  const res: AxiosResponse<{ payload: IUserBalance }> = await Axios.get(
    '/bank-account/getBalance'
  );
  return res.data.payload;
};
