import { TransferTable } from './TransferTable';
import { IBankAccount } from '../Interfaces/user.interface';
import { transactions } from '../data/transactions';

export const LastTransfersTable = ({ bank_account }: { bank_account: IBankAccount | undefined }) => {
  const { sent, received } = transactions(bank_account)

  return (
    <section className="col-span-12 row-span-6 dark:text-white">
      <h2 className="font-bold">Últimas transferencias</h2>
      {!sent?.length && !received?.length ? (
        <p className="mx-auto mt-8 text-2xl">No se encontraron transacciones</p>
      ) : (
        <TransferTable sent={sent} received={received} bank_account={bank_account} />
      )}
    </section>
  );
};
