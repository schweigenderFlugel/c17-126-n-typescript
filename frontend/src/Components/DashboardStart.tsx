import { useBalance } from '../Hooks/useBalance';
import { BalanceCard } from './BalanceCard';
import { DashboardNavbar } from './DashboardNavbar';
import { LastTransfersTable } from './LastTransfersTable';
import { WalletCard } from './WalletCard';

export const DashboardStart = () => {
  const { isLoading: isLoadingBalance, userBalance } = useBalance();

  return (
    <main className="gap-x-8 grid grid-col-[2fr_1fr] bg-transparent w-full h-full">
      <DashboardNavbar>Inicio</DashboardNavbar>
      <BalanceCard
        balance={userBalance?.accountFound.balance}
        isLoadingBalance={isLoadingBalance}
      />
      <WalletCard
        balance={userBalance?.accountFound.balance}
        isLoadingBalance={isLoadingBalance}
      />
      <LastTransfersTable />
    </main>
  );
};
