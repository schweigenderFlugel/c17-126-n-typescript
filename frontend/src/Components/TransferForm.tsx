import { useState } from 'react';
import { toast } from 'react-hot-toast';

type FormPersonalDataType = {
  alias: string;
  quantity: string;
};

const initialValue: FormPersonalDataType = {
  alias: '',
  quantity: '',
};

export const TransferForm = () => {
  const [formValues, setFormValues] =
    useState<FormPersonalDataType>(initialValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    function transfer(): Promise<void> {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }

    toast.promise(
      transfer(),
      {
        loading: 'Cargando',
        success: () => `Transferencia exitosa`,
        error: () => `Error al Transferir`,
      },
      {
        style: {
          minWidth: '250px',
        },
      }
    );
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const isLoading = false;

  return (
    <div className="justify-items-center border-indigo-300 dark:border-indigo-500 grid bg-indigo-200 dark:bg-indigo-950 shadow-xl mx-6 p-12 max-sm:p-8 border rounded-2xl w-[450px]">
      <form className="w-full" onSubmit={handleSubmit}>
        <label
          htmlFor="alias"
          className="w-full text-gray-900 text-sm dark:text-white"
        >
          Alias
        </label>
        <div className="relative flex justify-between items-center">
          <input
            type="text"
            id="alias"
            name="alias"
            value={formValues.alias}
            onChange={handleChange}
            className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-black text-sm dark:text-white"
          />
        </div>
        <label
          htmlFor="quantity"
          className="w-full text-gray-900 text-sm dark:text-white"
        >
          Cantidad
        </label>
        <div className="relative flex justify-between items-center">
          <input
            placeholder="$"
            type="number"
            id="quantity"
            name="quantity"
            value={formValues.quantity}
            onChange={handleChange}
            className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-black text-sm dark:text-white"
          />
        </div>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-400 mt-4 py-2 rounded-lg w-full text-white transition disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Transferir
        </button>
      </form>
    </div>
  );
};
