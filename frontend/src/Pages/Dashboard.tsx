import { Outlet, useNavigate } from 'react-router-dom';

import { SidebarDashboard } from '../Components/SidebarDashboard';
import { Logo } from '../Components/Logo';
import { AxiosError } from 'axios';
import { useUser } from '../Hooks/useUser';

export const Dashboard = () => {
  const navigate = useNavigate();

  const onUserError = (error: AxiosError) => {
    if (error.response?.status === 404) {
      navigate('/datos-personales', { replace: true });
    } else if (error.response?.status === 401) {
      navigate('/login', { replace: true });
    }
  };

  useUser({
    onSuccess: () => navigate('/dashboard', { replace: true }),
    onReject: (error: AxiosError) => onUserError(error),
  });

  return (
    <main className="gap-2 grid grid-cols-[350px_1fr] max-md:grid-cols-1 max-2xl:grid-cols-[300px_1fr] max-xl:grid-cols-[100px_1fr] max-md:grid-rows-[1fr_80px] p-6 max-md:p-2 w-full h-full text-gray-900/70">
      <nav className="flex max-md:flex-row flex-col items-center border-indigo-200 dark:border-indigo-500 max-md:row-start-2 max-md:row-end-3 bg-white dark:bg-black bg-opacity-25 dark:bg-opacity-25 p-6 max-md:p-2 border rounded-2xl max-md:w-full">
        <Logo small className="max-md:hidden max-xl:[&_span]:hidden my-8" />
        <SidebarDashboard />
      </nav>
      <div className="border-indigo-200 dark:border-indigo-500 bg-white dark:bg-black bg-opacity-25 dark:bg-opacity-25 p-6 border rounded-2xl overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
};
