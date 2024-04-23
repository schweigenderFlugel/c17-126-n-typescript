import { HistoryGraph } from './HistoryGraph';

export const BalanceCard = () => {
  return (
    <section className="col-span-8">
      <main className="gap-3 grid overflow-hiddenF">
        <h3 className="font-semibold text-2xl dark:text-white">Balance</h3>
        <div className="gap-2 grid grid-cols-3 min-w-[500px]">
          <div className="border-indigo-600 col-span-1 bg-indigo-100 dark:bg-indigo-900 dark:bg-opacity-70 shadow-md p-4 border rounded-xl">
            <p className="dark:text-white">Balance Total</p>
            <p className="font-semibold text-3xl dark:text-white">$5000</p>
          </div>
          <div className="border-indigo-600 col-span-1 bg-indigo-100 dark:bg-indigo-900 dark:bg-opacity-70 shadow-md p-4 border rounded-xl">
            <p className="font-medium dark:text-white">Gastos</p>
            <p className="font-semibold text-3xl dark:text-white">$1500</p>
          </div>
          <div className="border-indigo-600 col-span-1 bg-indigo-100 dark:bg-indigo-900 dark:bg-opacity-70 shadow-md p-4 border rounded-xl">
            <p className="font-medium dark:text-white">Cuenta</p>
            <p className="font-semibold text-3xl dark:text-white">$3500</p>
          </div>
        </div>
        <div className="flex border-indigo-300 row-span-1 bg-indigo-100 dark:bg-indigo-900 ml-auto border rounded-lg w-fit text-end text-sm dark:text-white">
          <button className="hover:bg-indigo-200 dark:hover:bg-indigo-800 p-2 transition-colors">
            Anual
          </button>
          <span className="bg-indigo-300 my-auto w-[1px] h-[80%]"></span>
          <button className="hover:bg-indigo-200 dark:hover:bg-indigo-800 p-2 transition-colors">
            Mensual
          </button>
          <span className="bg-indigo-300 my-auto w-[1px] h-[80%]"></span>
          <button className="hover:bg-indigo-200 dark:hover:bg-indigo-800 p-2 transition-colors">
            Semanal
          </button>
        </div>
        <HistoryGraph />
      </main>
    </section>
  );
};
