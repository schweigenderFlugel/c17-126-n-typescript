type Option = {
  value: string;
  label: string;
  disable: boolean;
}
  
type TypeTransferSelectProps = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  options: Option[];
  name?: string;
  label?: string;
  required?: boolean;
};

export const TransferTypeSelect = ({
  onChange,
  value,
  name = '',
  label = '',
  options = [],
}: TypeTransferSelectProps) => {
  return (
    <div>
      <label htmlFor={name} className="w-full text-gray-900 text-sm dark:text-white">
        {label}
      </label>
      <div className="relative flex justify-between items-center mb-2">
        <select
          name={name}
          id={name}
          value={value}
          defaultValue="Seleccionar"
          className="border-indigo-500 focus:dark:border-indigo-400 dark:border-white bg-transparent border rounded-lg w-full h-9 disabled:text-gray-400 dark:disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none dark:text-white text-sm"
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