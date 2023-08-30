import { ChannelInfoResponse } from "@/components/data-table";
import { useQuery } from "react-query";

async function fetchChannels(
  pubkey: string | undefined,
  pageIndex: number
): Promise<ChannelInfoResponse> {
  const res = await fetch(
    `/api/getChannelList?pubkey=${pubkey}&pageIndex=${pageIndex}`
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return await res.json();
}

export function useChannelList(pubkey: string | undefined, pageIndex: number) {
  return useQuery(
    ["getChannelList", pubkey, pageIndex],
    () => fetchChannels(pubkey, pageIndex),
    { enabled: Boolean(pubkey) }
  );
}
