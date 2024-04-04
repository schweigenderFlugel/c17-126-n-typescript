export const Layout = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-300 dark:from-indigo-800 from-20% via-white dark:via-black via-50% to-indigo-300 dark:to-indigo-800 to-95%">
      {children}
    </div>
  )
}