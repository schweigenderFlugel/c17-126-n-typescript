import { useState } from 'react';
import { DashboardNavbar } from './DashboardNavbar';
import { FormRow } from './FormRow';
import { FormSelect } from './FormSelect';
import { useAuth } from '../Hooks/useAuth';
import { updateUser } from '../Services/user';
import { UserSettingsType } from '../Interfaces/interfaces';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const Settings = () => {
  const { userData } = useAuth()

  const user: UserSettingsType = {
    email: userData?.auth.email ?? 'juanalberto@example.com',
    name: userData?.name ?? 'Juan Alberto',
    lastname: userData?.lastname ?? 'Perez',
    accountType: userData?.accountType ?? 'personal',
    alias: userData?.alias ?? 'juan.perez',
    maxAmountTransfer: 1000,
  };

  const [formValues, setFormValues] = useState<UserSettingsType>(user);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleReset = () => {
    setFormValues(user);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      updateUser(userData?.id, formValues);
      toast('Actualizado', {
        icon: '👋',
      });
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

  // Cambiar por el del hook
  const isLoading = false;

  return (
    <main className="bg-transparent w-full h-full">
      <DashboardNavbar>Configuración</DashboardNavbar>
      <div className="max-lg:col-span-12 col-start-2 col-end-12 row-start-3 max-lg:row-start-2">
        <h4 className="mt-2 text-2xl max-sm:text-xl dark:text-white">
          Actualizar datos personales
        </h4>
        <form
          className="flex flex-col gap-8 max-sm:gap-4 border-indigo-300 dark:border-indigo-600 dark:border-2 bg-indigo-100 dark:bg-indigo-950 shadow-lg mt-6 p-8 max-sm:p-6 border rounded-xl w-full max-sm:text-sm"
          onSubmit={handleSubmit}
        >
          <FormRow
            label="E-mail"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            disabled={true}
          />
          <FormRow
            label="Nombre"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            disabled={isLoading}
          />
          <FormRow
            label="Apellido"
            name="lastname"
            value={formValues.lastname}
            onChange={handleChange}
            disabled={isLoading}
          />
          <FormSelect
            key="accountType"
            name="accountType"
            label='Tipo de cuenta'
            onChange={handleChange}
            value={formValues.accountType}
            options={[
              { value: 'enterprise', label: 'Empresa', disable: false }, 
              { value: 'personal', label: 'Personal', disable: false }
            ]}
          />
          <FormRow
            label="Alias"
            name="alias"
            value={formValues.alias}
            onChange={handleChange}
            disabled={isLoading}
          />
          <FormRow
            label="Cantidad máxima de transferencia"
            name="maxAmountTransfer"
            value={formValues.maxAmountTransfer}
            onChange={handleChange}
            disabled={isLoading}
            type="number"
          />
          <div className="flex justify-end max-[500px]:justify-between w-full max-sm:text-sm">
            <button
              className="border-indigo-500 dark:border-white hover:bg-indigo-200/50 dark:hover:bg-indigo-500/20 disabled:bg-inherit dark:disabled:bg-inherit mr-3 px-4 max-sm:px-2 py-3 border rounded-lg disabled:text-gray-400 dark:text-white transition disabled:cursor-not-allowed"
              type="button"
              onClick={handleReset}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className="border-indigo-500 hover:border-indigo-600 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-400 px-4 max-sm:px-2 py-3 border rounded-lg text-white transition disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Actualizar información
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
