import { BalanceCard } from './BalanceCard';
import { DashboardNavbar } from './DashboardNavbar';
import { LastTransfersTable } from './LastTransfersTable';
import { WalletCard } from './WalletCard';

export const DashboardStart = () => {
  return (
    <main className="gap-x-8 grid grid-col-[2fr_1fr] bg-transparent w-full h-full">
      <DashboardNavbar>Inicio</DashboardNavbar>
      <BalanceCard />
      <WalletCard />
      <LastTransfersTable />
    </main>
  );
};
