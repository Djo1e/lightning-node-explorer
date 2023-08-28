import { Badge } from "@/components/badge";
import { MainSearch } from "@/components/main-search";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/${search}`);
  }

  return (
    <main>
      <form
        className="relative flex justify-center items-center flex-col"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white text-4xl font-semibold pt-40 text-center">
          Explore the Lightning network ⚡
        </h1>
        <MainSearch value={search} setValue={(value) => setSearch(value)} />
        <div className="grid grid-cols-3 mt-8 gap-x-6">
          <Badge>River Financials</Badge>
          <Badge>Kraken 🐙⚡</Badge>
          <Badge>bfx-lnd1</Badge>
          <div className="col-span-3 flex justify-center gap-x-6">
            <Badge>WalletOfSatoshi.com</Badge>
            <Badge>The Bitcoin Company</Badge>
          </div>
        </div>
      </form>
    </main>
  );
}
