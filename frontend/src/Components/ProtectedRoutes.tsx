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

export const RequireEmail = ({ children }: PropsWithChildren) => {
  const { emailToActivate } = useAuth();

  return emailToActivate ? (
    children
  ) : (
    <Navigate to="/activar" replace />
  );
}