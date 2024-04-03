import { Dispatch, SetStateAction, ReactNode, createContext, useState } from "react";


interface AuthContextInterface {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  trust: boolean;
  setTrust: Dispatch<SetStateAction<boolean>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultValues = {
  accessToken: null,
  setAccessToken: () => {},
  refresh: false,
  setRefresh: () => {},
  trust: false,
  setTrust: () => {},
} as AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface>(defaultValues);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [ accessToken, setAccessToken ] = useState<string | null>(null);
  const [ refresh, setRefresh ] = useState<boolean>(false);
  const [ trust, setTrust ] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{
       accessToken,
       setAccessToken,
       refresh,
       setRefresh,
       trust,
       setTrust,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

