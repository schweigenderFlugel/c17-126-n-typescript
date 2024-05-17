import { IAnualHistorial, IChartData, IMonths} from "../Interfaces/user.interface";

export const chartData = (year: IAnualHistorial['year'], month: IMonths | undefined) => {
  const yearString = year.toString().substring(2, 4)
  const data: IChartData[] = [
    {
      date: `Ene ${yearString}`,
      Gastos: month?.jan?.expenses ?? 0,
      Balance: month?.jan?.balance ?? 0 ,
    },
    {
      date: `Feb ${yearString}`,
      Gastos: month?.feb?.expenses ?? 0,
      Balance: month?.feb?.balance ?? 0,
    },
    {
      date: `Mar ${yearString}`,
      Gastos: month?.mar?.expenses ?? 0,
      Balance: month?.mar?.balance ?? 0,
    },
    {
      date: `Abr ${yearString}`,
      Gastos: month?.apr?.expenses ?? 0,
      Balance: month?.apr?.balance ?? 0,
    },
    {
      date: `May ${yearString}`,
      Gastos: month?.may?.expenses ?? 0,
      Balance: month?.may?.balance ?? 0,
    },
    {
      date: `Jun ${yearString}`,
      Gastos: month?.jun?.expenses ?? 0,
      Balance: month?.jun?.balance ?? 0,
    },
    {
      date: `Jul ${yearString}`,
      Gastos: month?.jul?.expenses ?? 0,
      Balance: month?.jul?.balance ?? 0,
    },
    {
      date: `Ago ${yearString}`,
      Gastos: month?.aug?.expenses ?? 0,
      Balance: month?.aug?.balance ?? 0,
    },
    {
      date: `Sep ${yearString}`,
      Gastos: month?.sep?.expenses ?? 0,
      Balance: month?.sep?.balance ?? 0,
    },
    {
      date: `Oct ${yearString}`,
      Gastos: month?.oct?.expenses ?? 0,
      Balance: month?.oct?.balance ?? 0,
    },
    {
      date: `Nov ${yearString}`,
      Gastos: month?.nov?.expenses ?? 0,
      Balance: month?.nov?.balance ?? 0,
    },
    {
      date: `Dec ${yearString}`,
      Gastos: month?.dec?.expenses ?? 0,
      Balance: month?.dec?.balance ?? 0,
    },
  ];
  return { data };
}

