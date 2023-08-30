import { useNodeInfo } from "@/lib/api/use-node-info";
import classNames from "classnames";
import Link from "next/link";

type PopularNodeBadge = {
  pubkey: string | undefined;
};

export function PopularNodeBadge({ pubkey }: PopularNodeBadge) {
  const { data, isLoading } = useNodeInfo(pubkey);

  return (
    <Link
      href={`/${pubkey}`}
      className={classNames(
        "mt-4 w-44 h-12 flex flex-col items-center justify-center transition ease-in-out delay-50 hover:shadow-lg hover:brightness-[102%] hover:shadow-slate-700 whitespace-nowrap shadow-md shadow-slate-700 rounded-md text-center bg-blue-100 px-4 py-1 text-sm font-bold text-indigo-500 ring-1 ring-inset ring-blue-700/10",
        { "animate-pulse": isLoading }
      )}
    >
      {data?.nodeInfo.alias}
      <span className="text-slate-600 font-normal mt-0.5 text-xs">
        {data?.nodeInfo?.numChannels} channels
      </span>
    </Link>
  );
}
