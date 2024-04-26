import { useBalance } from '../Hooks/useBalance';
import { BalanceCard } from './BalanceCard';
import { DashboardNavbar } from './DashboardNavbar';
import { LastTransfersTable } from './LastTransfersTable';
import { WalletCard } from './WalletCard';

export const DashboardStart = () => {
  const { isLoading: isLoadingBalance, userBalance } = useBalance();

  return (
    <main className="max-[600px]:flex max-[600px]:flex-col gap-x-8 max-xl:gap-x-4 grid grid-cols-[2fr_1fr] bg-transparent w-full h-full">
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
