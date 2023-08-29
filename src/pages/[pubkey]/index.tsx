import { DataTable } from "@/components/data-table";
import { useChannelList } from "@/lib/api/use-channel-list";
import { useRouter } from "next/router";

export default function Pubkey() {
  const router = useRouter();
  const { pubkey } = router.query;

  const { data, isLoading } = useChannelList();

  return (
    <main className="h-full">
      <div className="max-w-6xl py-10 mx-auto bg-slate-800 min-h-full px-10">
        <p className="text-slate-400 font-medium text-md">Lightning Node</p>
        <h1 className="text-white font-semibold text-4xl">Binance</h1>
        <p className="text-blue-400">{pubkey}</p>
        <h2 className="text-white font-medium text-2xl mt-10 mb-3">
          Open Channels
        </h2>
        <DataTable data={data} isLoading={isLoading} />
      </div>
    </main>
  );
}
