import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { useAuth } from '../Hooks/useAuth';
import { AuthFormContainer } from '../Components/AuthFormContainer';
import { AuthFormRow } from '../Components/AuthFormRow';
import { ButtonAuthForm } from '../Components/ButtonAuthForm';

type ForgotPasswordFormType = {
  email: string;
};

const initialValue: ForgotPasswordFormType = {
  email: '',
};

export const ForgotPasswordForm = () => {
  const [formValues, setFormValues] =
    useState<ForgotPasswordFormType>(initialValue);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formValues);
      navigate('/', { replace: true });
    } catch (serverError) {
      let errorMessage: string;
      if (serverError instanceof AxiosError && serverError.message) {
        errorMessage = serverError.message;
      } else {
        errorMessage = 'Error desconocido';
      }
      toast.error(errorMessage);
    }
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [name]: value });
  };

  //🔴[TODO]:Reemplazar por el del hook
  const isLoading = false;

  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) navigate('/dashboard', { replace: true });
  }, [accessToken, navigate]);

  return (
    <>
      <AuthFormContainer subtitle="Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-2">
            <AuthFormRow
              onChange={handleChange}
              value={formValues.email}
              type="email"
              label="E-Mail"
              key="email"
              name="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="my-4">
            <ButtonAuthForm
              disabled={formValues.email.length < 1}
              isLoading={isLoading}
              label="Restablecer contraseña"
            />
          </div>
        </form>
      </AuthFormContainer>
    </>
  );
};
