import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type ChannelInfo = {
  id: string;
  pubkey: string;
  alias: string;
  disabled: boolean;
  capacity: number;
  shortChannelId: string;
};

const data: ChannelInfo[] = [
  {
    id: "m5gr84i9",
    pubkey: "1234567890",
    alias: "hello",
    disabled: false,
    capacity: 316,
    shortChannelId: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    alias: "hello",
    pubkey: "1234567890",
    disabled: false,
    capacity: 242,
    shortChannelId: "ken99@yahoo.com",
  },
  {
    id: "derv1ws0",
    alias: "hello",
    pubkey: "1234567890",
    disabled: false,
    capacity: 837,
    shortChannelId: "ken99@yahoo.com",
  },
  {
    id: "5kma53ae",
    alias: "hello",
    pubkey: "1234567890",
    disabled: false,
    capacity: 874,
    shortChannelId: "ken99@yahoo.com",
  },
  {
    id: "bhqecj4p",
    alias: "hello",
    pubkey: "1234567890",
    disabled: false,
    capacity: 721,
    shortChannelId: "ken99@yahoo.com",
  },
];

export const columns: ColumnDef<ChannelInfo>[] = [
  {
    accessorKey: "alias",
    header: "Alias",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("alias")}</div>
    ),
  },
  {
    accessorKey: "pubkey",
    header: "PubKey",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("pubkey")}</div>
    ),
  },
  {
    accessorKey: "disabled",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {JSON.stringify(row.getValue("disabled"))}
      </div>
    ),
  },
  {
    accessorKey: "shortChannelId",
    header: () => "Channel ID",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("shortChannelId")}</div>
    ),
  },
  {
    accessorKey: "capacity",
    header: () => <div className="text-right">Capacity</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("capacity")}</div>
      );
    },
  },
];

export function DataTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className="font-medium text-white text-left py-3 text-lg"
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
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-slate-300 py-2 w-40">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-white">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <button
            className="text-white"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="text-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
