import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

type AuthFormRowProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: 'email' | 'password' | 'text' | 'tel';
  value: string;
  name?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  disable?: boolean;
  required?: boolean;
  onClickPasswordBtn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  showPassword?: boolean;
};

export const AuthFormRow = ({
  onChange,
  value,
  type,
  name = '',
  label = '',
  placeholder = '',
  required = false,
  autoComplete,
  disable = false,
  onClickPasswordBtn,
  showPassword,
}: AuthFormRowProps) => {
  return (
    <div>
      <label htmlFor={name} className="text-black text-sm dark:text-white">
        {label}
      </label>
      <div className="relative flex justify-between items-center">
        <input
          type={type}
          placeholder={placeholder}
          id={name}
          name={name}
          className="border-indigo-300 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent disabled:bg-gray-200/5 px-2 py-4 border rounded-md w-full h-8 text-black text-sm dark:text-white"
          onChange={onChange}
          value={value}
          required={required}
          disabled={disable}
          autoComplete={autoComplete}
        />
        {onClickPasswordBtn && (
          <button
            type="button"
            onClick={onClickPasswordBtn}
            className="right-3 absolute text-black hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-white cursor-pointer"
          >
            {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
          </button>
        )}
      </div>
    </div>
  );
};
