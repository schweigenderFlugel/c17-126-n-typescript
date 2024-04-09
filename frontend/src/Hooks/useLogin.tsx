import { useContext } from "react";
import { AxiosError } from "axios";
import { login } from "../Services/user";
import { ILoginPayload } from "../Interfaces/interfaces";
import { AuthContext } from "../Context/AuthContext";

type options = {
  onSuccess?: () => void
  onReject?: (error: AxiosError) => void
}

export const useLogin = ({ onSuccess, onReject }: options) => {
  const { setAccessToken, remember, setRemember } = useContext(AuthContext)

  const setLogin = async (payload: ILoginPayload) => {
    await login(payload)
      .then(res => {
        setAccessToken(res.accessToken)
      })
      .then(() => {
        onSuccess?.()
      })
      .catch(error => {
        onReject?.(error)
      })
  }
  return { setLogin, remember, setRemember }
}
