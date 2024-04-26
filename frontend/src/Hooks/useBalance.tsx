import { useEffect, useState } from 'react';
import { getUserBalance } from '../Services/apiBalance';
import { useAuth } from './useAuth';

export const useBalance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserBalance, userBalance } = useAuth();

  const startLoadingUserBalance = async () => {
    setIsLoading(true);
    try {
      const userBalance = await getUserBalance();
      setUserBalance(userBalance);
    } catch (error) {
      console.error();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startLoadingUserBalance();
  }, []);

  return { userBalance, isLoading, setUserBalance, startLoadingUserBalance };
};
