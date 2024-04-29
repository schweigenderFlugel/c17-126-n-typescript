import { Card, SparkAreaChart } from '@tremor/react';
import { DashboardNavbar } from './DashboardNavbar';
import { stocks } from '../data/stocks';
import { InvestmentDonutChart } from './InvestmentDonutChart';
import { ExchangeForm } from './ExchangeForm';

export const Investments = () => {
  return (
    <main className="bg-transparent w-full h-full">
      <DashboardNavbar>Inversiones</DashboardNavbar>
      <div className="gap-8 grid grid-cols-12 h-[85%]">
        <section className="col-span-full">
          <h4 className="mt-6 mb-3 text-2xl dark:text-white">
            Bolsa de valores
          </h4>
          <div className="gap-4 grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2">
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
                  BTC
                </p>
                <span className="text-tremor-content text-tremor-default dark:text-dark-tremor-content">
                  Bitcoin
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
            <Card className="flex justify-between items-center max-xl:hidden mx-auto px-4 py-3.5 max-w-lg">
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
            <Card className="flex justify-between items-center max-2xl:hidden mx-auto px-4 py-3.5 max-w-lg">
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
        </section>
        <section className="col-span-7 h-fit">
          <div>
            <h4 className="mt-6 mb-3 text-2xl dark:text-white">
              Tus inversiones
            </h4>
            <InvestmentDonutChart />
          </div>
          <div className="h-full">
            <h4 className="mb-4 text-2xl dark:text-white">
              Últimos movimientos
            </h4>

            <div className="flex flex-col justify-between border-indigo-300 dark:border-indigo-600 dark:border-2 bg-indigo-100 dark:bg-indigo-950 shadow-lg p-4 border rounded-xl font-medium dark:text-white">
              <div className="flex justify-between dark:text-white">
                <span>ETH - Ethereum</span>
                <span className="text-emerald-500 dark:text-emerald-400">
                  +0.5 ETH
                </span>
              </div>
              <div className="bg-indigo-600 my-4 w-full h-[1px]"></div>
              <div className="flex justify-between dark:text-white">
                <span>BTC - Bitcoin</span>
                <span className="text-emerald-500 dark:text-emerald-400">
                  +0.02 BTC
                </span>
              </div>
              <div className="bg-indigo-600 my-4 w-full h-[1px]"></div>
              <div className="flex justify-between dark:text-white">
                <span>USDT - Tether </span>
                <span className="text-emerald-500 dark:text-emerald-400">
                  +200 USDT
                </span>
              </div>
              <div className="bg-indigo-600 my-4 w-full h-[1px]"></div>
              <div className="flex justify-between dark:text-white">
                <span>XRP </span>
                <span className="text-emerald-500 dark:text-emerald-400">
                  +1.5 XRP
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="col-start-8 col-end-13 h-[88%]">
          <h4 className="mt-6 mb-3 text-2xl dark:text-white">Exchange</h4>
          <ExchangeForm />
        </section>
      </div>
    </main>
  );
};
