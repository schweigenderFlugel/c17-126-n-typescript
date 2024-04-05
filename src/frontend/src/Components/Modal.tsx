import { ReactPortal } from "react";
import { createPortal } from "react-dom";


export const Modal = ({ open, children }): ReactPortal | null => {
  if (!open) return null
  return createPortal(
    <div
      id="modal" 
      className="flex fixed justify-center items-center inset-0 z-10 transition duration-300 ease-out bg-opacity-70 bg-gray-500 dark:bg-black dark:bg-opacity-80"
    >
      <div>
        {children}
      </div>
    </div>,
    document.getElementById('portal')!,
  )
}