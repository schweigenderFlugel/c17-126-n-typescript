import { Card, SparkAreaChart } from '@tremor/react';
import { DashboardNavbar } from './DashboardNavbar';
import { stocks } from '../data/stocks';
import { InvestmentDonutChart } from './InvestmentDonutChart';

export const Investments = () => {
  return (
    <main className="bg-transparent w-full h-full">
      <DashboardNavbar>Inversiones</DashboardNavbar>

      <h4 className="mt-6 mb-3 text-2xl dark:text-white">Bolsa de valores</h4>
      <div className="gap-x-4 grid grid-cols-4">
        <Card className="flex justify-between items-center mx-auto px-4 py-3.5 max-w-lg">
          <div className="flex items-center space-x-2.5">
            <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              APPL
            </p>
            <span className="text-tremor-content text-tremor-default dark:text-dark-tremor-content">
              Apple Inc.
            </span>
          </div>
          <SparkAreaChart
            data={stocks.AAPL}
            categories={['value']}
            index={'month'}
            colors={['emerald']}
            className="w-20 sm:w-36 h-8 sm:h-10"
          />
          <div className="flex items-center space-x-2.5">
            <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium"></span>
            <span className="bg-red-500 px-2 py-1 rounded font-medium text-tremor-default text-white">
              -1.45%
            </span>
          </div>
        </Card>
        <Card className="flex justify-between items-center mx-auto px-4 py-3.5 max-w-lg">
          <div className="flex items-center space-x-2.5">
            <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              IBM
            </p>
            <span className="text-tremor-content text-tremor-default dark:text-dark-tremor-content">
              IBM Inc.
            </span>
          </div>
          <SparkAreaChart
            data={stocks.IBM}
            categories={['value']}
            index={'month'}
            colors={['emerald']}
            className="w-20 sm:w-36 h-8 sm:h-10"
          />
          <div className="flex items-center space-x-2.5">
            <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium"></span>
            <span className="bg-emerald-500 px-2 py-1 rounded font-medium text-tremor-default text-white">
              +1.25%
            </span>
          </div>
        </Card>
        <Card className="flex justify-between items-center mx-auto px-4 py-3.5 max-w-lg">
          <div className="flex items-center space-x-2.5">
            <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              NVDA
            </p>
            <span className="text-tremor-content text-tremor-default dark:text-dark-tremor-content">
              Nvidia Corp.
            </span>
          </div>
          <SparkAreaChart
            data={stocks.NVDA}
            categories={['value']}
            index={'month'}
            colors={['emerald']}
            className="w-20 sm:w-36 h-8 sm:h-10"
          />
          <div className="flex items-center space-x-2.5">
            <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium"></span>
            <span className="bg-emerald-500 px-2 py-1 rounded font-medium text-tremor-default text-white">
              +1.72%
            </span>
          </div>
        </Card>
        <Card className="flex justify-between items-center mx-auto px-4 py-3.5 max-w-lg">
          <div className="flex items-center space-x-2.5">
            <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              TSLA
            </p>
            <span className="text-tremor-content text-tremor-default dark:text-dark-tremor-content">
              Tesla Inc.
            </span>
          </div>
          <SparkAreaChart
            data={stocks.TSLA}
            categories={['value']}
            index={'month'}
            colors={['emerald']}
            className="w-20 sm:w-36 h-8 sm:h-10"
          />
          <div className="flex items-center space-x-2.5">
            <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium"></span>
            <span className="bg-emerald-500 px-2 py-1 rounded font-medium text-tremor-default text-white">
              +1.34%
            </span>
          </div>
        </Card>
      </div>
      <div>
        <h4 className="mt-6 mb-3 text-2xl dark:text-white">Tus inversiones</h4>
        <InvestmentDonutChart />
      </div>
    </main>
  );
};
