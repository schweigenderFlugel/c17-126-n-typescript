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
    <div className="max-lg:flex flex-col max-lg:gap-1 grid grid-cols-3 max-2xl:grid-cols-2">
      <label htmlFor={name} className="col-span-1 dark:text-white">
        {label}
      </label>
      <div className="relative flex justify-between items-center">
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