import { useEffect, useState } from 'react';
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

const initialValue: ICreateUserPayload = {
  name: '',
  lastname: '',
  accountType: 'personal',
  alias: '',
  address: '',
  phone: '',
};

export const PersonalDataForm = () => {
  const [formValues, setFormValues] =
    useState<ICreateUserPayload>(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const { accessToken } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await createUser(formValues);

      navigate('/dashboard', { replace: true });
    } catch (serverError) {
      console.log(serverError);
      if (
        serverError instanceof AxiosError &&
        !!serverError.response?.data.length
      ) {
        serverError.response?.data.forEach(error => {
          toast.error(`Error en el campo "${error.path}": ${error.message}`);
        });
      } else if (serverError instanceof AxiosError && serverError.message) {
        toast.error(serverError.message);
      } else {
        toast.error('Error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if (!accessToken) navigate('/login', { replace: true });
  }, [accessToken, navigate]);

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
            label="Tipo de cuenta"
            onChange={handleChange}
            value={formValues.accountType}
            options={[
              { value: 'enterprise', label: 'Empresa', disable: false },
              { value: 'personal', label: 'Personal', disable: false },
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
              formValues.accountType! == '' ||
              formValues.alias.length < 1
            }
            isLoading={isLoading}
            label="Terminar Registro"
          />
        </div>
      </form>
    </AuthFormContainer>
  );
};
