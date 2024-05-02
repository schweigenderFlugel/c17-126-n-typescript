export const LoadingDots = () => {
  return (
    <div className="flex items-center gap-2 h-9">
      <div className="bg-white rounded-full w-2 h-2 animate-bounce [animation-delay:-0.3s]"></div>
      <div className="bg-white rounded-full w-2 h-2 animate-bounce [animation-delay:-0.15s]"></div>
      <div className="bg-white rounded-full w-2 h-2 animate-bounce"></div>
    </div>
  );
};
