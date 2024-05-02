import { useContext, useState } from 'react';
import { AxiosError } from 'axios';
import { login } from '../Services/user';
import { ILoginPayload } from '../Interfaces/interfaces';
import { AuthContext } from '../Context/AuthContext';

type options = {
  onSuccess?: () => void;
  onReject?: (error: AxiosError) => void;
};

export const useLogin = ({ onSuccess, onReject }: options) => {
  const { setAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const setLogin = async (payload: ILoginPayload) => {
    setIsLoading(true);
    await login(payload)
      .then(res => {
        setAccessToken(res.accessToken);
      })
      .then(() => {
        onSuccess?.();
      })
      .catch(error => {
        onReject?.(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { setLogin, isLoading };
};
