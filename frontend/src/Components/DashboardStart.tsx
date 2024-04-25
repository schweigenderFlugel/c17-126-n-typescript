import { useAuth } from '../Hooks/useAuth';
import { BalanceCard } from './BalanceCard';
import { DashboardNavbar } from './DashboardNavbar';
import { LastTransfersTable } from './LastTransfersTable';
import { WalletCard } from './WalletCard';

export const DashboardStart = () => {
  const { userData } = useAuth();

  return (
    <main className="gap-x-8 grid grid-col-[2fr_1fr] bg-transparent w-full h-full">
      <DashboardNavbar>Inicio</DashboardNavbar>
      <BalanceCard user={userData}/>
      <WalletCard />
      <LastTransfersTable bank_account={userData?.bank_account} />
    </main>
  );
};
