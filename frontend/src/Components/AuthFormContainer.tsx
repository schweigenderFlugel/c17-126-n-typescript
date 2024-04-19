import { PropsWithChildren } from 'react';
import { Logo } from './Logo';

type AuthFormContainerProps = {
  subtitle: string;
};

export const AuthFormContainer = ({
  children,
  subtitle,
}: PropsWithChildren<AuthFormContainerProps>) => {
  return (
    <main className="justify-items-center border-indigo-200 dark:border-indigo-500 grid bg-white dark:bg-black bg-opacity-25 dark:bg-opacity-25 mx-6 p-12 max-sm:p-8 border rounded-2xl w-[450px]">
      <Logo small />
      <h2 className="mt-2 mb-4 text-center text-lg dark:text-white">
        {subtitle}
      </h2>
      {children}
    </main>
  );
};
