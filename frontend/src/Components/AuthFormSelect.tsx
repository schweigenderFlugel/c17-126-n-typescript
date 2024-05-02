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

export const AuthFormSelect = ({
    onChange,
    value,
    name = '',
    label = '',
    options = [],
}: AuthFormSelectProps) => {
  return (
    <div>
      <label htmlFor={name} className="text-black text-sm dark:text-white">
        {label}
      </label>
      <div className="relative flex justify-between items-center">
        <select 
          name={name}
          id={name}
          value={value}
          defaultValue="Seleccionar"
          className="bg-transparent focus:outline-none text-black text-sm border-indigo-300 focus:border-indigo-600 focus:dark:border-indigo-500 dark:text-white border rounded-md dark:border-white w-full h-9 px-1"
          onChange={onChange}
        >
        {options.map(option => (
          <option key={option.value} value={option.value} disabled={option.disable} className="dark:bg-black">{option.label}</option>
        ))}
        </select>
      </div>
    </div>
  )
}