export const Layout = ({ children }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-indigo-300 from-20% via-white via-50% to-indigo-300 to-95%">
      {children}
    </div>
  )
}
