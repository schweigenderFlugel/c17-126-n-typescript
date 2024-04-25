import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { TableRow } from './TransferRow';

export const TransferTable = ({ sent, received, bank_account }) => {
  const currentUser = {
    id: '1111',
    firstName: 'Juan',
    lastName: 'Rodriguez',
  };

  const sentReduce = sent?.reduce((item: any) => item)
  // const receivedReduce = received?.reduce((item: any) => {item})
  const transactions = [sentReduce]
  console.log(sentReduce)

  return (
    <div className="border-indigo-300 dark:border-indigo-600 bg-indigo-100 dark:bg-indigo-950 shadow-lg mt-4 border rounded-lg h-fit min-h-8 max-h-full overflow-y-auto">
      <TableRow isHeader>
        <div>Cuenta</div>
        <div>Tipo</div>
        <div>Cantidad</div>
        <div>Fecha</div>
      </TableRow>
      {sent?.map(
        ({ destination_account, id, bank_account, amount, date_transaction}) => {
          const isReceived = destination_account?.id === currentUser.id;

          const nameDisplayed = isReceived
            ? `${bank_account.user.name} ${bank_account.user.lastname}` // source 
            : `${bank_account.user.name} ${bank_account.user.lastname}`; // destination

          return (
            <TableRow key={id}>
              <div>{nameDisplayed}</div>
              <div
                className={`rounded-full px-4 py-2 w-fit text-gray-700 text-sm ${isReceived ? 'bg-green-200' : 'bg-blue-200'}`}
              >
                <span>{isReceived ? 'Recibida' : 'Envidada'}</span>
              </div>
              <div>$ {amount}</div>
              <div>{date_transaction}</div>
            </TableRow>
          );
        }
      )}
      <TableRow isHeader>
        <div className="flex justify-between col-span-full">
          <div>
            Mostrando del <span className="font-bold">1</span> al{' '}
            <span className="font-bold">{sent.length}</span> de{' '}
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
