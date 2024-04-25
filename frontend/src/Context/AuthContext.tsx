import {
  Dispatch,
  SetStateAction,
  ReactNode,
  createContext,
  useState,
} from 'react';
import { setSession } from '../Services/user';
import { useLocalStorage } from './useLocalStorage';
import { useRefresh } from '../Hooks/useRefresh';
import { useLocation, useNavigate } from 'react-router-dom';
import { IUser, IUserBalance } from '../Interfaces/interfaces';

interface AuthContextInterface {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  userData: IUser | null;
  setUserData: Dispatch<SetStateAction<IUser | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  toggleDarkMode: Dispatch<SetStateAction<void>>;
  userBalance: IUserBalance | null;
  setUserBalance: Dispatch<SetStateAction<IUserBalance | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultValues = {
  accessToken: null,
  setAccessToken: () => {},
  userData: null,
  setUserData: () => {},
  loading: false,
  setLoading: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
  userBalance: null,
  setUserBalance: () => {},
} as AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface>(defaultValues);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [userBalance, setUserBalance] = useState<IUserBalance | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useLocalStorage();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from.pathname;

  setSession(accessToken);

  useRefresh({
    onSuccess: () => navigate(from, { replace: true }),
    setToken: (token: string | null) => setAccessToken(token),
  });

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        userData,
        userBalance,
        setUserBalance,
        setUserData,
        loading,
        setLoading,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
