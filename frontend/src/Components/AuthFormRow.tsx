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
  error?: boolean;
  errorMessage?: string;
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
  error,
  errorMessage,
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
          className={`border ${error ? `border-red-600 dark:border-red-600 focus:border-red-500 dark:focus:border-red-500` : `border-indigo-300 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white`} bg-transparent px-2 py-4 rounded-md w-full h-8 text-black text-sm dark:text-white`}
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
      {error && <p className='text-red-600 text-sm mt-2'>{errorMessage}</p>}
    </div>
  );
};
