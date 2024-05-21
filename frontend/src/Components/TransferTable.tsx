import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { TableRow } from './TransferRow';
import { 
  ITransactionsReceived, 
  ITransactionsSent, 
  ITransactionsTable 
} from '../Interfaces/transactions.interface';
import { IBankAccount } from '../Interfaces/user.interface';
import { setMonth } from '../data/months';

export const TransferTable = ({ 
  sent,
  received,
  bank_account 
}: { 
  sent: ITransactionsSent[]
  received: ITransactionsReceived[],
  bank_account: IBankAccount | undefined
}) => {

  let transactionsTable: ITransactionsTable[] = [];
  
  sent.forEach((item: ITransactionsSent) => {
    transactionsTable.push(item)
  })
  
  received.forEach((item: ITransactionsReceived) => {
    transactionsTable.push(item);
  })


  return (
    <div className="border-indigo-300 dark:border-indigo-600 bg-indigo-100 dark:bg-indigo-950 shadow-lg mt-4 border rounded-lg h-fit min-h-8 max-h-full overflow-y-auto">
      <TableRow isHeader>
        <div>Cuenta</div>
        <div className="max-[800px]:justify-self-center">Estado</div>
        <div className="max-[800px]:justify-self-end">Cantidad</div>
        <div className="max-[800px]:hidden">Fecha</div>
      </TableRow>
      {transactionsTable?.map(
        ({ destination_account, id, amount, from, to, date_transaction }) => {
          const isReceived = destination_account === bank_account?.id;
          const year = parseInt(date_transaction.substring(0, 4));

          const monthNumber = parseInt(date_transaction.substring(5, 7))
          const month = setMonth(monthNumber);

          const day = parseInt(date_transaction.substring(8, 10))
          
          const dateTransaction  = `${day} de ${month}, ${year}`
          const timeTransaction =  date_transaction.substring(11, 16)
          const nameDisplayed = isReceived
            ? `${from?.user.name} ${from?.user.lastname}` // source 
            : `${to?.user.name} ${to?.user.lastname}`; // destination

          return (
            <TableRow key={id}>
              <div>{nameDisplayed}</div>
              <div
                className={`rounded-full px-4 py-2 w-fit text-gray-700 text-sm max-[800px]:justify-self-center ${isReceived ? 'bg-green-200' : 'bg-blue-200'}`}
              >
                <span>{isReceived ? 'Recibida' : 'Envidada'}</span>
              </div>
              <div>$ {amount}</div>
              <div>
                <div>{dateTransaction}</div>
                <div>{timeTransaction}</div>
              </div>
              <div></div>
            </TableRow>
          );
        }
      )}
      <TableRow isHeader>
        <div className="flex justify-between col-span-full">
          <div>
            Mostrando del <span className="font-bold">1</span> al{' '}
            <span className="font-bold">{transactionsTable.length}</span> de{' '}
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
