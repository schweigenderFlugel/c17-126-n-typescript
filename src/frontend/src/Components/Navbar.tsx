import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { GiSun } from "react-icons/gi";
import { BsMoonStars } from "react-icons/bs";
import { useAuth } from "../Hooks/useAuth";
import { useLogout } from "../Hooks/useLogout";

export const Navbar = () => {
  const [ darkMode, setDarkMode ] = useState<boolean>(false);
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { setLogout } = useLogout({
    onSuccess: () => navigate('/login', { replace: true }),
  }) 

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  }

  return (
    <nav className="flex justify-between items-center z-10 top-0 w-full py-4 px-5 text-black dark:text-white">
      <div className="flex space-x-5">
        <Link to="/">Landing Page</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/transferencias">Transferencias</Link>
        <Link to="/inversiones">Inversiones</Link>
      </div>
      <div className="flex space-x-5">
        <label className="inline-flex items-center space-x-2 cursor-pointer">
          <GiSun />  
          <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={handleDarkMode} />
          <div className="relative w-16 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <BsMoonStars />
        </label>
        <Link to="/login">Login</Link>
        <Link to="/registro">Registro</Link>
        {accessToken && <p className="cursor-pointer" onClick={() => setLogout()}>Logout</p>}
      </div>
    </nav>
  )
}