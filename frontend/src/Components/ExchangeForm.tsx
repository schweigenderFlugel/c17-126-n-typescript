import {
  HiArrowTrendingUp,
  HiArrowsUpDown,
  HiChevronDown,
} from 'react-icons/hi2';
import { MainButton } from './MainButton';

export const ExchangeForm = () => {
  return (
    <div className="flex flex-col justify-between border-indigo-300 dark:border-indigo-600 dark:border-2 bg-indigo-100 dark:bg-indigo-950 shadow-lg p-4 border rounded-xl h-full dark:text-white">
      <h5 className="text-lg">Total balance</h5>
      <p className="my-2 font-medium text-4xl">$ 15625.00</p>
      <div className="flex items-center gap-2 font-semibold">
        <p className="border-2 border-emerald-500 px-2 py-1 rounded-full text-emerald-500">
          +12.3%
        </p>
        <div className="border-2 border-emerald-500 p-1 rounded-full text-emerald-500 text-xl">
          <HiArrowTrendingUp className="stroke-1" />
        </div>
      </div>
      <div className="bg-indigo-600 my-5 w-full h-[1px] text-center"></div>
      <div className="flex justify-between">
        <p>Exchange</p>
        <p>1 BTC = 64,432.30 USD</p>
      </div>
      <div className="mt-4 text-center">
        Podés cambiar: <span className="font-medium tracking-wide">17.8 USDT</span>
      </div>

      <form>
        <div className="relative mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Origen"
              className="border-indigo-500 bg-transparent rounded-t-xl w-full h-16 placeholder:text-gray-400"
            />
            <span className="top-[20px] right-5 absolute flex items-center gap-2 text-lg">
              <p>AR$</p>
              <span>
                <HiChevronDown />
              </span>
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Destino"
              className="border-indigo-500 bg-transparent rounded-b-xl w-full h-16 placeholder:text-gray-400"
            />
            <span className="top-[20px] right-5 absolute flex items-center gap-2 text-lg">
              <p>USDT</p>
              <span>
                <HiChevronDown />
              </span>
            </span>
          </div>
          <span className="right-[50%] bottom-[50%] absolute border-indigo-500 bg-indigo-100 dark:bg-indigo-950 p-1 border rounded-lg translate-x-[50%] translate-y-[50%]">
            <HiArrowsUpDown className="w-6 h-6" />
          </span>
        </div>
        <MainButton className="mt-4 w-full">Operar</MainButton>
      </form>
    </div>
  );
};
