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
import { IUser } from '../Interfaces/user.interface';

interface AuthContextInterface {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  userData: IUser | null;
  setUserData: Dispatch<SetStateAction<IUser | null>>;
  loadingPageRefresh: boolean;
  setLoadingPageRefresh: Dispatch<SetStateAction<boolean>>;
  loadingUser: boolean;
  setLoadingUser: Dispatch<SetStateAction<boolean>>;
  updateData: boolean;
  setUpdateData: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  toggleDarkMode: Dispatch<SetStateAction<void>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultValues = {
  accessToken: null,
  setAccessToken: () => {},
  userData: null,
  setUserData: () => {},
  loadingPageRefresh: true,
  setLoadingPageRefresh: () => {},
  loadingUser: false,
  setLoadingUser: () => {},
  updateData: false,
  setUpdateData: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
} as AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface>(defaultValues);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [updateData, setUpdateData] = useState<boolean>(false);
  const [loadingPageRefresh, setLoadingPageRefresh] = useState<boolean>(true);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useLocalStorage();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from.pathname;

  setSession(accessToken);

  useRefresh({
    onSuccess: () => { 
      navigate(from, { replace: true }),
      setLoadingPageRefresh(false);
    },
    onReject: () => {
      setLoadingPageRefresh(false);
    },
    setToken: (token: string | null) => setAccessToken(token),
  });

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        userData,
        setUserData,
        loadingPageRefresh,
        setLoadingPageRefresh,
        loadingUser,
        setLoadingUser,
        updateData,
        setUpdateData,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
