import { DatePicker } from '@tremor/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { useAuth } from '../Hooks/useAuth';
import { makeTransfer } from '../Services/apiTransfer';
import { useBalance } from '../Hooks/useBalance';

type FormPersonalDataType = {
  alias: string;
  quantity: string;
};

const initialValue: FormPersonalDataType = {
  alias: '',
  quantity: '',
};

export const TransferForm = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] =
    useState<FormPersonalDataType>(initialValue);

  const { userData } = useAuth();

  const { startLoadingUserBalance } = useBalance();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    async function transfer(): Promise<void> {
      setIsLoading(true);

      const amount = +formValues.quantity;

      if (userData?.id && amount)
        return await makeTransfer({
          amount,
          destination_account: formValues.alias,
          source_account: userData?.id,
          type: 'inmediate',
        });
    }

    toast.promise(
      transfer(),
      {
        loading: 'Cargando',
        success: () => {
          setIsLoading(false);
          startLoadingUserBalance();
          onClose();
          return `Transferencia exitosa`;
        },
        error: () => {
          setIsLoading(false);
          return `Error al Transferir`;
        },
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

  return (
    <div className="justify-items-center border-indigo-300 dark:border-indigo-500 grid bg-indigo-200 dark:bg-indigo-950 shadow-xl max-sm:m-0 mx-6 p-12 max-sm:p-8 border rounded-2xl w-[450px] max-sm:w-full">
      <form className="w-full" onSubmit={handleSubmit}>
        <label
          htmlFor="alias"
          className="w-full text-gray-900 text-sm dark:text-white"
        >
          Alias
        </label>
        <div className="relative flex justify-between items-center mb-2">
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
        <div className="relative flex justify-between items-center mb-2">
          <span className="top-[50%] left-2 absolute -translate-y-[50%]">
            <HiOutlineCurrencyDollar className="text-gray-900 dark:text-white" />
          </span>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formValues.quantity}
            onChange={handleChange}
            className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 pl-7 border rounded-md w-full h-8 text-black text-sm dark:text-white"
          />
        </div>
        <label
          htmlFor="quantity"
          className="mt-2 w-full text-gray-900 text-sm dark:text-white"
        >
          Fecha de tranferencias
        </label>
        <div className="relative flex justify-between items-center">
          <DatePicker
            className="border-white border rounded-lg"
            minDate={new Date()}
            placeholder="Selecciona una fecha"
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
