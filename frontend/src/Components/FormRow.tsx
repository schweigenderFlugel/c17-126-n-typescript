export const FormRow = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  disabled = false,
}) => {
  return (
    <div className="max-lg:flex flex-col max-lg:gap-1 grid grid-cols-3 max-2xl:grid-cols-2">
      <label htmlFor={name} className="col-span-1 dark:text-white">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="border-indigo-500 focus:dark:border-indigo-400 dark:border-white/70 bg-transparent p-2 border rounded-lg w-full disabled:text-gray-400 dark:disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none dark:text-white"
        disabled={disabled}
      />
    </div>
  );
};
