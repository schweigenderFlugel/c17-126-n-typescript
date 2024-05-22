import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { useLogin } from '../Hooks/useLogin';
import { AuthFormContainer } from '../Components/AuthFormContainer';
import { AuthFormRow } from '../Components/AuthFormRow';
import { ButtonAuthForm } from '../Components/ButtonAuthForm';
import { ActivationForm } from '../Components/AccountActivation';
import { useAuth } from '../Hooks/useAuth';
import { ServerErrorResponse } from '../Interfaces/error.interface';
import { ERROR_MESSAGES } from '../data/enums';
import { ISign } from '../Interfaces/auth.interface';
import { BlockedAccountMessage } from '../Components/BlockedAccountMessage';

export const Login = () => {
  const [email, setEmail] = useState<ISign['email']>('')
  const [password, setPassword] = useState<ISign['password']>('');
  const [activate, setActivate] = useState<boolean>(false)
  const [block, setBlock] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const { accessToken, setLoadingUser } = useAuth();

  const onLoginError = (serverError: AxiosError<ServerErrorResponse>) => {
    if (
      serverError.response?.status === 401 && 
      serverError.response.data.error.message === ERROR_MESSAGES.INVALID_CREDENTIALS
    ) {
      const error = 'Datos inválidos';
      toast.error(error);
    } 
    if (
      serverError.response?.status === 401 && 
      serverError.response.data.error.message === ERROR_MESSAGES.AUTH_BLOCKED
    ) {
      setBlock(true);
    } else if (
      serverError.response?.status === 403 &&
      serverError.response.data.error.message === ERROR_MESSAGES.NOT_ACTIVE
    ) {
      setActivate(true);
    } else if (
      serverError.response?.status === 404 &&
      serverError.response.data.error.message === ERROR_MESSAGES.INVALID_CREDENTIALS
    ) {
      const error = 'Usuario no encontrado';
      toast.error(error);
    } else {
      const error = 'Error desconocido';
      toast.error(error);
    }
  };

  const { setLogin, isLoading, setIsLoading } = useLogin({
    onSuccess: () => {
      setLoadingUser(true);
      toast('Bienvenido', {
        icon: '👋',
      })
    },
    onReject: error => {
      setIsLoading(false)
      onLoginError(error as AxiosError<ServerErrorResponse>)
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    setLogin({ email, password });
  };

  const passwordInputType = showPassword ? 'text' : 'password';

  useEffect(() => {
    if (accessToken) navigate('/dashboard', { replace: true });
  }, [accessToken]);

  return (
    <>
      {!activate && !block &&
        <AuthFormContainer subtitle="¡Nos alegra tenerte de vuelta!">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <AuthFormRow
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                label="E-Mail"
                key="email"
                name="email"
                autoComplete="email"
                required
                disable={isLoading}
              />
              <AuthFormRow
                onChange={e => setPassword(e.target.value)}
                value={password}
                type={passwordInputType}
                label="Contraseña"
                key="password"
                name="password"
                autoComplete="current-password"
                onClickPasswordBtn={() =>
                  setShowPassword(showPassword => !showPassword)
                }
                required
                showPassword={showPassword}
                disable={isLoading}
              />
            </div>
            <div className="flex justify-end mt-2 mb-4 w-full">
              <Link
                to="../contrasena-olvidada"
                className="text-gray-500 text-xs hover:text-gray-900 dark:text-white"
              >
                ¿Olvidaste la contraseña?
              </Link>
            </div>
            <div className="mb-4">
              <ButtonAuthForm
                label="Ingresar"
                disabled={email.length < 6 || password.length < 6}
                isLoading={isLoading}
              />
            </div>
          </form>
          <div className="text-base text-black text-center dark:text-white">
            <p>
              <span className="text-base text-gray-500">¿No tenés cuenta? </span>
              <Link to={'/registro'}>Registrate ahora</Link>
            </p>
          </div>
        </AuthFormContainer>
      }
      {activate && 
        <ActivationForm email={email} />
      }
      {block &&
        <BlockedAccountMessage />
      }
    </>
  );
};
