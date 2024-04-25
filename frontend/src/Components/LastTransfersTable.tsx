import { TransferTable } from './TransferTable';
const transactions = [
  {
    destinationAccount: {
      id: '1111',
      firstName: 'Juan Alberto',
      lastName: 'Perez',
    },
    sourceAccount: {
      id: '2222',
      firstName: 'Maria',
      lastName: 'Rodriguez',
    },
    amount: '1000',
    dateTransaction: '22 de Abril - 17:12 hs',
  },
  {
    destinationAccount: {
      id: '1111',
      firstName: 'Juan Alberto',
      lastName: 'Perez',
    },
    sourceAccount: {
      id: '3333',
      firstName: 'Pedro',
      lastName: 'Gonzalez',
    },
    amount: '500',
    dateTransaction: '23 de Abril - 10:30 hs',
  },
  {
    destinationAccount: {
      id: '4444',
      firstName: 'Ana',
      lastName: 'Lopez',
    },
    sourceAccount: {
      id: '1111',
      firstName: 'Juan Alberto',
      lastName: 'Perez',
    },
    amount: '750',
    dateTransaction: '24 de Abril - 15:45 hs',
  },
];

export const LastTransfersTable = ({ bank_account }) => {
  const sent = bank_account?.transactions_sent
  const received = bank_account?.transactions_received

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
