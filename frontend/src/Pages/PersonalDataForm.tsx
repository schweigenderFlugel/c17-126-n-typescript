import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { AuthFormContainer } from '../Components/AuthFormContainer';
import { AuthFormRow } from '../Components/AuthFormRow';
import { ButtonAuthForm } from '../Components/ButtonAuthForm';
import { ICreateUserPayload } from '../Interfaces/interfaces';
import { AuthFormSelect } from '../Components/AuthFormSelect';
import { createUser } from '../Services/user';
import { useAuth } from '../Hooks/useAuth';

export enum TYPEACCOUNT {
  ENTERPRISE = 'enterprise',
  PERSONAL= 'personal',
}

const initialValue: ICreateUserPayload = {
  name: '',
  lastname: '',
  accountType: '',
  alias: '',
  address: '',
  phone: '',
};

export const PersonalDataForm = () => {
  const { setLoading } = useAuth();
  const [formValues, setFormValues] =
    useState<ICreateUserPayload>(initialValue);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createUser(formValues);
      setLoading(true);
      navigate('/dashboard', { replace: true })
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
  }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) => {
    setFormValues({ ...formValues, [name]: value });
  };

  //🔴[TODO]:Reemplazar por el del hook
  const isLoading = false;

  return (
    <AuthFormContainer subtitle="¡Un último paso!">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-2">
          <AuthFormRow
            onChange={handleChange}
            value={formValues.name}
            type="text"
            label="Nombre"
            key="name"
            name="name"
            autoComplete="name"
            required
          />
          <AuthFormRow
            onChange={handleChange}
            value={formValues.lastname}
            type="text"
            label="Apellido"
            key="lastname"
            name="lastname"
            autoComplete="lastname"
            required
          />
          <AuthFormSelect
            key="accountType"
            name="accountType"
            label='Tipo de cuenta'
            onChange={handleChange}
            value={formValues.accountType}
            options={[
              { value: initialValue.accountType, label: 'Seleccionar', disable: true },
              { value: TYPEACCOUNT.ENTERPRISE, label: 'Empresa', disable: false }, 
              { value: TYPEACCOUNT.PERSONAL, label: 'Personal', disable: false }
            ]}
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
              formValues.accountType == initialValue.accountType ||
              formValues.alias.length < 1
            }
            isLoading={isLoading}
            label="Terminar Registro"
          />
        </div>
      </form>
    </AuthFormContainer>
  )
};
