import { useState } from 'react';
import { AxiosError } from 'axios';
import { login } from '../Services/user';
import { ISign} from '../Interfaces/auth.interface'; 
import { useAuth } from './useAuth';

type options = {
  onSuccess?: () => void;
  onReject?: (error: AxiosError) => void;
};

export const useLogin = ({ onSuccess, onReject }: options) => {
  const { setAccessToken, setLoadingUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLogin = async (payload: Omit<ISign, 'activationCode'>) => {
    setIsLoading(true);
    await login(payload)
      .then(res => {
        setAccessToken(res.accessToken);
        setLoadingUser(true);
      })
      .then(() => {
        onSuccess?.();
      })
      .catch(error => {
        onReject?.(error);
      })
  };
  return { setLogin, isLoading, setIsLoading, setLoadingUser };
};
