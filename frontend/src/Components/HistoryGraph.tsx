import { LineChart } from '@tremor/react';
import { chartData } from '../data/chartData';
import { IAnualHistorial } from '../Interfaces/user.interface';

const dataFormatter = (number: number | bigint) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export function HistoryGraph({ anual_historial }: { anual_historial: IAnualHistorial[] | undefined }) {
  const currentYear = new Date().getFullYear();
  const anualHistorialFound = anual_historial?.find(anual_historial => anual_historial.year === currentYear);
  const { data } = chartData(currentYear, anualHistorialFound?.month);

  return (
    <LineChart
      className="h-52"
      data={data}
      index="date"
      categories={['Balance', 'Gastos']}
      colors={['indigo', 'rose']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      showAnimation
    />
  );
}
