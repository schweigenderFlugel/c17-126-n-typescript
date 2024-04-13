import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

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

const sendForgotPasswordData = (formValues: ForgotPasswordFormType) => {
  console.log(formValues);
};

export const ForgotPasswordForm = () => {
  const [formValues, setFormValues] =
    useState<ForgotPasswordFormType>(initialValue);
  const navigate = useNavigate();

  const { accessToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      sendForgotPasswordData(formValues);
      navigate('/', { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [name]: value });
  };

  //🔴[TODO]:Reemplazar por el del hook
  const isLoading = false;

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
