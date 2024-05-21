import { useState } from 'react';
import { DashboardNavbar } from './DashboardNavbar';
import { HiLockClosed } from 'react-icons/hi2';
import { FormRow } from './FormRow';
import { useAuth } from '../Hooks/useAuth';
import { updateUser } from '../Services/user';
import { UserSettingsType } from '../Interfaces/auth.interface'; 
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { Modal } from './Modal';
import { ChangePasswordForm } from './ChangePasswordForm';
import { UploadImage } from './ImageUploader';

export enum TYPEACCOUNT {
  ENTERPRISE = 'enterprise',
  PERSONAL= 'personal',
}

export const Settings = () => {
  const [ openModal, setOpenModal ] = useState(false);
  const { userData } = useAuth();

  const user: UserSettingsType = {
    name: userData?.name ?? 'Perez',
    lastname: userData?.lastname ?? 'Personal',
    avatar: userData?.avatar ?? 'image',
    alias: userData?.alias ?? 'juan.perez',
    phone: userData?.phone ?? '(000)-000-0000',
    address: userData?.address ?? 'Nowhere',
    min_ammount_transfers: userData?.preference.min_ammount_transfers ?? 10,
    max_ammount_transfers: userData?.preference.max_ammount_transfers ?? 1000,
  };

  const [formValues, setFormValues] = useState<UserSettingsType>(user);

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement> ) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleReset = () => {
    setFormValues(user);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      formValues.min_ammount_transfers = parseInt(formValues.min_ammount_transfers as unknown as string);
      formValues.max_ammount_transfers = parseInt(formValues.max_ammount_transfers as unknown as string);
      updateUser(userData?.id ?? '', formValues);
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
    <>
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
            <UploadImage
              name="avatar" 
              id="avatar"
              accept=".jpg,.jpeg,.png"
              avatar={userData?.avatar}
              file={formValues.avatar}
              onChange={handleChange} />
            <FormRow
              label="E-mail"
              name="email"
              value={userData?.auth.email}
              onChange={handleChange}
              disabled={true}
            />
            <FormRow
              key="accountType"
              name="accountType"
              label='Tipo de cuenta'
              onChange={handleChange}
              value={
                userData?.accountType === TYPEACCOUNT.ENTERPRISE && 'Empresa' ||
                userData?.accountType === TYPEACCOUNT.PERSONAL && 'Personal'
              }
              disabled={true}
            />
            <FormRow
              label="Número de cuenta"
              name="account_number"
              value={userData?.bank_account.number_account}
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
            <FormRow
              label="Alias"
              name="alias"
              value={formValues.alias}
              onChange={handleChange}
              disabled={isLoading}
            />
            <FormRow
              label="Teléfono"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              disabled={isLoading}
            />
            <FormRow
              label="Dirección"
              name="address"
              value={formValues.address}
              onChange={handleChange}
              disabled={isLoading}
            />
            <FormRow
              label="Cantidad mínima de transferencia"
              name="min_ammount_transfers"
              value={formValues.min_ammount_transfers}
              onChange={handleChange}
              disabled={isLoading}
              type="number"
            />
            <FormRow
              label="Cantidad máxima de transferencia"
              name="max_ammount_transfers"
              value={formValues.max_ammount_transfers}
              onChange={handleChange}
              disabled={isLoading}
              type="number"
            />
            <div 
              onClick={() => setOpenModal(true)}
              className="flex justify-end"
            >
              <div className="inline-flex justify-items-center text-white border-indigo-500 hover:border-indigo-600 bg-indigo-500 hover:bg-indigo-600 px-2 max-sm:px-2 py-2 border rounded-lg cursor-pointer">
                <HiLockClosed className='text-[18px] mr-2' />
                <p>Cambiar contraseña</p>
              </div>
            </div>
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
      <Modal
        onCloseModal={() => setOpenModal(false)}
        isOpen={openModal}
      >
        <ChangePasswordForm user={userData} onClose={closeModal}/>
      </Modal>
    </>
  );
};
