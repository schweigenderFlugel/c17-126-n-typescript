import { ITransactionsReceived, ITransactionsSent } from '../Interfaces/interfaces';
import { TransferTable } from './TransferTable';

export const LastTransfersTable = ({ bank_account }) => {
  const sent = bank_account?.transactions_sent as ITransactionsSent[];
  const received = bank_account?.transactions_received as ITransactionsReceived[];

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
