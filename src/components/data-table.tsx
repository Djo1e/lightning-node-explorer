import { formatCapacity } from "@/lib/utils";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "./icons/arrow-left";
import { PaginationButton } from "./pagination-button";
import { StatusChip } from "./status-chip";

export type ChannelInfo = {
  id: string;
  pubkey: string;
  alias: string;
  disabled?: boolean;
  capacity: number;
  shortChannelId: string;
};

export type ChannelInfoResponse = {
  channels: ChannelInfo[];
  numChannels: number;
  totalCapacity: string;
  lastUpdate: string;
  alias: string;
};

const columnHelper = createColumnHelper<ChannelInfo>();

export const columns = [
  columnHelper.accessor("alias", {
    header: "Alias",
    cell: (info) => (
      <Link
        className="capitalize text-indigo-400 underline hover:text-indigo-500"
        href={`/${info.row.original.pubkey}`}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("pubkey", {
    header: "Public Key",
    cell: (info) => (
      <div className="capitalize">{info.getValue().slice(0, 20) + "..."}</div>
    ),
  }),
  columnHelper.accessor("disabled", {
    header: "Status",
    cell: (info) => {
      const disabled = info.getValue();
      return (
        <StatusChip variant={disabled ? "error" : "success"}>
          {disabled ? "Inactive" : "Active"}
        </StatusChip>
      );
    },
  }),

  columnHelper.accessor("shortChannelId", {
    header: "Channel ID",
    cell: (info) => <div className="lowercase">{info.getValue()}</div>,
  }),
  columnHelper.accessor("capacity", {
    header: "Capacity",
    cell: (info) => (
      <div className="text-right whitespace-nowrap font-medium">
        {formatCapacity(info.getValue())}
      </div>
    ),
  }),
];

type DataTableProps = {
  data: ChannelInfo[] | undefined;
  isLoading: boolean;
};

const emptyArray: ChannelInfo[] = [];
export const PAGE_SIZE = 10;

export function DataTable({ data, isLoading }: DataTableProps) {
  const router = useRouter();
  const { page: pageQuery } = router.query;
  const page = Number(pageQuery) || 0;

  const table = useReactTable({
    data: data || emptyArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: -1,
    manualPagination: true,
  });

  function handlePageChange(direction: "next" | "prev") {
    const updatedPage = direction === "next" ? page + 1 : page - 1;

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: updatedPage },
      },
      undefined,
      { scroll: false }
    );
  }

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
                  <td key={cell.id} className="text-slate-300 py-3 w-40">
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
                  <td key={index} className="w-40 my-2 h-12" />
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div className="flex items-center text-md justify-end space-x-2 py-8">
        <div className="flex-1 text-white">Page {page + 1}</div>
        <div className="flex items-center space-x-6">
          <PaginationButton
            onClick={() => handlePageChange("prev")}
            disabled={!data || page < 1}
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Prev
          </PaginationButton>
          <PaginationButton
            onClick={() => handlePageChange("next")}
            disabled={!data || data.length < PAGE_SIZE}
          >
            Next
            <ArrowLeftIcon className="w-4 h-4 ml-1 mt-0.5 rotate-180" />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}
