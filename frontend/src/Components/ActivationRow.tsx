type ActivationRowProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: 'password' | 'text';
  value: string;
  name: string;
  error: boolean;
  showCode: boolean;
};

export const ActivationRow = ({
  onChange,
  value,
  type,
  name = '',
  error,
}: ActivationRowProps) => {
  return (
    <div>
      <div>
        <input
          type={type}
          id={name}
          name={name}
          className={`justify-center border ${error ? `border-red-600 dark:border-red-600 focus:border-red-500 dark:focus:border-red-500` : `border-indigo-300 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white`} bg-transparent py-4 rounded-md w-16 h-4 text-black text-sm dark:text-white`}
          onChange={onChange}
          value={value.toUpperCase()}
          maxLength={4}
        />
      </div>
    </div>
  );
};
