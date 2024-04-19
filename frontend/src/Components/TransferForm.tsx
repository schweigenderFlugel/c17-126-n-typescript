export const TransferForm = () => {
  return (
    <div className="justify-items-center border-indigo-500 grid bg-black bg-opacity-25 mx-6 p-12 max-sm:p-8 border rounded-2xl w-[450px]">
      <form className="w-full">
        <label
          htmlFor="alias"
          className="w-full text-sm text-white dark:text-white"
        >
          Alias
        </label>
        <div className="relative flex justify-between items-center">
          <input
            type="text"
            id="alias"
            name="alias"
            className="border-indigo-300 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-sm text-white dark:text-white"
          />
        </div>
        <label
          htmlFor="quantity"
          className="w-full text-sm text-white dark:text-white"
        >
          Cantidad
        </label>
        <div className="relative flex justify-between items-center">
          <input
            placeholder="$"
            type="number"
            id="quantity"
            name="quantity"
            className="border-indigo-300 focus:border-indigo-600 focus:dark:border-indigo-500 focus:outline-none dark:border-white bg-transparent px-2 py-4 border rounded-md w-full h-8 text-sm text-white dark:text-white"
          />
        </div>
        <button className="bg-indigo-600 mt-4 py-2 rounded-lg w-full text-white">Transferir</button>
      </form>
    </div>
  );
};
