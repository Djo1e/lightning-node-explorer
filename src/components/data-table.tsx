import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import cn from "classnames";

export type ChannelInfo = {
  id: string;
  pubkey: string;
  alias: string;
  disabled: boolean;
  capacity: number;
  shortChannelId: string;
};

const columnHelper = createColumnHelper<ChannelInfo>();

export const columns = [
  columnHelper.accessor("alias", {
    header: "Alias",
    cell: (info) => <div className="capitalize">{info.getValue()}</div>,
  }),
  columnHelper.accessor("pubkey", {
    header: "Public Key",
    cell: (info) => (
      <div className="capitalize">{info.getValue().slice(0, 20) + "..."}</div>
    ),
  }),
  columnHelper.accessor("disabled", {
    header: "Status",
    cell: (info) => (
      <div className="capitalize">{JSON.stringify(info.getValue())}</div>
    ),
  }),

  columnHelper.accessor("shortChannelId", {
    header: "Channel ID",
    cell: (info) => <div className="lowercase">{info.getValue()}</div>,
  }),
  columnHelper.accessor("capacity", {
    header: "Capacity",
    cell: (info) => (
      <div className="text-right font-medium">
        {JSON.stringify(info.getValue())}
      </div>
    ),
  }),
];

type DataTableProps = {
  data: ChannelInfo[] | undefined;
  isLoading: boolean;
};

const emptyArray: ChannelInfo[] = [];

export function DataTable({ data, isLoading }: DataTableProps) {
  const table = useReactTable({
    data: data || emptyArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <th
                    className={cn(
                      "font-medium text-white py-3 text-lg",
                      headerGroup.headers.length - 1 === index
                        ? "text-right"
                        : "text-left"
                    )}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        {!isLoading && (
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-slate-300 py-2 w-40">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
        {isLoading && (
          <tbody>
            {[...new Array(10)].map((_, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "animate-pulse bg-slate-600"
                    : "animate-pulse bg-slate-700"
                }
              >
                {[...new Array(5)].map((_, index) => (
                  <td key={index} className="w-40 my-2 h-10" />
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {/* <div className="flex items-center justify-end space-x-2 py-4"> */}
      {/*   <div className="flex-1 text-sm text-white"> */}
      {/*     {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
      {/*     {table.getFilteredRowModel().rows.length} row(s) selected. */}
      {/*   </div> */}
      {/*   <div className="space-x-2"> */}
      {/*     <button */}
      {/*       className="text-white" */}
      {/*       onClick={() => table.previousPage()} */}
      {/*       disabled={!table.getCanPreviousPage()} */}
      {/*     > */}
      {/*       Previous */}
      {/*     </button> */}
      {/*     <button */}
      {/*       className="text-white" */}
      {/*       onClick={() => table.nextPage()} */}
      {/*       disabled={!table.getCanNextPage()} */}
      {/*     > */}
      {/*       Next */}
      {/*     </button> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  );
}
