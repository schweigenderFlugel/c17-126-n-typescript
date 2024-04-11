import { Dispatch, SetStateAction, ReactNode, createContext, useState } from "react";
import { setSession } from "../Services/user";
import { useLocalStorage } from "./useLocalStorage";


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
  const { darkMode, toggleDarkMode } = useLocalStorage()

  setSession(accessToken);

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
