import { ReactPortal, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../Hooks/useClickOutside';
import { useAuth } from '../Hooks/useAuth';

type ModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  children: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >;
};

export const Modal = ({
  children,
  onCloseModal,
  isOpen,
}: ModalProps): ReactPortal | null => {
  const { darkMode } = useAuth();
  const ref = useOutsideClick<HTMLDivElement>(onCloseModal);

  if (!isOpen) return null;

  return createPortal(
    <div
      id="modal"
      className={`${darkMode ? 'dark' : 'light'} z-10 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm transition duration-300 ease-out`}
    >
      <div ref={ref}>
        <button onClick={onCloseModal} className="top-8 right-8 fixed">
          <HiXMark className="text-4xl dark:text-white" />
        </button>
        <div>{cloneElement(children)}</div>
      </div>
    </div>,
    document.getElementById('portal')!
  );
};
