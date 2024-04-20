"use client";

import { type ColumnDef, type Table, type Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { type File } from "./schema";
import { DataTableColumnHeader } from "src/app/(dashboard)/dashboard/files/components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { useCheckedRowsStore } from "src/store/store";
import { statuses, documentTypes } from "./data";
import { api } from "src/trpc/react";

interface SelectAllCheckboxHeaderProps {
  table: Table<File>;
}

const SelectAllCheckboxHeader = ({ table }: SelectAllCheckboxHeaderProps) => {
  const checkedRows = useCheckedRowsStore((state) => state.checkedRows);
  const allRows = table.getPrePaginationRowModel().rows;
  const isAllSelected = allRows.every((row) => checkedRows[row.original.id]);

  return (
    <Checkbox
      checked={isAllSelected}
      onCheckedChange={() => {
        allRows.forEach((row) => {
          useCheckedRowsStore.getState().toggleRow(row.original.id);
        });
      }}
      aria-label="Select all"
      className="translate-y-[2px]"
    />
  );
};

// Custom Cell Component
const CheckboxCell = ({ row }: { row: Row<File> }) => {
  const { checkedRows, toggleRow } = useCheckedRowsStore();
  return (
    <Checkbox
      checked={!!checkedRows[row.original.id]}
      onCheckedChange={() => toggleRow(row.original.id)}
      aria-label="Select row"
      className="translate-y-[2px]"
    />
  );
};

export const columns: ColumnDef<File>[] = [
  {
    id: "select",
    header: SelectAllCheckboxHeader,
    cell: ({ row }) => <CheckboxCell row={row} />,
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
  // {
  //   accessorKey: "fileType",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="File Type" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("fileType")}</div>,
  // },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Label" />
    ),
    cell: ({ row }) => {
      //@ts-expect-error label type is not defined in the schema

      const label = row.original.label;
      return <div>{label ? label.text : ""}</div>;
    },
    filterFn: (row, id, value) => {
      //@ts-expect-error  //label type is not defined in the schema
      const label = row.original.label;
      return value.includes(label?.id || "");
    },
  },
  {
    accessorKey: "documentType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const documentType = documentTypes.find(
        (documentType) => documentType.value === row.getValue("documentType"),
      );

      if (!documentType) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {documentType.icon && (
            <documentType.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{documentType.label}</span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "fileSize",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="File Size" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("fileSize")}</div>,
  // },
  {
    accessorKey: "processingStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("processingStatus"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
