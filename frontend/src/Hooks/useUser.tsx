import { useEffect } from "react";
import { getUser } from "../Services/user";
import { useAuth } from "./useAuth";
import { AxiosError } from "axios";
import { IUser } from "../Interfaces/interfaces";

type options = {
  onSuccess?: () => void;
  onReject?: (error: AxiosError) => void;
};

export const useUser = ({ onSuccess, onReject }: options) => {
  const { accessToken, setUserData } = useAuth();

  useEffect(() => {
    if (accessToken) {
      getUser()
        .then(( user: IUser | null ) => {
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
}