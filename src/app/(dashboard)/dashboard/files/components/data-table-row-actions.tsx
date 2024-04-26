"use client";

import { type Label } from "@prisma/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@components/ui/dropdown-menu";

import { useFileActions } from "../hooks/use-file-actions";
import { useLabelActions } from "../hooks/use-label-actions";

interface WithId {
  id: number;
  label: Label;
}

interface DataTableRowActionsProps<TData extends WithId> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends WithId>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { viewFile, handleDelete, isDeleting } = useFileActions(
    row.original.id,
  );
  const { labels, handleAssignLabelToFile, handleRemoveLabelFromFile } =
    useLabelActions(row.original.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={viewFile}>View</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {labels?.map((label: Label) => (
              <DropdownMenuItem
                key={label.id}
                onSelect={() => {
                  handleAssignLabelToFile(label.id).catch(console.error); // Pass label.id here
                }}
              >
                {label.text}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => {
                handleRemoveLabelFromFile(row.original.id).catch(console.error);
              }}
            >
              Remove Label
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            handleDelete().catch(console.error);
          }}
        >
          {isDeleting ? "Deleting..." : "Delete"}
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}