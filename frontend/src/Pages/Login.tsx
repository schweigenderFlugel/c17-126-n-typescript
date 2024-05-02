import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { useLogin } from '../Hooks/useLogin';
import { AuthFormContainer } from '../Components/AuthFormContainer';
import { AuthFormRow } from '../Components/AuthFormRow';
import { ButtonAuthForm } from '../Components/ButtonAuthForm';
import { useAuth } from '../Hooks/useAuth';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const { accessToken } = useAuth();

  const onLoginError = (serverError: AxiosError) => {
    let error: string;
    if (serverError.response?.status === 401) {
      error = 'Datos inválidos';
    } else if (serverError.response?.status === 404) {
      error = 'Usuario no encontrado';
    } else {
      error = 'Error desconocido';
    }
    toast.error(error);
  };

  const { setLogin, isLoading } = useLogin({
    onSuccess: () => {
      navigate('/dashboard', { replace: true });
      toast('Bienvenido', {
        icon: '👋',
      });
    },
    onReject: error => onLoginError(error),
  });

  const handleSubmit = e => {
    e.preventDefault();
    setLogin({ email, password });
  };

  const passwordInputType = showPassword ? 'text' : 'password';

  useEffect(() => {
    if (accessToken) navigate('/dashboard', { replace: true });
  }, [accessToken, navigate]);

  return (
    <>
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
    </>
  );
};
