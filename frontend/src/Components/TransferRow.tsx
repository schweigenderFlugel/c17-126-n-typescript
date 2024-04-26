import { PropsWithChildren } from 'react';

export const TableRow = ({
  children,
  isHeader = false,
}: PropsWithChildren<{ isHeader?: boolean }>) => {
  return (
    <div
      className={`grid grid-cols-[1.2fr_1fr_1fr_1.2fr] max-[800px]:grid-cols-3 px-4 py-[12px] border-b last:border-none dark:border-indigo-600 items-center border-indigo-300 ${isHeader ? 'bg-indigo-200/80 dark:bg-indigo-900' : ''}`}
    >
      {children}
    </div>
  );
};
