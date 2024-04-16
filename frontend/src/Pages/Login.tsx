import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { useAuth } from '../Hooks/useAuth';
import { useLogin } from '../Hooks/useLogin';
import { Modal } from '../Components/Modal';
import { AuthFormContainer } from '../Components/AuthFormContainer';
import { AuthFormRow } from '../Components/AuthFormRow';
import { ErrorMessage } from '../Components/ErrorMessage';
import { ButtonAuthForm } from '../Components/ButtonAuthForm';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { accessToken } = useAuth();

  const onLoginError = (error: AxiosError) => {
    if (error.response?.status === 401) {
      setError('Datos inválidos');
      setOpenModal(true);
    } else if (error.response?.status === 404) {
      setError('Usuario no encontrado');
      setOpenModal(true);
    } else {
      setError('Error desconocido');
      setOpenModal(true);
    }
  };

  const { setLogin, loading } = useLogin({
    onSuccess: () => navigate('/', { replace: true }),
    onReject: error => onLoginError(error),
  });

  const handleSubmit = e => {
    e.preventDefault();
    setLogin({ email, password });
  };

  const passwordInputType = showPassword ? 'text' : 'password';

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) navigate('/dashboard', { replace: true });
  }, [accessToken, navigate]);

  return (
    <>
      <Modal open={openModal}>
        <ErrorMessage>{error}</ErrorMessage>
      </Modal>
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
              isLoading={loading}
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
