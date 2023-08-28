import { DataTable } from "@/components/data-table";

export default function Pubkey() {
  return (
    <main className="h-full">
      <div className="max-w-6xl py-10 mx-auto bg-slate-800 min-h-full px-10">
        <p className="text-slate-400 font-medium text-md">Lightning Node</p>
        <h1 className="text-white font-semibold text-4xl">Binance</h1>
        <p className="text-blue-400">
          03a1f3afd646d77bdaf545cceaf079bab6057eae52c6319b63b5803d0989d6a72f
        </p>
        <h2 className="text-white font-medium text-2xl mt-10 mb-3">
          Open Channels
        </h2>
        <DataTable />
      </div>
    </main>
  );
}
