import { HistorialGraph } from "./HistorialGraph"

export const BalanceCard = () => {
  return (
    <section className="col-span-8">
      <main className="grid grid-rows-10 gap-3">
        <h2 className="row-span-1 font-bold dark:text-white">Balance</h2>
        <div className="row-span-2 grid grid-cols-3 gap-2">
          <div className="col-span-1 p-2 rounded-xl bg-white dark:bg-black dark:bg-opacity-70">
            <p className="dark:text-white">Balance Total</p>
            <p className="dark:text-white">$5000</p>
          </div>
          <div className="col-span-1 p-2 rounded-xl bg-white dark:bg-black dark:bg-opacity-70">
            <p className="dark:text-white">Gastos</p>
            <p className="dark:text-white">$500</p>
          </div>
          <div className="col-span-1 p-2 rounded-xl bg-white dark:bg-black dark:bg-opacity-70">
            <p className="dark:text-white">Cuenta</p>
            <p className="dark:text-white">$800.02</p>
          </div>
        </div>
        <div className="row-span-1 dark:text-white text-end">Anual</div>
        <div className="row-span-6 rounded-xl bg-white dark:bg-black">
          <HistorialGraph />
        </div>
      </main>
    </section>
  )
}