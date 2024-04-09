import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { HiBars3, HiMiniXMark } from 'react-icons/hi2';
import { Logo } from './Logo';
import { MainButton } from './MainButton';

export const NavBarLadingPage = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menuMobileClasses = `max-lg:absolute max-lg:top-0 max-lg:gap-10 max-lg:bg-indigo-100 max-lg:bg-opacity-95 max-lg:text-gray-900 max-lg:right-0 max-lg:flex-col max-lg:w-full max-lg:h-dvh max-lg:text-xl max-lg:font-medium ${
    menuIsOpen
      ? 'max-lg:translate-x-[0%] max-lg:visible max-lg:opacity-100'
      : 'max-lg:translate-x-[100%] max-lg:invisible max-lg:opacity-0'
  }`;

  const navBarChildrenClasses = `[&_li_a:hover]:bg-indigo-600 [&_li_a]:px-4 [&_li_a]:py-3 [&_li_a]:rounded-md max-lg:[&_li_a:hover]:text-white [&_li_a]:transition-all [&_li_a]:duration-300`;

  return (
    <nav className="flex items-center place-content-between py-6 w-full h-fit">
      <Link to="/">
        <Logo isWhite className="max-sm:text-4xl" />
      </Link>
      <ul
        className={`transition-all flex items-center justify-center gap-6 text-center text-white duration-500 ${menuMobileClasses} ${navBarChildrenClasses}`}
      >
        <li>
          <NavLink to="#" className="transition-all duration-300">
            Información
          </NavLink>
        </li>
        <li>
          <NavLink to="#">Preguntas Frequentes</NavLink>
        </li>
        <li>
          <NavLink to="login">Inciar sesión</NavLink>
        </li>
        <NavLink to="/registro">
          <MainButton>Registrarse</MainButton>
        </NavLink>
      </ul>
      <button
        className="max-lg:block z-10 hidden"
        onClick={() => setMenuIsOpen((isOpen) => !isOpen)}
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
