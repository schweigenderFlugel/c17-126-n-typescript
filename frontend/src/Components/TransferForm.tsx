import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { TransferTypeSelect } from './TransferTypeSelect';
import { createTransaction } from '../Services/transfers';
import { IBankAccount, ICreateTransaction } from '../Interfaces/interfaces';
import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { getAliases } from '../Services/user';

export enum TYPETRANSFERS {
  INMEDIATE = 'inmediate',
  DEFERRED = 'deferred',
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export const TransferForm = ({ bank_account, onClose }: { bank_account: IBankAccount | undefined, onClose: () => void }) => {
  const [isTransferLoading, setIsTransferLoading] = useState<boolean>(false);
  const [aliases, setAliases] = useState<string[] | null>(null);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [selectedAlias, setSelectedAlias] = useState<string | null>(null)

  const initialValue: ICreateTransaction = {
    source_account: bank_account?.id ?? 0,
    destination_alias: '',
    amount: 0,
    type: TYPETRANSFERS.DEFERRED,
  };

  const [formValues, setFormValues] = useState<ICreateTransaction>(initialValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTransferLoading(true);
    formValues.amount = +formValues.amount;
    toast.promise(
      createTransaction(formValues),
      {
        loading: 'Cargando',
        success: () => {
          onClose();
          return `Transferencia exitosa`;
        },
        error: () => {
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
  }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlias(null);
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if(formValues.destination_alias.length >= 3) {
      getAliases(formValues.destination_alias)
        .then(( aliases ) => {
          setAliases(aliases);
          formValues.destination_alias !== selectedAlias && setOpenDropdown(true)
        }).catch(() => {
          setAliases([]);
        })
    } else {
      setAliases(null)
    }
  }, [formValues.destination_alias])

  formValues.destination_alias = selectedAlias 
    ? selectedAlias
    : formValues.destination_alias;

  return (
    <div className="justify-items-center border-indigo-300 dark:border-indigo-500 grid bg-indigo-200 dark:bg-indigo-950 shadow-xl max-sm:m-0 mx-6 p-12 max-sm:p-8 border rounded-2xl w-[450px] max-sm:w-full">
      <form className="w-full" onSubmit={handleSubmit}>
        <label
          htmlFor="alias"
          className="w-full text-gray-900 text-sm dark:text-white"
        >
          Alias
        </label>
        <div>
          <div className="relative justify-between items-center mb-2">
            <input
              type="text"
              id="destination_alias"
              name="destination_alias"
              value={formValues.destination_alias}
              onChange={handleChange}
              className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-black text-sm dark:text-white mb-1"
            />
            {aliases?.length === 0 
              ? <p className='dark:text-white bg-white dark:bg-black dark:bg-opacity-80 rounded-md px-2 py-2'>
                  No se encontró ninguna coincidencia
                </p>
              : (openDropdown && 
                  <div className='dark:text-white bg-white dark:bg-black dark:bg-opacity-80 rounded-md'>
                    <ul>
                      {aliases?.map((alias, index) => (
                        <li 
                          className='cursor-pointer dark:hover:bg-indigo-600 rounded-md px-2 py-2'
                          key={index} 
                          value={alias}
                          onClick={() => {
                            setSelectedAlias(alias)
                            setOpenDropdown(false)
                          }}
                        >
                          {alias}
                        </li>
                      ))}
                  </ul>          
                </div>)
              }
          </div>
        </div>
        <TransferTypeSelect
          label='Tipo de Transferencia'
          name='type'
          value={formValues.type}
          onChange={handleChange}
          options={[
            { value: 'select', label: 'Seleccionar', disable: true },
            { value: TYPETRANSFERS.DEFERRED, label: 'Diferido', disable: false },
            { value: TYPETRANSFERS.CREDIT, label: 'Crédito', disable: false },
            { value: TYPETRANSFERS.DEBIT, label: 'Débito', disable: false },
            { value: TYPETRANSFERS.INMEDIATE, label: 'Inmediato', disable: false },
          ]}
        />
        <label
          htmlFor="amount"
          className="w-full text-gray-900 text-sm dark:text-white"
        >
          Cantidad
        </label>
        <div className="relative flex justify-between items-center mb-2">
          <span className="top-[50%] left-2 absolute -translate-y-[50%]">
            <HiOutlineCurrencyDollar className="text-gray-900 dark:text-white" />
          </span>
          <input
            placeholder="$"
            type="number"
            id="amount"
            name="amount"
            value={formValues.amount}
            onChange={handleChange}
            className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 pl-7 border rounded-md w-full h-8 text-black text-sm dark:text-white"
          />
        </div>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-400 mt-4 py-2 rounded-lg w-full text-white transition disabled:cursor-not-allowed"
          disabled={isTransferLoading}
        >
          Transferir
        </button>
      </form>
    </div>
  );
};
