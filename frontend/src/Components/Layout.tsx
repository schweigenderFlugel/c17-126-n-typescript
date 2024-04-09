import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Layout = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-20% from-indigo-300 dark:from-indigo-800 via-50% via-white dark:via-black to-95% to-indigo-300 dark:to-indigo-800 bg-cover bg-center bg-fixed overflow-x-auto overflow-y-auto">
      <div className="relative flex justify-center items-center h-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}
