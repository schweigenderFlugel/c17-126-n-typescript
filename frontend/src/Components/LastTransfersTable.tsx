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
  {
    destinationAccount: {
      id: '5555',
      firstName: 'Carlos',
      lastName: 'Martinez',
    },
    sourceAccount: {
      id: '1111',
      firstName: 'Juan Alberto',
      lastName: 'Perez',
    },
    amount: '1200',
    dateTransaction: '25 de Abril - 09:20 hs',
  },
];

export const LastTransfersTable = () => {
  return (
    <section className="col-span-12 row-span-6 dark:text-white">
      <h2 className="font-bold">Últimas transferencias</h2>
      {!transactions?.length ? (
        <p className="mx-auto mt-8 text-2xl">No se encontraron transacciones</p>
      ) : (
        <TransferTable transactions={transactions} />
      )}
    </section>
  );
};
