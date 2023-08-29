import { ChannelCard } from "@/components/channel-card";
import { DataTable } from "@/components/data-table";
import { useChannelList } from "@/lib/api/use-channel-list";
import { formatDistance } from "date-fns";
import { useRouter } from "next/router";

function formatCapacity(number: number) {
  return `${number.toLocaleString("en-US")} sats`;
}

function formatLastUpdate(lastUpdate: string | undefined) {
  return lastUpdate
    ? ` ${formatDistance(new Date(lastUpdate), new Date(), {
        addSuffix: true,
      })}`
    : "N/A";
}

export default function Pubkey() {
  const router = useRouter();
  const { pubkey } = router.query;

  const { data, isLoading } = useChannelList();
  const { totalCapacity, numChannels, lastUpdate, channels } = data || {};

  return (
    <main className="h-full">
      <div className="max-w-6xl py-10 mx-auto bg-slate-800 min-h-full px-10">
        <p className="text-slate-400 font-medium text-md">Lightning Node</p>
        <h1 className="text-white font-semibold text-4xl">Binance</h1>
        <p className="text-blue-400">{pubkey}</p>
        <div className="w-full flex gap-x-8 mt-10">
          <ChannelCard
            value={String(numChannels || "N/A")}
            label="Active Channels"
          />
          <ChannelCard
            value={totalCapacity ? formatCapacity(+totalCapacity) : "N/A"}
            label="Total Capacity"
          />
          <ChannelCard
            value={formatLastUpdate(lastUpdate)}
            label="Last Update"
          />
        </div>
        <h2 className="text-white font-medium text-2xl mt-14 mb-4">
          Open Channels ({numChannels})
        </h2>
        <DataTable data={channels} isLoading={isLoading} />
      </div>
    </main>
  );
}
