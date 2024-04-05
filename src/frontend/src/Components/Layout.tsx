export const Layout = ({ children }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto overflow-x-auto bg-fixed bg-cover bg-center bg-gradient-to-br from-indigo-300 dark:from-indigo-800 from-20% via-white dark:via-black via-50% to-indigo-300 dark:to-indigo-800 to-95%">
      <div className="relative flex justify-center items-center h-full">
        {children}
      </div>
    </div>
  )
}