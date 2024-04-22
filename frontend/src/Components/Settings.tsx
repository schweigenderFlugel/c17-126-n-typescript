import { useState } from 'react';
import { DashboardNavbar } from './DashboardNavbar';
import { FormRow } from './FormRow';

type UserSettingsType = {
  email: string;
  firstName: string;
  lastName: string;
  alias: string;
  maxAmountTransfer: number;
};

const userData: UserSettingsType = {
  email: 'juanalbertoperez@example.com',
  firstName: 'Juan Alberto',
  lastName: 'Perez',
  alias: 'juan.perez',
  maxAmountTransfer: 1000,
};

export const Settings = () => {
  const [formValues, setFormValues] = useState<UserSettingsType>(userData);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleReset = () => {
    setFormValues(userData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Cambiar por el del hook
  const isLoading = false;

  return (
    <main className="gap-y-10 grid grid-cols-12 grid-rows-12 bg-transparent w-full h-full">
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
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            disabled={isLoading}
          />
          <FormRow
            label="Apellido"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            disabled={isLoading}
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
