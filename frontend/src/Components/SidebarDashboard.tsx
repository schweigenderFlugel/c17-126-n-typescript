import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useOutsideClick } from '../Hooks/useClickOutside';

import {
  HiArrowTrendingUp,
  HiEllipsisHorizontal,
  HiMiniHome,
  HiOutlineArrowDownTray,
  HiOutlineArrowsRightLeft,
  HiOutlineChartPie,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';

export const SidebarDashboard = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const classNameFunctionNavLink = ({ isActive }) =>
    isActive
      ? 'flex justify-start items-center gap-4 bg-indigo-500 hover:bg-indigo-600 max-md:hover:bg-transparent max-md:bg-transparent px-4 py-3 rounded-md text-xl max-md:hover:text-indigo-600 max-md:[&_*]:text-indigo-500 dark:text-white transition-all md:text-white max-xl:flex-col max-xl:gap-0 max-xl:p-1'
      : 'flex justify-start items-center gap-4 max-md:hover:bg-transparent hover:bg-indigo-600 px-4 py-3 rounded-md text-xl max-md:hover:text-indigo-600 hover:text-white dark:text-white transition-all max-xl:flex-col max-xl:gap-0 max-xl:p-1';

  const toggleMenu = () => {
    setIsOpenMenu(isOpen => !isOpen);
  };

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  const ref = useOutsideClick<HTMLLIElement>(closeMenu);

  return (
    <ul className="flex max-md:flex-row flex-col max-md:justify-around max-md:items-center gap-4 max-md:gap-0 max-md:m-0 mt-6 max-md:w-full [&_li_button]:h-[48px] text-gray-900/70 dark:text-white">
      <li className="max-md:flex-1 max-md:order-1">
        <NavLink className={classNameFunctionNavLink} to="/dashboard" end>
          <HiMiniHome className="text-2xl" />
          <span className="max-md:inline-block text-lg max-xl:text-[10px] max-xl:leading-4">
            Inicio
          </span>
        </NavLink>
      </li>
      <li className="max-md:flex-1 max-md:order-2">
        <NavLink
          to="/dashboard/transferencias"
          className={classNameFunctionNavLink}
        >
          <HiOutlineArrowsRightLeft className="text-2xl" />
          <p className="max-md:inline-block text-lg max-xl:text-[10px] max-xl:leading-4">
            Transferencias
          </p>
        </NavLink>
      </li>
      <li className="max-md:flex-1 max-sm:order-4 max-md:order-4">
        <NavLink
          to="/dashboard/inversiones"
          className={classNameFunctionNavLink}
        >
          <HiArrowTrendingUp className="text-2xl" />
          <p className="max-md:inline-block text-lg max-xl:text-[10px] max-xl:leading-4">
            Inversiones
          </p>
        </NavLink>
      </li>
      <li className="max-md:flex-1 max-md:order-5 max-sm:hidden">
        <NavLink
          to="/dashboard/estadisticas"
          className={classNameFunctionNavLink}
        >
          <HiOutlineChartPie className="text-2xl" />
          <p className="max-md:inline-block text-lg max-xl:text-[10px] max-xl:leading-4">
            Estadísticas
          </p>
        </NavLink>
      </li>
      <li className="max-md:sm:flex-1 max-md:order-6 max-sm:hidden">
        <NavLink
          to="/dashboard/configuracion"
          className={classNameFunctionNavLink}
        >
          <HiOutlineCog6Tooth className="text-2xl" />
          <p className="max-md:inline-block text-lg max-xl:text-[10px] max-xl:leading-4">
            Configuración
          </p>
        </NavLink>
      </li>
      <li className="max-sm:flex-1 max-sm:order-3 max-md:order-4 mt-16 max-md:mt-0">
        <button
          className="flex max-xl:flex-col justify-center items-center gap-4 max-xl:gap-0 bg-indigo-500 hover:bg-indigo-600 max-sm:m-auto px-4 max-xl:px-2 py-3 max-xl:py-1 rounded-md w-full max-sm:w-fit text-center text-white text-xl max-md:[&_svg]:text-indigo-500 md:text-white dark:text-white"
          aria-label="Transferir"
        >
          <svg
            width="50"
            height="43"
            viewBox="0 0 50 43"
            className="max-w-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M40.2285 0.462295C40.5246 0.166288 40.9262 0 41.3449 0C41.7635 0 42.1651 0.166288 42.4612 0.462295L48.777 6.77808C49.073 7.07418 49.2393 7.47572 49.2393 7.8944C49.2393 8.31308 49.073 8.71462 48.777 9.01071L42.4612 15.3265C42.1634 15.6141 41.7645 15.7733 41.3505 15.7697C40.9365 15.7661 40.5405 15.6 40.2478 15.3073C39.955 15.0145 39.789 14.6185 39.7854 14.2045C39.7818 13.7905 39.9409 13.3917 40.2285 13.0939L43.8491 9.47335H25.5554C25.1366 9.47335 24.735 9.30699 24.4389 9.01088C24.1428 8.71477 23.9764 8.31316 23.9764 7.8944C23.9764 7.47564 24.1428 7.07403 24.4389 6.77792C24.735 6.48181 25.1366 6.31545 25.5554 6.31545H43.8491L40.2285 2.69493C39.9325 2.39883 39.7662 1.99729 39.7662 1.57861C39.7662 1.15993 39.9325 0.758391 40.2285 0.462295Z"
              fill="white"
            />
            <path
              d="M11.2105 31.5592H6.60526C5.38387 31.5592 4.2125 31.0601 3.34885 30.1718C2.4852 29.2835 2 28.0787 2 26.8224V12.6118C2 11.3556 2.4852 10.1507 3.34885 9.26239C4.2125 8.37406 5.38387 7.875 6.60526 7.875H15.6184H20.3553M15.8158 41.0329C14.5944 41.0329 13.423 40.5338 12.5594 39.6455C11.6957 38.7572 11.2105 37.5523 11.2105 36.296V22.0855C11.2105 20.8292 11.6957 19.6244 12.5594 18.7361C13.423 17.8477 14.5944 17.3487 15.8158 17.3487H38.8421C40.0635 17.3487 41.2348 17.8477 42.0985 18.7361C42.9621 19.6244 43.4473 20.8292 43.4473 22.0855V36.296C43.4473 37.5523 42.9621 38.7572 42.0985 39.6455C41.2348 40.5338 40.0635 41.0329 38.8421 41.0329H33.7763H27.4605C31.2544 41.0329 34.2368 41.0329 15.8158 41.0329ZM31.9342 29.1908C31.9342 30.4471 31.449 31.6519 30.5853 32.5402C29.7217 33.4286 28.5503 33.9276 27.3289 33.9276C26.1075 33.9276 24.9362 33.4286 24.0725 32.5402C23.2089 31.6519 22.7237 30.4471 22.7237 29.1908C22.7237 27.9345 23.2089 26.7297 24.0725 25.8413C24.9362 24.953 26.1075 24.4539 27.3289 24.4539C28.5503 24.4539 29.7217 24.953 30.5853 25.8413C31.449 26.7297 31.9342 27.9345 31.9342 29.1908Z"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="max-md:inline-block text-lg max-xl:text-[10px] max-xl:leading-4">
            Transferir
          </span>
        </button>
      </li>
      <li className="max-md:sm:flex-1 max-md:order-7 max-sm:hidden">
        <button
          className="flex max-xl:flex-col justify-center items-center gap-4 max-xl:gap-0 bg-indigo-500 max-md:hover:bg-transparent max-md:bg-transparent hover:bg-indigo-600 px-4 py-3 max-xl:p-1 rounded-md w-full text-xl max-md:hover:text-indigo-600 md:text-white dark:text-white transition-all"
          aria-label="Reporte"
        >
          <HiOutlineArrowDownTray className="text-2xl" />
          <span className="max-md:inline-block text-lg max-xl:text-[10px] max-xl:leading-4">
            Reporte
          </span>
        </button>
      </li>
      <li
        className="max-sm:inline-block relative max-sm:flex-1 max-md:order-5 hidden"
        ref={ref}
        onClick={toggleMenu}
      >
        <button
          className="flex max-xl:flex-col justify-start items-center gap-4 max-xl:gap-0 bg-indigo-500 max-md:hover:bg-transparent max-md:bg-transparent hover:bg-indigo-600 px-4 py-3 max-xl:p-1 rounded-md w-full text-xl max-md:hover:text-indigo-600 md:text-white dark:text-white transition-all"
          aria-label="Reporte"
        >
          <HiEllipsisHorizontal className="text-2xl" />
          <span className="max-md:inline-block text-lg max-xl:text-[10px] max-xl:leading-4">
            Más
          </span>
        </button>
        <ul
          className={`${isOpenMenu ? 'fixed' : 'hidden'} menu-mobile right-2 bottom-[96px] flex flex-col gap-4 border-indigo-300 dark:border-indigo-500 bg-indigo-200 dark:bg-indigo-800 shadow-md p-2 border rounded-lg`}
        >
          <li>
            <button className="w-full">
              <HiOutlineArrowDownTray className="m-auto text-2xl" />
              <p className="text-[10px] leading-4">Reporte</p>
            </button>
          </li>
          <li>
            <NavLink
              to="/dashboard/estadisticas"
              className={classNameFunctionNavLink}
            >
              <HiOutlineChartPie className="text-2xl" />
              <p className="text-[10px] leading-4">Estadísticas</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/configuracion"
              className={classNameFunctionNavLink}
            >
              <HiOutlineCog6Tooth className="text-2xl" />
              <p className="text-[10px] leading-4">Configuración</p>
            </NavLink>
          </li>
        </ul>
      </li>
    </ul>
  );
};
