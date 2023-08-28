export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute inset-0 h-full w-full bg-slate-800 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="h-screen relative w-screen px-4">{children}</div>
    </>
  );
}
