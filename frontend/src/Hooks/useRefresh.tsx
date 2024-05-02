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
  const { setLoading } = useAuth();

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
      }).finally(() => {
        setLoading(false);
      })
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}