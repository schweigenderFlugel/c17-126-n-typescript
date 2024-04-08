import { PropsWithChildren } from 'react';

interface MainButtonProps {
  className?: string;
}

export const MainButton = ({
  children,
  className = '',
}: PropsWithChildren<MainButtonProps>) => {
  return (
    <button
      className={`${className} bg-indigo-500 text-gray-50 px-4 py-3 rounded-md hover:bg-indigo-600 transition-all duration-500`}
    >
      {children}
    </button>
  );
};
