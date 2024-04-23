import { useState } from 'react';
import {
  HiEllipsisHorizontal,
  HiOutlineArrowDownTray,
  HiOutlineChartPie,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';

import { useOutsideClick } from '../Hooks/useClickOutside';
import { SidebarButton } from './SidebarButton';
import { SidebarLink } from './SidebarLink';

export const SidebarMobileMenu = ({
  onClickButton = () => {},
}: {
  onClickButton?: () => void;
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(isOpen => !isOpen);
  };

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  const ref = useOutsideClick<HTMLDivElement>(closeMenu);

  return (
    <div ref={ref}>
      <SidebarButton
        label="Más"
        icon={<HiEllipsisHorizontal className="text-2xl" />}
        className="max-md:hover:bg-transparent max-md:bg-transparent max-md:hover:text-indigo-600"
        onClick={toggleMenu}
      />
      <ul
        className={`${isOpenMenu ? 'fixed' : 'hidden'} menu-mobile right-2 bottom-[96px] flex flex-col gap-4 border-indigo-300 dark:border-indigo-500 bg-indigo-200 dark:bg-indigo-800 shadow-md p-2 border rounded-lg`}
        onClick={closeMenu}
      >
        <li>
          <SidebarButton
            icon={<HiOutlineArrowDownTray className="m-auto text-2xl" />}
            label="Reporte"
            className="max-md:hover:bg-transparent max-md:bg-transparent max-md:hover:text-indigo-600"
            onClick={onClickButton}
          />
        </li>
        <li>
          <SidebarLink
            to="/dashboard/estadisticas"
            label="Estadísticas"
            icon={<HiOutlineChartPie className="text-2xl" />}
          />
        </li>
        <li>
          <SidebarLink
            to="/dashboard/configuracion"
            label="Configuración"
            icon={<HiOutlineCog6Tooth className="text-2xl" />}
          />
        </li>
      </ul>
    </div>
  );
};
