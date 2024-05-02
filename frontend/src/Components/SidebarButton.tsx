import { ReactNode } from 'react';

type SidebarButton = {
  label: string;
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const SidebarButton = ({
  icon,
  label,
  className,
  onClick,
}: SidebarButton) => {
  return (
    <button
      className={`flex max-xl:flex-col justify-center items-center gap-4 max-xl:gap-1 bg-indigo-500 hover:bg-indigo-600 px-4 py-3 max-xl:p-1 rounded-md w-full text-xl md:text-white dark:text-white transition-all ${className}`}
      aria-label={label}
      onClick={onClick}
    >
      {icon}
      <span className="text-lg max-xl:text-[10px] max-xl:leading-4">
        {label}
      </span>
    </button>
  );
};
