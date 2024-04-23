import { DashboardNavbar } from './DashboardNavbar';
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
  {
    destinationAccount: {
      id: '6666',
      firstName: 'Sofia',
      lastName: 'Garcia',
    },
    sourceAccount: {
      id: '7777',
      firstName: 'Luis',
      lastName: 'Hernandez',
    },
    amount: '850',
    dateTransaction: '26 de Abril - 14:00 hs',
  },
  {
    destinationAccount: {
      id: '1111',
      firstName: 'Juan Alberto',
      lastName: 'Perez',
    },
    sourceAccount: {
      id: '8888',
      firstName: 'Laura',
      lastName: 'Sanchez',
    },
    amount: '300',
    dateTransaction: '27 de Abril - 11:55 hs',
  },
  {
    destinationAccount: {
      id: '9999',
      firstName: 'Eduardo',
      lastName: 'Ramirez',
    },
    sourceAccount: {
      id: '1111',
      firstName: 'Juan Alberto',
      lastName: 'Perez',
    },
    amount: '2000',
    dateTransaction: '28 de Abril - 16:30 hs',
  },
  {
    destinationAccount: {
      id: '1111',
      firstName: 'Juan Alberto',
      lastName: 'Perez',
    },
    sourceAccount: {
      id: '1010',
      firstName: 'Monica',
      lastName: 'Diaz',
    },
    amount: '600',
    dateTransaction: '29 de Abril - 08:45 hs',
  },
  {
    destinationAccount: {
      id: '2355',
      firstName: 'Roberto',
      lastName: 'Perez',
    },
    sourceAccount: {
      id: '1111',
      firstName: 'Juan Alberto',
      lastName: 'Perez',
    },
    amount: '3000',
    dateTransaction: '30 de Abril - 12:20 hs',
  },
  {
    destinationAccount: {
      id: '5555',
      firstName: 'Juan Carlos',
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

export const TransfersList = () => {
  // const transactions = [];

  return (
    <main className="flex flex-col bg-transparent w-full h-full dark:text-white">
      <DashboardNavbar>Transferencias</DashboardNavbar>
      {!transactions?.length ? (
        <p className="mx-auto mt-8 text-2xl">No se encontraron transacciones</p>
      ) : (
        <TransferTable transactions={transactions} />
      )}
    </main>
  );
};
