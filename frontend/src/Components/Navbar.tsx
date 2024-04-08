import { Link, useNavigate } from "react-router-dom"
import { BsArrowLeftCircle } from "react-icons/bs";
import { GiSun } from "react-icons/gi";
import { BsMoonStars } from "react-icons/bs";
import { useAuth } from "../Hooks/useAuth";
import { useLogout } from "../Hooks/useLogout";

export const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken, darkMode, toggleDarkMode } = useAuth();
  const { setLogout } = useLogout({
    onSuccess: () => navigate('/login', { replace: true }),
  }) 

  return (
    <nav className="fixed flex justify-between items-center z-10 top-0 w-full py-4 px-5 text-black dark:text-white">
      <div className="flex space-x-5">
        <Link to="/">
          <BsArrowLeftCircle className="w-[28px] h-[28px] text-black dark:text-white hover:text-indigo-600 dark:hover:bg-indigo-500 rounded-full"/>
        </Link>
        {accessToken &&
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/transferencias">Transferencias</Link>
            <Link to="/inversiones">Inversiones</Link>
          </>
        }
      </div>
      <div className="flex space-x-5">
        <label className="inline-flex items-center space-x-2">
          <GiSun />  
          <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={() => toggleDarkMode()} />
          <div className="relative w-16 h-5 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 peer-checked:after:translate-x-[42px] peer-checked:after:border-white after:content-[''] after:absolute after:top-0 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
          <BsMoonStars />
        </label>
        {accessToken && <p className="cursor-pointer" onClick={() => setLogout()}>Logout</p>}
      </div>
    </nav>
  )
}