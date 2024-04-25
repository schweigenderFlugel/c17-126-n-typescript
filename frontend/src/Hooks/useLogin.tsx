import { useContext } from 'react';
import { AxiosError } from 'axios';
import { login } from '../Services/user';
import { ILoginPayload } from '../Interfaces/interfaces';
import { AuthContext } from '../Context/AuthContext';

type options = {
  onSuccess?: () => void;
  onReject?: (error: AxiosError) => void;
};

export const useLogin = ({ onSuccess, onReject }: options) => {
  const { setAccessToken, loading, setLoading } = useContext(AuthContext);

  const setLogin = async (payload: ILoginPayload) => {
    setLoading(true);
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
        setLoading(false);
      });
  };
  return { setLogin, loading };
};
