import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { TableRow } from './TransferRow';

export const TransferTable = ({ transactions }) => {
  const currentUser = {
    id: '1111',
    firstName: 'Juan',
    lastName: 'Rodriguez',
  };

  return (
    <div className="border-indigo-300 dark:border-indigo-600 bg-indigo-100 dark:bg-indigo-950 shadow-lg mt-4 border rounded-lg h-fit min-h-8 max-h-full overflow-y-auto">
      <TableRow isHeader>
        <div>Cuenta</div>
        <div>Tipo</div>
        <div>Cantidad</div>
        <div>Fecha</div>
      </TableRow>
      {transactions.map(
        ({ destinationAccount, sourceAccount, amount, dateTransaction }) => {
          const isReceived = destinationAccount.id === currentUser.id;

          const nameDisplayed = isReceived
            ? `${sourceAccount.firstName} ${sourceAccount.lastName}`
            : `${destinationAccount.firstName} ${destinationAccount.lastName}`;

          return (
            <TableRow key={nameDisplayed}>
              <div>{nameDisplayed}</div>
              <div
                className={`rounded-full px-4 py-2 w-fit text-gray-700 text-sm ${isReceived ? 'bg-green-200' : 'bg-blue-200'}`}
              >
                <span>{isReceived ? 'Recibida' : 'Envidada'}</span>
              </div>
              <div>$ {amount}</div>
              <div>{dateTransaction}</div>
            </TableRow>
          );
        }
      )}
      <TableRow isHeader>
        <div className="flex justify-between col-span-full">
          <div>
            Mostrando del <span className="font-bold">1</span> al{' '}
            <span className="font-bold">{transactions.length}</span> de{' '}
            <span className="font-bold">10</span> transferencias
          </div>
          <div className="flex gap-2">
            <button className="flex items-center hover:bg-indigo-600 px-2 py-1 rounded-md hover:text-white">
              <HiChevronLeft />
              Anterior
            </button>
            <button className="flex items-center hover:bg-indigo-600 p-1 rounded-md hover:text-white">
              Siguiente
              <HiChevronRight />
            </button>
          </div>
        </div>
      </TableRow>
    </div>
  );
};
