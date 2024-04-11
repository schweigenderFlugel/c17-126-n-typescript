import { BsBell, BsMoonStars } from "react-icons/bs";
import { GiSun } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../Hooks/useAuth";

export const DashboardNavbar = ({ children }) => {
  const { darkMode, toggleDarkMode } = useAuth();

  return (
    <nav className="col-span-12 row-span-1 flex justify-between items-center w-full py-2">
      <h2 className="text-[20px] dark:text-white font-extrabold">{children}</h2>
      <input type="text" placeholder="Buscar" className="w-[30%] px-2 rounded-md dark:bg-transparent border dark:text-white dark:border-white"/>
      <div className="inline-flex items-center space-x-4">
        <button onClick={() => toggleDarkMode()}>
          {darkMode 
            ? <GiSun className="text-[20px] dark:text-white" />
            : <BsMoonStars className="text-[20px]"/>
          }
        </button>
        <BsBell className="text-[20px] dark:text-white" />
        <div className="inline-flex items-center space-x-4">
          <p className="dark:text-white">Usuario</p>
          <FaUser className="text-[20px] dark:text-white"/>
        </div>
      </div>
    </nav>
  )
}