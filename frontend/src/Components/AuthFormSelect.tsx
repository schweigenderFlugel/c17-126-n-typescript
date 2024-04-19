type Option = {
  value: string;
  label: string;
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
          defaultValue="Seleccionar" 
          value={value}
          className="border-indigo-300 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-black text-sm dark:text-white"
          onChange={onChange}
        >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
        </select>
      </div>
    </div>
  )
}