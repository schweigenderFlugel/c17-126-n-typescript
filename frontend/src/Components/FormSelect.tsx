type Option = {
  value: string;
  label: string;
  disable: boolean;
}
  
type AuthFormSelectProps = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  options: Option[];
  name?: string;
  label?: string;
  required?: boolean;
};

export const FormSelect = ({
  onChange,
  value,
  name = '',
  label = '',
  options = [],
}: AuthFormSelectProps) => {
  return (
    <div className="max-lg:flex flex-col max-lg:gap-1 grid grid-cols-3 max-2xl:grid-cols-2">
      <label htmlFor={name} className="col-span-1 dark:text-white">
        {label}
      </label>
      <div className="relative flex justify-between items-center">
        <select
          name={name}
          id={name}
          value={value}
          className="border-indigo-500 focus:dark:border-indigo-400 dark:border-white/70 bg-transparent p-2 border rounded-lg w-full disabled:text-gray-400 dark:disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none dark:text-white"
          onChange={onChange}
        >
          {options.map(option => (
            <option key={option.value} value={option.value} disabled={option.disable} className="dark:bg-indigo-950">{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}