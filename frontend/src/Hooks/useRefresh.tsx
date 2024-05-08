import { useEffect } from "react";
import { refreshSession } from "../Services/user";
import { useAuth } from "./useAuth";

type options = {
    onSuccess?: () => void;
    onReject?: () => void;
    // eslint-disable-next-line no-unused-vars
    setToken: (token: string | null) => void;
  };

export const useRefresh = ({ onSuccess, onReject, setToken }: options) => {
  const { setQueryTime } = useAuth()
  const startTime = Date.now();

  useEffect(() => {
    refreshSession()
      .then(({ accessToken }) => {
        setToken(accessToken);
        const endTime = Date.now();
        setQueryTime(endTime - startTime + 1000);
      })
      .then(() => {
        onSuccess?.();
      })
      .catch(() => {
        onReject?.();
      })
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}