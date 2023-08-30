type MainSearchProps = {
  value: string;
  setValue: (value: string) => void;
};

export function MainSearch({ value, setValue }: MainSearchProps) {
  return (
    <div className="relative flex flex-col mt-10 sm:mt-16 w-full sm:flex-row">
      <div className="relative w-full">
        <input
          className="w-full text-lg text-slate-900 px-4 sm:pl-12 rounded sm:rounded-r-none py-2 border"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter a node pubkey"
        />
        <span className="hidden sm:inline absolute top-1/2 -translate-y-1/2 left-3 text-xl">
          🔍
        </span>
      </div>
      <button
        className="px-8 mt-2 py-2 sm:mt-0 bg-blue-500 text-white rounded sm:rounded-l-none text-lg"
        type="submit"
      >
        Search
      </button>
    </div>
  );
}
