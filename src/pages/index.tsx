import { PopularNodeBadge } from "@/components/popular-node-badge";
import { MainSearch } from "@/components/main-search";
import { usePopularNodes } from "@/lib/api/use-popular-nodes";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const { data, isLoading } = usePopularNodes();
  const popularNodes = data?.popularNodes.slice(0, 5);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/${search}`);
  }

  return (
    <main className="px-4 py-20 sm:pt-40">
      <form
        className="relative flex justify-center items-center flex-col max-w-md mx-auto sm:max-w-xl md:max-w-2xl 2xl:max-w-4xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white text-3xl [@media(min-width:400px)]:text-4xl font-semibold text-center">
          Explore the Lightning network&nbsp;⚡
        </h1>
        <MainSearch value={search} setValue={(value) => setSearch(value)} />

        {popularNodes && !isLoading && (
          <>
            <div className="flex items-center w-full mt-20 px-4">
              <div className="mx-auto h-px w-full bg-gradient-to-l from-slate-400" />
              <p className="text-slate-300 text-sm text-center whitespace-nowrap px-2">
                Popular Nodes
              </p>
              <div className="mx-auto h-px w-full bg-gradient-to-r from-slate-400" />
            </div>

            <div className="grid grid-cols-1 [@media(min-width:480px)]:grid-cols-2 justify-items-center sm:grid-cols-3 w-full px-4 mt-2 gap-x-6 gap-y-2">
              {popularNodes.slice(0, 3).map((pubkey) => (
                <PopularNodeBadge key={pubkey} pubkey={pubkey} />
              ))}
              <div className="sm:col-span-3 flex flex-col sm:flex-row justify-center gap-y-2 gap-x-6">
                {popularNodes.slice(3).map((pubkey) => (
                  <PopularNodeBadge key={pubkey} pubkey={pubkey} />
                ))}{" "}
              </div>
            </div>
          </>
        )}
      </form>
    </main>
  );
}
