"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";
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
import { useFilesStore } from "src/store/store";
import { useRouter } from "next/navigation";

interface WithId {
  id: number;
}

interface DataTableRowActionsProps<TData extends WithId> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends WithId>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const { setFileDeleting, isFileDeleting, removeFile } = useFilesStore();
  const deleteFile = api.file.deleteFile.useMutation({
    onSuccess: () => {
      setFileDeleting(row.original.id, false);
    },
    onError: (error) => {
      console.error("Error deleting file:", error);
      setFileDeleting(row.original.id, false);
    },
  });

  const {
    data: labels,
    isLoading: isLoadingLabels,
    refetch,
  } = api.file.getLabels.useQuery();
  const assignLabel = api.file.assignLabel.useMutation();

  const handleLabelAssignment = async (labelId: string) => {
    await assignLabel.mutateAsync({
      fileId: row.original.id,
      labelId,
    });
  };

  const removeLabel = api.file.removeLabel.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleLabelRemoval = async () => {
    await removeLabel.mutateAsync({
      fileId: row.original.id,
    });
  };

  const viewFile = () => {
    router.push(`/dashboard/pdf-viewer?fileId=${row.original.id}`);
  };

  const handleDelete = async () => {
    setFileDeleting(row.original.id, true);
    await deleteFile.mutateAsync(row.original.id);
    removeFile(row.original.id);
  };

  const isDeleting = isFileDeleting(row.original.id);

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
            {labels?.map((label) => (
              <DropdownMenuItem
                key={label.id}
                onSelect={() => handleLabelAssignment(label.id)}
              >
                {label.text}
              </DropdownMenuItem>
            ))}
            {/* @ts-expect-error */}
            {row.original.label && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLabelRemoval}>
                  Remove Label
                </DropdownMenuItem>
              </>
            )}
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
