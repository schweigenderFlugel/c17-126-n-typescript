import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { signup } from '../Services/user';
import { AuthFormContainer } from '../Components/AuthFormContainer';
import { AuthFormRow } from '../Components/AuthFormRow';
import { ButtonAuthForm } from '../Components/ButtonAuthForm';
import { useAuth } from '../Hooks/useAuth';

export const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Las contraseñas no coinciden');
    }
    try {
      setIsLoading(true);
      await signup({ email, password });
      navigate('/login', { replace: true });
    } catch (serverError) {
      let errorMessage: string;
      if (serverError instanceof AxiosError && serverError.message) {
        errorMessage = serverError.message;
      } else {
        errorMessage = 'Error desconocido';
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordInputType = showPassword ? 'text' : 'password';
  const confirmPasswordInputType = showConfirmPassword ? 'text' : 'password';

  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) navigate('/dashboard', { replace: true });
  }, [accessToken, navigate]);

  return (
    <>
      <AuthFormContainer subtitle="¡Nos alegra tenerte por acá!">
        <form onSubmit={handleSubmit} className="w-full">
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
              autoComplete="new-password"
              onClickPasswordBtn={() =>
                setShowPassword(showPassword => !showPassword)
              }
              required
              showPassword={showPassword}
            />
            <AuthFormRow
              onChange={e => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type={confirmPasswordInputType}
              label="Confirmar Contraseña"
              key="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              onClickPasswordBtn={() =>
                setShowConfirmPassword(
                  showConfirmPassword => !showConfirmPassword
                )
              }
              required
              showPassword={showConfirmPassword}
            />
          </div>
          <div className="my-4">
            <ButtonAuthForm
              label="Registrarse"
              disabled={email.length < 6 || password.length < 6}
              isLoading={isLoading}
            />
          </div>
        </form>
        <div className="text-base text-black text-center dark:text-white">
          <p>
            <span className="text-base text-gray-500 dark:text-gray-400">
              ¿Ya tenés cuenta?{' '}
            </span>
            <Link to={'/login'}>Inicia sesión</Link>
          </p>
        </div>
      </AuthFormContainer>
    </>
  );
};
