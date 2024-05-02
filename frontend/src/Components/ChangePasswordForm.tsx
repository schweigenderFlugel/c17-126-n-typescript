import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { IChangePassword, IUser  } from '../Interfaces/interfaces';
import { changePassword } from '../Services/user';

const initialValue: IChangePassword = {
  currentPassword: '',
  newPassword: '',
}

export const TransferForm = ({ user, onClose }: { user: IUser | null, onClose: () => void }) => {
  const [formValues, setFormValues] = useState<IChangePassword>(initialValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = user?.auth.id as number;
    toast.promise(
      changePassword(id, formValues),
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
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="justify-items-center border-indigo-300 dark:border-indigo-500 grid bg-indigo-200 dark:bg-indigo-950 shadow-xl max-sm:m-0 mx-6 p-12 max-sm:p-8 border rounded-2xl w-[450px] max-sm:w-full">
      <form className="w-full" onSubmit={handleSubmit}>
        <label
          htmlFor="alias"
          className="w-full text-gray-900 text-sm dark:text-white"
        >
          Contraseña actual
        </label>
        <div className="relative flex justify-between items-center mb-2">
          <input
            type="text"
            id="destination_alias"
            name="destination_alias"
            value={formValues.currentPassword}
            onChange={handleChange}
            className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-black text-sm dark:text-white"
          />
        </div>
        <label
          htmlFor="alias"
          className="w-full text-gray-900 text-sm dark:text-white"
        >
          Contraseña nueva
        </label>
        <div className="relative flex justify-between items-center mb-2">
          <input
            type="text"
            id="destination_alias"
            name="destination_alias"
            value={formValues.newPassword}
            onChange={handleChange}
            className="border-indigo-400 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-black text-sm dark:text-white"
          />
        </div>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-400 mt-4 py-2 rounded-lg w-full text-white transition disabled:cursor-not-allowed"
        >
          Actualizar contraseña
        </button>
      </form>
    </div>
  );
};
