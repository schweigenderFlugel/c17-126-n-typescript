import { useEffect, useState } from 'react';
import { getUserBalance } from '../Services/apiBalance';
import { useAuth } from './useAuth';
import { IUserBalance } from '../Interfaces/interfaces';

export const useBalance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserBalance, userBalance } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    getUserBalance()
      .then((userBalance: IUserBalance | null) => {
        setUserBalance(userBalance);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { userBalance, isLoading };
};
