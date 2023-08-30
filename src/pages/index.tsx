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
    <main className="px-4">
      <form
        className="relative flex justify-center items-center flex-col max-w-md mx-auto sm:max-w-xl lg:max-w-2xl 2xl:max-w-4xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white text-3xl [@media(min-width:400px)]:text-4xl font-semibold pt-20 sm:pt-40 text-center">
          Explore the Lightning network&nbsp;⚡
        </h1>
        <MainSearch value={search} setValue={(value) => setSearch(value)} />
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full px-8 mt-6 sm:mt-10 gap-x-6 gap-y-2">
          <Badge>River Financials</Badge>
          <Badge>Kraken 🐙⚡</Badge>
          <Badge>bfx-lnd1</Badge>
          <div className="sm:col-span-3 flex flex-col sm:flex-row justify-center gap-y-2 gap-x-6">
            <Badge>WalletOfSatoshi.com</Badge>
            <Badge>The Bitcoin Company</Badge>
          </div>
        </div>
      </form>
    </main>
  );
}
