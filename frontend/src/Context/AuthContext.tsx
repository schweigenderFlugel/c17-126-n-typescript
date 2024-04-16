import { Dispatch, SetStateAction, ReactNode, createContext, useState } from "react";
import { setSession } from "../Services/user";
import { useLocalStorage } from "./useLocalStorage";
import { useRefresh } from "../Hooks/useRefresh";
import { useNavigate } from "react-router-dom";


interface AuthContextInterface {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  remember: boolean;
  setRemember: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  toggleDarkMode: Dispatch<SetStateAction<void>>;
}

interface AuthProviderProps {
  children: ReactNode
}

const defaultValues = {
  accessToken: null,
  setAccessToken: () => {},
  loading: false,
  setLoading: () => {},
  remember: false,
  setRemember: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
} as AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface>(defaultValues)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [ accessToken, setAccessToken ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ remember, setRemember ] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useLocalStorage();
  const navigate = useNavigate();

  setSession(accessToken);

  useRefresh({
    onSuccess: () => navigate('/'),
    setToken: (token: string | null) => setAccessToken(token),
  });

  return (
    <AuthContext.Provider value={{
       accessToken,
       setAccessToken,
       loading,
       setLoading,
       remember,
       setRemember,
       darkMode,
       toggleDarkMode,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
