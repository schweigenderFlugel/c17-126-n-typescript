import { DonutChart, Legend } from '@tremor/react';

const inversions = [
  {
    name: 'Bankme',
    quantity: 980,
  },
  {
    name: 'BTC',
    quantity: 456,
  },
  {
    name: 'NVIDIA Corporation',
    quantity: 390,
  },
  {
    name: 'Tesla Inc.',
    quantity: 240,
  },
  {
    name: 'ETH',
    quantity: 190,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export function InvestmentDonutChart() {
  return (
    <>
      <div className="flex justify-center items-center space-x-6 h-60">
        <DonutChart
          data={inversions}
          category="quantity"
          index="name"
          valueFormatter={valueFormatter}
          colors={['indigo', 'gray', 'green', 'red', 'blue']}
          className="w-40"
          showAnimation
        />
        <Legend
          categories={[
            'Bankme.',
            'BTC Bitcoin',
            'NVIDIA Corporation',
            'Tesla Inc.',
            'Ethereum',
          ]}
          colors={['indigo', 'gray', 'green', 'red', 'blue']}
          className="max-w-xs"
        />
      </div>
    </>
  );
}
