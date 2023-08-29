type ChannelCardProps = {
  value: string;
  label: string;
  isLoading?: boolean;
};

export function ChannelCard({ value, label, isLoading }: ChannelCardProps) {
  return (
    <div className="w-1/3 bg-slate-400 h-44 flex flex-col justify-center rounded shadow-md shadow-slate-700">
      {isLoading ? (
        <div className="mx-auto flex flex-col items-center">
          <div className="w-64 h-8 bg-slate-500 animate-pulse" />
          <div className="w-28 h-6 bg-slate-500 animate-pulse mt-1" />
        </div>
      ) : (
        <>
          <p className="text-center font-bold text-3xl text-blue-600">
            {value}
          </p>
          <p className="text-center font-normal text-lg text-slate-700">
            {label}
          </p>
        </>
      )}
    </div>
  );
}
