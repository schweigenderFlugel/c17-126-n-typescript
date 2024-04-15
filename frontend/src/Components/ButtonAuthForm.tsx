import { Spinner } from './Spinner';

type ButtonAuthFormProps = {
  disabled: boolean;
  isLoading: boolean;
  label: string;
};

export const ButtonAuthForm = ({
  disabled,
  isLoading,
  label,
}: ButtonAuthFormProps) => {
  return (
    <button
      type="submit"
      className="bg-indigo-600 enabled:hover:bg-indigo-500 disabled:bg-opacity-50 px-2 rounded-lg w-full h-[36px] text-white disabled:text-opacity-50 cursor-pointer disabled:cursor-default"
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner /> : label}
    </button>
  );
};
