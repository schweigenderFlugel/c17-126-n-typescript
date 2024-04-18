import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { AuthFormContainer } from '../Components/AuthFormContainer';
import { AuthFormRow } from '../Components/AuthFormRow';
import { ButtonAuthForm } from '../Components/ButtonAuthForm';
import { IUserPayload } from '../Interfaces/interfaces';
import { createUser } from '../Services/user';

const initialValue: IUserPayload = {
  name: '',
  lastname: '',
  address: '',
  phone: '',
  alias: '',
};

export const PersonalDataForm = () => {
  const [formValues, setFormValues] =
    useState<IUserPayload>(initialValue);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createUser(formValues)
      navigate('/dashboard', { replace: true });
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

  return (
    <>
      <AuthFormContainer subtitle="¡Un último paso!">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-2">
            <AuthFormRow
              onChange={handleChange}
              value={formValues.name}
              type="text"
              label="Nombre"
              key="firstName"
              name="firstName"
              autoComplete="name"
              required
            />
            <AuthFormRow
              onChange={handleChange}
              value={formValues.lastname}
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
                formValues.name.length < 1 ||
                formValues.lastname.length < 1 ||
                formValues.address.length < 1 ||
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
