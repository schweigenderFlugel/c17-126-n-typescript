import { DashboardNavbar } from './DashboardNavbar';
import { HistoryGraph } from './HistoryGraph';
import { InvestmentDonutChart } from './InvestmentDonutChart';
import { TransferStatistics } from './TransferStatistics';

export const Statistics = () => {
  return (
    <main className="bg-transparent w-full h-full">
      <DashboardNavbar>Estadisticas</DashboardNavbar>
      <div className="gap-x-6 grid grid-cols-2 dark:text-white">
        <div className="col-start-1 col-end-2">
          <h4 className="mt-8 font-medium text-2xl">Historial de cuenta</h4>
          <HistoryGraph />
        </div>
        <div className="flex flex-col">
          <h4 className="mt-8 font-medium text-2xl">Tus inversiones</h4>
          <InvestmentDonutChart />
        </div>
        <div className="col-span-2">
          <h4 className="mt-8 font-medium text-2xl">Transferencias</h4>
          <TransferStatistics />
        </div>
      </div>
    </main>
  );
};
