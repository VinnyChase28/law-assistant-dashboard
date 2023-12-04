"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { File } from "../data/schema";
import { DataTableColumnHeader } from "@/components/tables/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { useCheckedRowsStore } from "src/store/store";
export const columns: ColumnDef<File>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const { checkedRows } = useCheckedRowsStore();
      const allRows = table.getPrePaginationRowModel().rows;
      const isAllSelected = allRows.every((row) =>
        checkedRows.has(row.original.id),
      );

      return (
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={(value) => {
            allRows.forEach((row) => {
              useCheckedRowsStore.getState().toggleRow(row.original.id);
            });
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      );
    },
    cell: ({ row }) => {
      const { checkedRows, toggleRow } = useCheckedRowsStore();
      return (
        <Checkbox
          checked={checkedRows.has(row.original.id)}
          onCheckedChange={() => toggleRow(row.original.id)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="truncate">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "fileType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("fileType")}</div>,
  },
  {
    accessorKey: "fileSize",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File Size" />
    ),
    cell: ({ row }) => <div>{row.getValue("fileSize")}</div>,
  },
  {
    accessorKey: "processingStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("processingStatus")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
