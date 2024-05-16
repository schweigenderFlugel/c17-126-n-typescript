import { useAuth } from '../Hooks/useAuth';
import { IBankAccount } from '../Interfaces/user.interface';
import { transactions } from '../data/transactions';
import { DashboardNavbar } from './DashboardNavbar';
import { TransferTable } from './TransferTable';

export const TransfersList = () => {
  const { userData } = useAuth();
  const bank_account = userData?.bank_account as IBankAccount;
  const { sent, received } = transactions(bank_account);

  return (
    <main className="flex flex-col bg-transparent w-full h-full dark:text-white">
      <DashboardNavbar>Transferencias</DashboardNavbar>
      {!sent?.length && !received?.length ?  (
        <p className="mx-auto mt-8 text-2xl">No se encontraron transacciones</p>
      ) : (
        <TransferTable sent={sent} received={received} bank_account={bank_account}  />
      )}
    </main>
  );
};
