import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { login } from "../Services/user";
import { ILoginPayload } from "../Interfaces/interfaces";
import { AxiosError } from "axios";

type options  = {
  onSuccess?: () => void;
  onReject?: (error: AxiosError) => void;
}

export const useLogin = ({ onSuccess, onReject }: options) => {
  const { setAccessToken, trust, setTrust } = useContext(AuthContext);

  const setLogin = async (payload: ILoginPayload) => {
    await login(payload)
      .then((res) => {
        setAccessToken(res.accessToken)
      }).then(() => {
        onSuccess?.()
      }).catch((error) => {
        onReject?.(error)
      })
  }
  return { setLogin, trust, setTrust }
}