import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import {
  HiArrowRightOnRectangle,
  HiMagnifyingGlass,
  HiOutlineBell,
  HiOutlineMoon,
  HiOutlineSun,
} from 'react-icons/hi2';
import { useLogout } from '../Hooks/useLogout';

export const DashboardNavbar = ({ children }) => {
  const navigate = useNavigate();
  const { setLogout } = useLogout({
    onSuccess: () => navigate('/login', { replace: true }),
  });
  const { darkMode, toggleDarkMode, userData } = useAuth();

  return (
    <nav className="items-center grid grid-cols-3 max-sm:grid-cols-2 col-span-12 row-span-1 py-2 w-full">
      <h2 className="justify-self-start font-semibold text-3xl max-lg:text-2xl dark:text-white">
        {children}
      </h2>
      <div className="relative justify-self-center max-sm:hidden w-[300px] max-lg:w-[200px]">
        <HiMagnifyingGlass className="top-[50%] left-2 absolute text-[20px] text-indigo-600 dark:text-white translate-y-[-50%]" />
        <input
          type="text"
          placeholder="Buscar"
          className="border-indigo-300 focus:border-indigo-600 focus:dark:border-indigo-500 dark:border-white bg-transparent px-2 py-4 pl-8 rounded-md w-full focus:outline-none border h-8 text-black text-sm dark:text-white"
        />
      </div>
      <div className="inline-flex justify-self-end items-center space-x-4">
        <button onClick={() => toggleDarkMode()}>
          {darkMode ? (
            <HiOutlineSun className="text-[22px] dark:text-white" />
          ) : (
            <HiOutlineMoon className="text-[22px]" />
          )}
        </button>
        <HiOutlineBell className="text-[24px] dark:text-white" />
        <div className="inline-flex items-center gap-4">
          <p className="max-sm:hidden dark:text-white">{userData?.name ?? 'Usuario'}</p>
          <button onClick={setLogout}>
            <HiArrowRightOnRectangle className="text-[24px] dark:text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
};
