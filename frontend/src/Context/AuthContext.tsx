import {
  Dispatch,
  SetStateAction,
  ReactNode,
  createContext,
  useState,
} from 'react'

interface AuthContextInterface {
  accessToken: string | null
  setAccessToken: Dispatch<SetStateAction<string | null>>
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
  remember: boolean
  setRemember: Dispatch<SetStateAction<boolean>>
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
} as AuthContextInterface

export const AuthContext = createContext<AuthContextInterface>(defaultValues)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [remember, setRemember] = useState<boolean>(false)

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refresh,
        setRefresh,
        remember,
        setRemember,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
