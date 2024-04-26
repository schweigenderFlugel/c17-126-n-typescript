import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { HiOutlineCreditCard, HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { useAuth } from '../Hooks/useAuth';
import { makeDeposit } from '../Services/apiDeposit';
import { useBalance } from '../Hooks/useBalance';

type DepositFormType = {
  cardName: string;
  cardNumber: string;
  expirationDate: string;
  CVV: string;
  quantity: string;
};

const initialValue: DepositFormType = {
  cardName: 'Juan Perez',
  cardNumber: '1234 1234 1234 1234',
  expirationDate: '12 / 24',
  CVV: '123',
  quantity: '',
};

export const DepositForm = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<DepositFormType>(initialValue);

  const { userData } = useAuth();

  const { startLoadingUserBalance } = useBalance();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formValues.cardNumber ||
      !formValues.cardName ||
      !formValues.expirationDate ||
      !formValues.CVV
    ) {
      return toast('Por favor, completa los datos de la tarjeta');
    }
    if (!formValues.quantity) {
      return toast('Por favor, ingresa la cantidad a depositar');
    }

    async function deposit(): Promise<void> {
      setIsLoading(true);
      if (userData?.id)
        return await makeDeposit({
          accountId: userData?.id,
          amount: +formValues.quantity,
        });
    }

    toast.promise(
      deposit(),
      {
        loading: 'Cargando',
        success: () => {
          onClose();
          startLoadingUserBalance();
          return `Deposito exitoso`;
        },
        error: () => {
          startLoadingUserBalance();
          return `Error al depositar`;
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

  const handleCardNumberChange = ({ target }) => {
    const input = target.value.replace(/\D/g, '');

    let formattedInput = '';
    for (let i = 0; i < input.length; i++) {
      if (i % 4 === 0 && i > 0) {
        formattedInput += ' ';
      }
      formattedInput += input[i];
    }
    setFormValues({ ...formValues, cardNumber: formattedInput });
  };

  const handleExpirationDateChange = ({ target }) => {
    const input = target.value.replace(/\D/g, '');

    // Agrega una barra ('/') después de ingresar dos digitos
    let formattedInput = '';
    for (let i = 0; i < input.length; i++) {
      if (i % 2 === 0 && i > 0) {
        formattedInput += ' / ';
      }
      formattedInput += input[i];
    }

    setFormValues({ ...formValues, expirationDate: formattedInput });
  };

  const handleCVVChange = ({ target }) => {
    const input = target.value.replace(/\D/g, '');
    setFormValues({ ...formValues, CVV: input });
  };

  return (
    <div className="justify-items-center border-indigo-300 dark:border-indigo-500 grid bg-indigo-200 dark:bg-indigo-950 shadow-xl mx-auto p-12 max-sm:p-8 border rounded-2xl w-[450px] max-sm:w-[90%]">
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
            maxLength={19}
            value={formValues.cardNumber}
            onChange={handleCardNumberChange}
            className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 pl-8 border rounded-md w-full h-8 text-black text-sm dark:text-white tracking-widest"
          />
        </div>
        <div className="flex gap-8 mb-2">
          <div>
            <label
              htmlFor="expirationDate"
              className="w-full text-gray-900 text-sm dark:text-white"
            >
              Expiración
            </label>
            <div className="flex justify-between items-center">
              <input
                maxLength={7}
                type="text"
                placeholder="MM / YY"
                id="expirationDate"
                name="expirationDate"
                value={formValues.expirationDate}
                onChange={handleExpirationDateChange}
                className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-black text-sm dark:text-white"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="CVV"
              className="w-full text-gray-900 text-sm dark:text-white"
            >
              CVV
            </label>
            <div className="flex justify-between items-center">
              <input
                type="text"
                id="CVV"
                name="CVV"
                maxLength={3}
                value={formValues.CVV}
                onChange={handleCVVChange}
                className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-black text-sm dark:text-white tracking-widest"
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
