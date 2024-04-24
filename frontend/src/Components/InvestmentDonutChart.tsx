import { DonutChart, Legend } from '@tremor/react';

const sales = [
  {
    name: 'Bankme',
    sales: 980,
  },
  {
    name: 'Apple Inc.',
    sales: 456,
  },
  {
    name: 'NVIDIA Corporation',
    sales: 390,
  },
  {
    name: 'Tesla Inc.',
    sales: 240,
  },
  {
    name: 'Ford Motor Company',
    sales: 190,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export function InvestmentDonutChart() {
  return (
    <>
      <div className="flex justify-center items-center space-x-6 h-60">
        <DonutChart
          data={sales}
          category="sales"
          index="name"
          valueFormatter={valueFormatter}
          colors={['indigo', 'gray', 'green', 'red', 'blue']}
          className="w-40"
          showAnimation
        />
        <Legend
          categories={[
            'Bankme.',
            'Apple Inc.',
            'NVIDIA Corporation',
            'Tesla Inc.',
            'Ford Motor Company',
          ]}
          colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
          className="max-w-xs"
        />
      </div>
    </>
  );
}
