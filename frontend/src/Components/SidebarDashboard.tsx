import {
  HiArrowTrendingUp,
  HiMiniHome,
  HiOutlineArrowDownTray,
  HiOutlineArrowsRightLeft,
  HiOutlineChartPie,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';

import { SidebarLink } from './SidebarLink';
import { SidebarButton } from './SidebarButton';
import { SidebarMobileMenu } from './SidebarMobileMenu';

export const SidebarDashboard = () => {
  return (
    <ul className="flex max-md:flex-row flex-col max-md:justify-around max-md:items-center gap-4 max-md:gap-0 max-md:m-0 mt-6 max-md:w-full [&_li_button]:h-[48px] text-gray-900/70 dark:text-white">
      <li className="max-md:flex-1 max-md:order-1">
        <SidebarLink
          to="/dashboard"
          icon={<HiMiniHome className="text-2xl" />}
          label="Inicio"
        />
      </li>
      <li className="max-md:flex-1 max-md:order-2">
        <SidebarLink
          to="/dashboard/transferencias"
          icon={<HiOutlineArrowsRightLeft className="text-2xl" />}
          label="Transferencias"
        />
      </li>
      <li className="max-md:flex-1 max-sm:order-4 max-md:order-4">
        <SidebarLink
          to="/dashboard/inversiones"
          label="Inversiones"
          icon={<HiArrowTrendingUp className="text-2xl" />}
        />
      </li>
      <li className="max-md:flex-1 max-md:order-5 max-sm:hidden">
        <SidebarLink
          to="/dashboard/estadisticas"
          label="Estadísticas"
          icon={<HiOutlineChartPie className="text-2xl" />}
        />
      </li>
      <li className="max-md:sm:flex-1 max-md:order-6 max-sm:hidden">
        <SidebarLink
          to="/dashboard/configuracion"
          label="Configuración"
          icon={<HiOutlineCog6Tooth className="text-2xl" />}
        />
      </li>
      <li className="max-sm:flex-1 max-sm:order-3 max-md:order-4 mt-16 max-md:mt-0 min-w-20">
        <SidebarButton
          label="Transferir"
          icon={<img src="./icons/transfer.svg" className="w-[24px]" />}
          className="max-sm:mx-auto max-xl:px-2 max-xl:py-1 max-sm:w-fit text-center text-white"
        />
      </li>
      <li className="max-md:sm:flex-1 max-md:order-7 max-sm:hidden">
        <SidebarButton
          label="Reporte"
          icon={<HiOutlineArrowDownTray className="text-2xl" />}
          className="max-md:hover:bg-transparent max-md:bg-transparent max-md:hover:text-indigo-600"
        />
      </li>
      <li className="max-sm:inline-block relative max-sm:flex-1 max-md:order-5 hidden">
        <SidebarMobileMenu />
      </li>
    </ul>
  );
};
