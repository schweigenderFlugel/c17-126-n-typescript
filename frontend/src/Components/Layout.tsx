import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAuth } from '../Hooks/useAuth';
import { LoadingPage } from './LoadingPage';

export const Layout = () => {
  const { darkMode, accessToken, loadingPageRefresh, loadingUser } = useAuth();

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-20% from-indigo-300 dark:from-indigo-800 via-50% via-white dark:via-black/95 to-95% to-indigo-300 dark:to-indigo-800 bg-cover bg-center bg-fixed w-dvh h-dvh overflow-x-auto overflow-y-auto">
        {!accessToken && !loadingPageRefresh && !loadingUser && <Navbar />}
        <div className="flex justify-center items-center h-full">
          {loadingPageRefresh || loadingUser ? <LoadingPage /> : <Outlet />}
        </div>
      </div>
    </div>
  );
};
