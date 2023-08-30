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
        className="sm:fixed absolute top-4 left-4 flex items-center hover:text-slate-400 font-medium group text-slate-200 text-md"
        href="/"
      >
        <ArrowLeftIcon className="w-5 h-5 text-slate-200 mr-1 group-hover:text-slate-400" />
        Back to Home
      </Link>

      <div className="max-w-6xl py-20 pb-14 mx-auto bg-slate-800/50 min-h-full px-6 sm:px-10">
        <p className="text-slate-400 font-medium text-md">Lightning Node</p>
        {isLoading ? (
          <div className="h-8 my-1 w-3/4 xs:1/2 sm:w-36 bg-slate-500 animate-pulse" />
        ) : (
          <h1 className="text-white font-semibold text-4xl">
            {alias || "N/A"}
          </h1>
        )}
        <p className="text-blue-400 break-words">{pubkey}</p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 lg:gap-y-0 sm:gap-x-4 mt-10">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <ChannelCard
              value={totalCapacity ? formatCapacity(+totalCapacity) : "N/A"}
              label="Total Capacity"
              isLoading={isLoading}
            />
          </div>

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
