import { LineChart } from '@tremor/react';

const chartdata = [
  {
    date: 'Jan 22',
    Gastos: 2890,
    Balance: 2338,
  },
  {
    date: 'Feb 22',
    Gastos: 2756,
    Balance: 2103,
  },
  {
    date: 'Mar 22',
    Gastos: 3322,
    Balance: 2194,
  },
  {
    date: 'Apr 22',
    Gastos: 3470,
    Balance: 2108,
  },
  {
    date: 'May 22',
    Gastos: 3475,
    Balance: 1812,
  },
  {
    date: 'Jun 22',
    Gastos: 3129,
    Balance: 1726,
  },
  {
    date: 'Jul 22',
    Gastos: 3490,
    Balance: 1982,
  },
  {
    date: 'Aug 22',
    Gastos: 2903,
    Balance: 2012,
  },
  {
    date: 'Sep 22',
    Gastos: 2643,
    Balance: 2342,
  },
  {
    date: 'Oct 22',
    Gastos: 2837,
    Balance: 2473,
  },
  {
    date: 'Nov 22',
    Gastos: 2954,
    Balance: 3848,
  },
  {
    date: 'Dec 22',
    Gastos: 3239,
    Balance: 3736,
  },
];

const dataFormatter = number =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export function HistoryGraph() {
  return (
    <LineChart
      className="h-60"
      data={chartdata}
      tra
      index="date"
      categories={['Balance', 'Gastos']}
      colors={['indigo', 'rose']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
    />
  );
}
