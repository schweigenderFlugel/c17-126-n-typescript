import { BalanceCard } from './BalanceCard';
import { DashboardNavbar } from './DashboardNavbar';
import { LastTransfersTable } from './LastTransfersTable';
import { WalletCard } from './WalletCard';

export const DashboardStart = () => {
  return (
    <main className="gap-y-10 grid grid-cols-12 grid-rows-12 bg-transparent w-full h-full">
      <DashboardNavbar>Inicio</DashboardNavbar>
      <div className="gap-x-12 grid grid-cols-12 col-span-12 row-span-5">
        <BalanceCard />
        <WalletCard />
      </div>
      <LastTransfersTable />
    </main>
  );
};
