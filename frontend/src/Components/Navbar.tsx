import { useNavigate } from 'react-router-dom';
import {
  HiOutlineArrowLeftCircle,
  HiOutlineMoon,
  HiOutlineSun,
} from 'react-icons/hi2';
import { useAuth } from '../Hooks/useAuth';
import { useLogout } from '../Hooks/useLogout';

export const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken, darkMode, toggleDarkMode } = useAuth();
  const { setLogout } = useLogout({
    onSuccess: () => navigate('/login', { replace: true }),
  });

  return (
    <nav className="flex justify-between items-center px-8 max-sm:px-6 py-6 max-sm:py-4 w-full text-black dark:text-white">
      <div className="flex space-x-5">
        <button onClick={() => navigate(-1)}>
          <HiOutlineArrowLeftCircle className="dark:hover:bg-indigo-500 rounded-full w-9 h-9 text-black hover:text-indigo-600 dark:text-white" />
        </button>
      </div>
      <div className="flex space-x-5">
        <label className="inline-flex items-center space-x-2">
          <HiOutlineSun className="w-6 h-6" />
          <input
            type="checkbox"
            className="w-2 peer sr-only"
            checked={darkMode}
            onChange={() => toggleDarkMode()}
          />
          <div className="relative after:top-0 after:absolute after:content-[''] peer-checked:after:border-white after:border-gray-300 dark:border-gray-600 bg-gray-300 after:bg-white peer-checked:bg-indigo-600 after:border rounded-full after:rounded-full w-10 after:w-5 h-5 after:h-5 after:transition-all peer-checked:after:translate-x-[20px] cursor-pointer peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800"></div>
          <HiOutlineMoon className="w-6 h-6" />
        </label>
        {accessToken && (
          <p className="cursor-pointer" onClick={() => setLogout()}>
            Logout
          </p>
        )}
      </div>
    </nav>
  );
};
