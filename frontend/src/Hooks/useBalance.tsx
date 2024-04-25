import { useEffect, useState } from 'react';
import { getUserBalance } from '../Services/apiBalance';
import { useAuth } from './useAuth';

export const useBalance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserBalance, userBalance } = useAuth();

  const startLoadingUserBalance = async () => {
    setIsLoading(true);
    const userBalance = await getUserBalance();
    setUserBalance(userBalance);
    setIsLoading(false);
  };

  useEffect(() => {
    startLoadingUserBalance();
  }, []);

  return { userBalance, isLoading, setUserBalance, startLoadingUserBalance };
};
