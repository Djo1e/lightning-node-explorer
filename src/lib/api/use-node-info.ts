import { GetNodeInfoResponseType } from "@/pages/api/getNodeInfo";
import { useQuery } from "react-query";

async function fetchNodeInfo(
  pubkey: string | undefined
): Promise<GetNodeInfoResponseType> {
  const res = await fetch(`/api/getNodeInfo?pubkey=${pubkey}`);
  return await res.json();
}

export function useNodeInfo(pubkey: string | undefined) {
  return useQuery(["getNodeInfo", pubkey], () => fetchNodeInfo(pubkey), {
    enabled: Boolean(pubkey),
  });
}
