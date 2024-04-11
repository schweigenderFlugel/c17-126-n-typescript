import { BalanceCard } from "./BalanceCard"
import { DashboardNavbar } from "./DashboardNavbar"
import { LastTransfersTable } from "./LastTransfersTable"
import { WalletCard } from "./WalletCard"

export const DashboardStart = () => {
  return (
    <main className="w-full h-[900px] grid grid-cols-12 grid-rows-12 gap-y-10 bg-transparent">
      <DashboardNavbar>Inicio</DashboardNavbar>
      <div className="col-span-12 row-span-5 grid grid-cols-12 gap-x-12">
        <BalanceCard />
        <WalletCard />
      </div>
      <LastTransfersTable />
    </main>
  )
}