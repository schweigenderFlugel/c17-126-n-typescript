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
    dateTransaction: '22 Abr - 17:12',
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
    dateTransaction: '23 Abr - 10:30',
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
    dateTransaction: '24 Abr - 15:45',
  },
];

export const LastTransfersTable = () => {
  return (
    <section className="max-[600px]:hidden col-span-12 row-span-6 mt-2 dark:text-white">
      <h2 className="font-semibold text-2xl">Últimas transferencias</h2>
      {!transactions?.length ? (
        <p className="mx-auto mt-8 text-2xl">No se encontraron transacciones</p>
      ) : (
        <TransferTable transactions={transactions} />
      )}
    </section>
  );
};
