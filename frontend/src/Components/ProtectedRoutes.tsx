import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { PropsWithChildren } from 'react';

export const RequireLogin = ({ children }: PropsWithChildren) => {
  const { accessToken } = useAuth();
  const location = useLocation();

  return accessToken ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};