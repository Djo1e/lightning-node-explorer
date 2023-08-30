import { useQuery } from "react-query";

async function fetchPopularNodes(): Promise<{ popularNodes: string[] }> {
  const res = await fetch(`/api/getPopularNodes`);
  return await res.json();
}

export function usePopularNodes() {
  return useQuery(["getPopularNodes"], () => fetchPopularNodes());
}
