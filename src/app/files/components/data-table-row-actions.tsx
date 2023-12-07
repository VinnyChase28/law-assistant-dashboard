"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "src/trpc/react";
import { useState } from "react";

// Define a type that includes an id property
interface WithId {
  id: number;
  // Include other properties as needed
}

// Update the props interface to expect a type extending WithId
interface DataTableRowActionsProps<TData extends WithId> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends WithId>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteFile = api.file.deleteFile.useMutation({
    onSuccess: () => {
      // Handle success, e.g., refresh data or show a message
    },
    onError: (error) => {
      console.error("Error deleting file:", error);
    },
  });

  const handleDelete = () => {
    setIsDeleting(true);
    deleteFile.mutate(row.original.id); // Directly using row.original.id
  };

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
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {/* DropdownMenuRadioGroup and items based on your schema */}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleDelete}>
          {isDeleting ? "Deleting..." : "Delete"}
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
