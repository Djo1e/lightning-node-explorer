import { ChannelInfoResponse } from "@/components/data-table";
import { useQuery } from "react-query";

async function fetchChannels(): Promise<ChannelInfoResponse> {
  const res = await fetch(`/api/getChannelList`);
  return await res.json();
}

export function useChannelList() {
  return useQuery(["getChannelList"], () => fetchChannels());
}
