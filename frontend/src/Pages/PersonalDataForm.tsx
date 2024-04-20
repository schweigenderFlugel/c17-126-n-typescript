import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { useAuth } from '../Hooks/useAuth';
import { AuthFormContainer } from '../Components/AuthFormContainer';
import { AuthFormRow } from '../Components/AuthFormRow';
import { ButtonAuthForm } from '../Components/ButtonAuthForm';

type FormPersonalDataType = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  alias: string;
};

const initialValue: FormPersonalDataType = {
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  alias: '',
};

export const PersonalDataForm = () => {
  const [formValues, setFormValues] =
    useState<FormPersonalDataType>(initialValue);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formValues); // 👈 Reemplazar por función para hacer petición
      navigate('/dashboard', { replace: true });
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
    if (accessToken) navigate('/dashboard');
  }, [accessToken, navigate]);

  return (
    <>
      <AuthFormContainer subtitle="¡Un último paso!">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-2">
            <AuthFormRow
              onChange={handleChange}
              value={formValues.firstName}
              type="text"
              label="Nombre"
              key="firstName"
              name="firstName"
              autoComplete="name"
              required
            />
            <AuthFormRow
              onChange={handleChange}
              value={formValues.lastName}
              type="text"
              label="Apellido"
              key="lastName"
              name="lastName"
              autoComplete="name"
              required
            />
            <AuthFormRow
              onChange={handleChange}
              value={formValues.alias}
              type="text"
              label="Alias"
              key="alias"
              name="alias"
              autoComplete="username"
              required
            />
            <AuthFormRow
              onChange={handleChange}
              value={formValues.address}
              type="text"
              label="Dirección"
              key="address"
              name="address"
              autoComplete="street-address"
              required
            />
            <AuthFormRow
              onChange={handleChange}
              value={formValues.phone}
              type="tel"
              label="Teléfono"
              key="phone"
              name="phone"
              autoComplete="tel"
              required
            />
          </div>
          <div className="my-4">
            <ButtonAuthForm
              disabled={
                formValues.address.length < 1 ||
                formValues.firstName.length < 1 ||
                formValues.lastName.length < 1 ||
                formValues.phone.length < 1
              }
              isLoading={isLoading}
              label="Terminar Registro"
            />
          </div>
        </form>
      </AuthFormContainer>
    </>
  );
};
