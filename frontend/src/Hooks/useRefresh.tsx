import { useEffect } from "react";
import { refreshSession } from "../Services/user";

type options = {
    onSuccess?: () => void;
    onReject?: () => void;
    // eslint-disable-next-line no-unused-vars
    setToken: (token: string | null) => void;
  };

export const useRefresh = ({ onSuccess, onReject, setToken }: options) => {
  useEffect(() => {
    refreshSession()
      .then(({ accessToken }) => {
        setToken(accessToken);
      })
      .then(() => {
        onSuccess?.();
      })
      .catch(() => {
        onReject?.();
      });
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}