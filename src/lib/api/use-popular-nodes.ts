import { useQuery } from "react-query";

async function fetchPopularNodes(): Promise<{ popularNodes: string[] }> {
  const res = await fetch(`/api/getPopularNodes`);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return await res.json();
}

export function usePopularNodes() {
  return useQuery(["getPopularNodes"], () => fetchPopularNodes());
}
