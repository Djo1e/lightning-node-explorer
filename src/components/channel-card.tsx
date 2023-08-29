type ChannelCardProps = {
  value: string;
  label: string;
};

export function ChannelCard({ value, label }: ChannelCardProps) {
  return (
    <div className="w-1/3 bg-slate-400 h-44 flex flex-col justify-center rounded shadow-md shadow-slate-700">
      <p className="text-center font-bold text-3xl text-blue-600">{value}</p>
      <p className="text-center font-normal text-lg text-slate-700">{label}</p>
    </div>
  );
}
