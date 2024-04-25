import { BarChart } from '@tremor/react';

const chartdata = [
  {
    date: 'May 23',
    Envidadas: 4,
    Recibidas: 7,
  },
  {
    date: 'Jun 23',
    Envidadas: 5,
    Recibidas: 7,
  },
  {
    date: 'Jul 23',
    Envidadas: 4,
    Recibidas: 8,
  },
  {
    date: 'Ago 23',
    Envidadas: 6,
    Recibidas: 6,
  },
  {
    date: 'Sep 23',
    Envidadas: 5,
    Recibidas: 5,
  },
  {
    date: 'Oct 23',
    Envidadas: 6,
    Recibidas: 6,
  },
  {
    date: 'Nov 23',
    Envidadas: 6,
    Recibidas: 5,
  },
  {
    date: 'Dic 23',
    Envidadas: 7,
    Recibidas: 4,
  },
  {
    date: 'Ene 24',
    Envidadas: 6,
    Recibidas: 5,
  },
  {
    date: 'Feb 24',
    Envidadas: 6,
    Recibidas: 6,
  },
  {
    date: 'Mar 24',
    Envidadas: 7,
    Recibidas: 8,
  },
  {
    date: 'Abr 24',
    Envidadas: 7,
    Recibidas: 9,
  },
];

export function TransferStatistics() {
  return (
    <>
      <BarChart
        showAnimation
        className="mt-6"
        data={chartdata}
        index="date"
        categories={['Envidadas', 'Recibidas']}
        colors={['indigo', 'green']}
        yAxisWidth={30}
      />
    </>
  );
}
