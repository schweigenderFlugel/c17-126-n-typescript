import { CiWarning } from 'react-icons/ci'

export const ErrorMessage = ({ children }) => {
  return (
    <div className="bg-red-200 p-5 rounded-md border-2 border-red-800">
      <CiWarning className="text-center font-bold text-red-800 text-[24px]" />
      <p className="text-red-800 font-bold">{children}</p>
    </div>
  )
}
