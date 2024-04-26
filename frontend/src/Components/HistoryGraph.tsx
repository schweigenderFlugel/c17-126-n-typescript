import { LineChart } from '@tremor/react';

const chartdata = [
  {
    date: 'May 23',
    Gastos: 2890,
    Balance: 2338,
  },
  {
    date: 'Jun 23',
    Gastos: 2756,
    Balance: 2103,
  },
  {
    date: 'Jul 23',
    Gastos: 3323,
    Balance: 2194,
  },
  {
    date: 'Ago 23',
    Gastos: 3470,
    Balance: 2108,
  },
  {
    date: 'Sep 23',
    Gastos: 3475,
    Balance: 1812,
  },
  {
    date: 'Oct 23',
    Gastos: 3129,
    Balance: 1726,
  },
  {
    date: 'Nov 23',
    Gastos: 3490,
    Balance: 1982,
  },
  {
    date: 'Dic 23',
    Gastos: 2903,
    Balance: 2012,
  },
  {
    date: 'Ene 23',
    Gastos: 2643,
    Balance: 2342,
  },
  {
    date: 'Feb 23',
    Gastos: 2837,
    Balance: 2473,
  },
  {
    date: 'Mar 23',
    Gastos: 2954,
    Balance: 3848,
  },
  {
    date: 'Abr 24',
    Gastos: 3239,
    Balance: 3736,
  },
];

const dataFormatter = number =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export function HistoryGraph() {
  return (
    <LineChart
      className="h-52"
      data={chartdata}
      index="date"
      categories={['Balance', 'Gastos']}
      colors={['indigo', 'rose']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      showAnimation
    />
  );
}
