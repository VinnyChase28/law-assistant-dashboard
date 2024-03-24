"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "src/app/dashboard/files/components/data-table-view-options";
import { DataTableFacetedFilter } from "src/app/dashboard/files/components/data-table-faceted-filter";
import { useCheckedRowsStore } from "src/store/store";
import { statuses } from "./data";
import { LabelDialog } from "./label-dialogue";
import { api } from "src/trpc/react";
import { Separator } from "src/app/_components/ui/separator";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { uncheckAll } = useCheckedRowsStore();
  const { data: labels } = api.file.getLabels.useQuery();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter files..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("processingStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("processingStatus")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("label") && labels && (
          <DataTableFacetedFilter
            column={table.getColumn("label")}
            title="Label"
            options={labels.map((label) => ({
              label: label.text,
              value: label.id,
            }))}
          />
        )}
        <Separator orientation="vertical" className="h-6" />{" "}
        <Button
          variant="outline"
          onClick={uncheckAll} // Assuming uncheckAll is a function to unset all checks
          className="h-8 px-2 lg:px-3"
        >
          Uncheck All
        </Button>
        <LabelDialog />
        {/* Consider adding additional filters based on your schema here */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
