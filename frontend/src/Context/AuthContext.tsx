import { Dispatch, SetStateAction, ReactNode, createContext, useState } from "react";
import { setSession } from "../Services/user";
import { useLocalStorage } from "./useLocalStorage";


interface AuthContextInterface {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  remember: boolean;
  setRemember: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

interface AuthProviderProps {
  children: ReactNode
}

const defaultValues = {
  accessToken: null,
  setAccessToken: () => {},
  refresh: false,
  setRefresh: () => {},
  remember: false,
  setRemember: () => {},
  darkMode: false,
  setDarkMode: () => {},
} as AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface>(defaultValues)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [ accessToken, setAccessToken ] = useState<string | null>(null);
  const [ refresh, setRefresh ] = useState<boolean>(false);
  const [ remember, setRemember ] = useState<boolean>(false);
  const [ darkMode, setDarkMode ] = useState<boolean>(false);
  const { item, saveItem, loading, error } = useLocalStorage(darkMode, remember);

  setSession(accessToken);

  return (
    <AuthContext.Provider value={{
       accessToken,
       setAccessToken,
       refresh,
       setRefresh,
       remember,
       setRemember,
       darkMode,
       setDarkMode,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
