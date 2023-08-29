import { ChannelInfoResponse } from "@/components/data-table";
import { useQuery } from "react-query";

async function fetchChannels(pubkey: string): Promise<ChannelInfoResponse> {
  const res = await fetch(`/api/getChannelList?pubkey=${pubkey}`);
  return await res.json();
}

export function useChannelList(pubkey: string) {
  return useQuery(["getChannelList", pubkey], () => fetchChannels(pubkey));
}
