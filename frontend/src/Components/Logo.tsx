export const Logo = ({
  isWhite = false,
  className = '',
}: {
  isWhite?: boolean;
  className?: string;
}) => {
  return (
    <>
      <h2
        className={`font-extrabold text-5xl align-middle ${
          isWhite ? 'text-white' : 'text-gray-900'
        } ${className}`}
      >
        Banco n<span className="text-indigo-500">c.</span>
      </h2>
    </>
  );
};
