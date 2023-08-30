type ChannelCardProps = {
  value: string;
  label: string;
  isLoading?: boolean;
};

export function ChannelCard({ value, label, isLoading }: ChannelCardProps) {
  if (isLoading) {
    return (
      <div className="w-full bg-slate-300/90 h-44 flex flex-col justify-center rounded shadow-lg shadow-slate-700 animate-pulse" />
    );
  }

  return (
    <div className="w-full px-2 bg-slate-300/90 h-44 flex flex-col justify-center rounded shadow-lg shadow-slate-700">
      <p className="text-center capitalize font-bold text-3xl text-blue-600">
        {value}
      </p>
      <p className="text-center font-normal text-lg text-slate-700">{label}</p>
    </div>
  );
}
