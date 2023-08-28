import { Badge } from "@/components/badge";
import { MainSearch } from "@/components/main-search";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  function handleSubmit() {}

  return (
    <>
      <div className="absolute inset-0 h-full w-full bg-slate-800 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <main className="h-screen relative w-screen px-4">
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
    </>
  );
}
