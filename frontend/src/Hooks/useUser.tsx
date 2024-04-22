import { useEffect, useState } from "react";
import { getUser } from "../Services/user";
import { IUser } from "../Interfaces/interfaces";
import { useAuth } from "./useAuth";
import { AxiosError } from "axios";

type options = {
    onSuccess?: () => void;
    onReject?: (error: AxiosError) => void
  };

export const useUser = ({ onSuccess, onReject }: options) => {
  const [ userData, setUserData ] = useState<IUser | null>(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      getUser()
      .then(({ user }) => {
        setUserData(user);
      })
      .then(() => {
        onSuccess?.();
       })
      .catch(error => {
        onReject?.(error);
       });
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    }, [accessToken]);
  return { userData }
}