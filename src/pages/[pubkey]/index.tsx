import { ChannelCard } from "@/components/channel-card";
import { DataTable } from "@/components/data-table";
import { ArrowLeftIcon } from "@/components/icons/arrow-left";
import { useChannelList } from "@/lib/api/use-channel-list";
import { formatCapacity } from "@/lib/utils";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";

function formatLastUpdate(lastUpdate: string | undefined) {
  return lastUpdate
    ? ` ${formatDistance(new Date(lastUpdate), new Date(), {
        addSuffix: true,
      })}`
    : "N/A";
}

export default function Pubkey() {
  const router = useRouter();
  const { pubkey, page = 0 } = router.query;

  const { data, isLoading } = useChannelList(
    pubkey as string | undefined,
    Number(page)
  );
  const { totalCapacity, numChannels, lastUpdate, alias, channels } =
    data || {};

  return (
    <main className="relative h-full">
      <Link
        className="fixed top-4 left-4 flex items-center hover:text-slate-400 font-medium group text-slate-200 text-md"
        href="/"
      >
        <ArrowLeftIcon className="w-5 h-5 text-slate-200 mr-1 group-hover:text-slate-400" />
        Back to Home
      </Link>

      <div className="max-w-6xl py-10 sm:py-20 mx-auto bg-slate-800/50 min-h-full px-10">
        <p className="text-slate-400 font-medium text-md">Lightning Node</p>
        {isLoading ? (
          <div className="h-8 my-1 w-36 bg-slate-500 animate-pulse" />
        ) : (
          <h1 className="text-white font-semibold text-4xl">{alias}</h1>
        )}
        <p className="text-blue-400">{pubkey}</p>
        <div className="w-full flex gap-x-8 mt-10">
          <ChannelCard
            value={totalCapacity ? formatCapacity(+totalCapacity) : "N/A"}
            label="Total Capacity"
            isLoading={isLoading}
          />

          <ChannelCard
            value={String(numChannels || "N/A")}
            label="Active Channels"
            isLoading={isLoading}
          />
          <ChannelCard
            value={formatLastUpdate(lastUpdate)}
            label="Last Update"
            isLoading={isLoading}
          />
        </div>
        <h2 className="text-white font-medium text-2xl mt-14 mb-4">
          {isLoading ? "Open Channels" : `Open Channels (${numChannels})`}
        </h2>
        <DataTable data={channels} isLoading={isLoading} />
      </div>
    </main>
  );
}
