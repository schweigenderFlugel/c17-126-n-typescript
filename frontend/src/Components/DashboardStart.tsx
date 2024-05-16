import { useAuth } from '../Hooks/useAuth';
import { IUser } from '../Interfaces/user.interface';

import { BalanceCard } from './BalanceCard';
import { DashboardNavbar } from './DashboardNavbar';
import { LastTransfersTable } from './LastTransfersTable';
import { WalletCard } from './WalletCard';

export const DashboardStart = () => {
  const { userData } = useAuth();

  return (
    <main className="max-[600px]:flex max-[600px]:flex-col gap-x-8 max-xl:gap-x-4 grid grid-cols-[2fr_1fr] bg-transparent w-full h-full">
      <DashboardNavbar>Inicio</DashboardNavbar>
      <BalanceCard bank_account={userData?.bank_account}/>
      <WalletCard user={userData as IUser | undefined} />
      <LastTransfersTable bank_account={userData?.bank_account} />
    </main>
  );
};
