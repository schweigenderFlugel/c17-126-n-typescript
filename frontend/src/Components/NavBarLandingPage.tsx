import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { HiBars3, HiMiniXMark } from 'react-icons/hi2';
import { Logo } from './Logo';
import { MainButton } from './MainButton';
import { useAuth } from '../Hooks/useAuth';

export const NavBarLadingPage = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { accessToken } = useAuth();

  const menuMobileClasses = `max-lg:absolute max-lg:top-0 max-lg:gap-10 max-lg:bg-indigo-100 max-lg:bg-opacity-95 max-lg:text-gray-900 max-lg:right-0 max-lg:flex-col max-lg:w-full max-lg:h-dvh max-lg:text-xl max-lg:font-medium ${
    menuIsOpen
      ? 'max-lg:translate-x-[0%] max-lg:visible max-lg:opacity-100'
      : 'max-lg:translate-x-[100%] max-lg:invisible max-lg:opacity-0'
  }`;

  const navlinkClasses = `hover:bg-indigo-600 px-4 py-3 rounded-md max-lg:hover:text-white transition-all duration-300`;

  return (
    <nav className="flex items-center place-content-between py-6 w-full h-fit">
      <Link to="/">
        <Logo className="text-white" />
      </Link>
      <ul
        className={`transition-all flex items-center justify-center gap-6 text-center text-white duration-500 ${menuMobileClasses}`}
      >
        <li>
          <NavLink to="#" className={navlinkClasses}>
            Información
          </NavLink>
        </li>
        <li>
          <NavLink to="#" className={navlinkClasses}>
            Preguntas Frequentes
          </NavLink>
        </li>
        {accessToken ? (
          <li>
            <NavLink to="/dashboard">
              <MainButton>Ir al dashboard</MainButton>
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="login" className={navlinkClasses}>
                Inciar sesión
              </NavLink>
            </li>
            <li>
              <NavLink to="/registro">
                <MainButton>Registrarse</MainButton>
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <button
        className="max-lg:block z-10 hidden"
        onClick={() => setMenuIsOpen(isOpen => !isOpen)}
      >
        <HiBars3
          className={`w-12 h-12 text-white ${menuIsOpen ? 'hidden' : 'block'}`}
        />
        <HiMiniXMark
          className={`w-12 h-12 text-gray-900 ${
            menuIsOpen ? 'block' : 'hidden'
          }`}
        />
      </button>
    </nav>
  );
};
