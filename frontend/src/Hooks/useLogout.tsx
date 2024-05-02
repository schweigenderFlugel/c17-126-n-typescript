import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { logout } from "../Services/user";

type options = {
  onSuccess?: () => void;
  onReject?: () => void;
} 

export const useLogout = ({ onSuccess, onReject }: options) => {
  const { accessToken, setAccessToken } = useContext(AuthContext); 

  const setLogout = async () => {
    await logout(accessToken)
      .then(() => {
        setAccessToken(null)
      }).then(() => {
        onSuccess?.()
      }).catch(() => {
        onReject?.()
      })
  } 
  return { setLogout }
} 