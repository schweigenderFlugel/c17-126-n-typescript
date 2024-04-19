import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

type SidebarLinkProps = {
  label: string;
  to: string;
  icon: ReactNode;
  className?: string;
};

export const SidebarLink = ({
  label,
  to,
  icon,
  className = '',
}: SidebarLinkProps) => {
  const classNameFunctionNavLink = ({ isActive }) =>
    isActive
      ? `flex justify-start items-center gap-4 bg-indigo-500 hover:bg-indigo-600 max-md:hover:bg-transparent max-md:bg-transparent px-4 py-3 rounded-md text-xl max-md:hover:text-indigo-600 max-md:[&_*]:text-indigo-500 dark:text-white transition-all md:text-white max-xl:flex-col max-xl:gap-0 max-xl:p-1 ${className}`
      : `flex justify-start items-center gap-4 max-md:hover:bg-transparent hover:bg-indigo-600 px-4 py-3 rounded-md text-xl max-md:hover:text-indigo-600 hover:text-white dark:text-white transition-all max-xl:flex-col max-xl:gap-0 max-xl:p-1 ${className}`;

  return (
    <NavLink className={classNameFunctionNavLink} to={to} end>
      {icon}
      <span className="max-md:inline-block text-lg max-xl:text-[10px] max-xl:leading-4">
        {label}
      </span>
    </NavLink>
  );
};
