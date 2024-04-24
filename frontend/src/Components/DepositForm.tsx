import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { HiOutlineCreditCard, HiOutlineCurrencyDollar } from 'react-icons/hi2';

type DepositFormType = {
  cardName: string;
  cardNumber: string;
  expirationDate: string;
  CVV: string;
  quantity: string;
};

const initialValue: DepositFormType = {
  cardName: '',
  cardNumber: '',
  expirationDate: '',
  CVV: '',
  quantity: '',
};

export const DepositForm = () => {
  const [formValues, setFormValues] = useState<DepositFormType>(initialValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    function deposit(): Promise<void> {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }

    toast.promise(
      deposit(),
      {
        loading: 'Cargando',
        success: () => `Deposito exitoso`,
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
          htmlFor="cardName"
          className="w-full text-gray-900 text-sm dark:text-white"
        >
          Nombre que figura en la tarjeta
        </label>
        <div className="relative flex justify-between items-center mb-2">
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={formValues.cardName}
            onChange={handleChange}
            className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-black text-sm dark:text-white"
          />
        </div>
        <label
          htmlFor="cardNumber"
          className="w-full text-gray-900 text-sm dark:text-white"
        >
          Numero de tarjeta
        </label>
        <div className="relative flex justify-between items-center mb-2">
          <span className="top-[50%] left-2 absolute -translate-y-[50%]">
            <HiOutlineCreditCard className="text-gray-900 dark:text-white" />
          </span>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formValues.cardNumber}
            onChange={handleChange}
            className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 pl-8 border rounded-md w-full h-8 text-black text-sm dark:text-white"
          />
        </div>
        <div className="flex gap-8 mb-2">
          <div>
            <label
              htmlFor="expirationDate"
              className="w-full text-gray-900 text-sm dark:text-white"
            >
              Fecha de expiración
            </label>
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="MM / YY"
                id="expirationDate"
                name="expirationDate"
                value={formValues.expirationDate}
                onChange={handleChange}
                className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-black text-sm dark:text-white"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="expirationDate"
              className="w-full text-gray-900 text-sm dark:text-white"
            >
              CVV
            </label>
            <div className="flex justify-between items-center">
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                value={formValues.expirationDate}
                onChange={handleChange}
                className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-black text-sm dark:text-white"
              />
            </div>
          </div>
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
        <button
          className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-400 mt-4 py-2 rounded-lg w-full text-white transition disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Depositar
        </button>
      </form>
    </div>
  );
};
