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
  toggleDarkMode: Dispatch<SetStateAction<void>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultValues = {
  accessToken: null,
  setAccessToken: () => {},
  refresh: false,
  setRefresh: () => {},
  remember: false,
  setRemember: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
} as AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface>(defaultValues);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [ accessToken, setAccessToken ] = useState<string | null>("d");
  const [ refresh, setRefresh ] = useState<boolean>(false);
  const [ remember, setRemember ] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useLocalStorage()

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
       toggleDarkMode,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

