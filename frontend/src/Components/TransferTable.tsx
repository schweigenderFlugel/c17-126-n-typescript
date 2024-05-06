import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { IBankAccount, ITransactions, ITransactionsReceived, ITransactionsSent } from '../Interfaces/interfaces';

import { TableRow } from './TransferRow';

enum MONTHS {
  JANUARY = '1',
  FEBRUARY = '2',
  MARCH = 'marzo',
  APRIL = 'abril',
  MAY = 'mayo',
  JUNE = 'junio',
  JULY = 'julio',
  AUGUST = 'agosto',
  SEPTEMBER = 'septiembre',
  OCTOBER = 'octubre',
  NOVEMBER = 'noviembre',
  DECEMBER = 'diciembre',
}

export const TransferTable = ({ 
  sent, 
  received, 
  bank_account 
}: { 
  sent: ITransactionsSent[], 
  received: ITransactionsReceived[], 
  bank_account: IBankAccount | undefined
}) => {
  
  let transactions: ITransactions[] = [];
  
  sent.forEach((item: ITransactionsSent) => {
    transactions.push(item);
  })
  
  received.forEach((item: ITransactionsReceived) => {
    transactions.push(item);
  })

  return (
    <div className="border-indigo-300 dark:border-indigo-600 bg-indigo-100 dark:bg-indigo-950 shadow-lg mt-4 border rounded-lg h-fit min-h-8 max-h-full overflow-y-auto">
      <TableRow isHeader>
        <div>Cuenta</div>
        <div className="max-[800px]:justify-self-center">Estado</div>
        <div className="max-[800px]:justify-self-end">Cantidad</div>
        <div className="max-[800px]:hidden">Fecha</div>
      </TableRow>
      {transactions?.map(
        ({ destination_account, id, amount, from, to, date_transaction }) => {
          const isReceived = destination_account === bank_account?.id;
          const year = parseInt(date_transaction.substring(0, 4));
          const monthNumber = parseInt(date_transaction.substring(5, 7))
          const day = parseInt(date_transaction.substring(8, 10))
          let month: string;
          switch (monthNumber) {
            case 1:
              month = MONTHS.JANUARY;
              break;
            case 2: 
              month = MONTHS.FEBRUARY;
              break;
            case 3:
              month = MONTHS.MARCH;
              break;
            case 4: 
              month = MONTHS.APRIL;
              break;
            case 5:
              month = MONTHS.MAY;
              break;
            case 6: 
              month = MONTHS.JUNE;
              break;
            case 7:
              month = MONTHS.JULY;
              break;
            case 8: 
              month = MONTHS.AUGUST;
              break;
            case 9:
              month = MONTHS.SEPTEMBER;
              break;
            case 10: 
              month = MONTHS.OCTOBER;
              break;
            case 11:
              month = MONTHS.NOVEMBER;
              break;
            case 12: 
              month = MONTHS.DECEMBER;
              break;
            default: 
              month = 'Invalid month';
              break;
          }
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
