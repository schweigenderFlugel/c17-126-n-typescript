import { PropsWithChildren } from 'react';

export const TableRow = ({
  children,
  isHeader = false,
}: PropsWithChildren<{ isHeader?: boolean }>) => {
  return (
    <div
      className={`grid grid-cols-[1.2fr_1fr_1fr_1.2fr] p-4 border-b last:border-none dark:border-indigo-600 border-indigo-300 ${isHeader ? 'bg-indigo-200/80 dark:bg-indigo-900' : ''}`}
    >
      {children}
    </div>
  );
};
