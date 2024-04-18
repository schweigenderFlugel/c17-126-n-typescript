import { ReactPortal, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../Hooks/useClickOutside';

type ModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

export const Modal = ({
  children,
  onCloseModal,
  isOpen,
}: ModalProps): ReactPortal | null => {
  const ref = useOutsideClick<HTMLDivElement>(onCloseModal);

  if (!isOpen) return null;

  return createPortal(
    <div
      id="modal"
      className="z-10 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm transition duration-300 ease-out"
    >
      <div ref={ref}>
        <button onClick={onCloseModal} className="top-8 right-8 fixed">
          <HiXMark className="text-4xl text-white" />
        </button>
        <div>{cloneElement(children)}</div>
      </div>
    </div>,
    document.getElementById('portal')!
  );
};
