import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export const RequireLogin = () => {
  const { accessToken } = useAuth();
  const location = useLocation();

  return (
    accessToken
      ? <Outlet />
      : <Navigate to='/login' state={{ from: location }} replace />
    )
}
