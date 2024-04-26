import { useRouter } from "next/navigation";

import { useFilesStore } from "src/store/store";
import { api } from "src/trpc/react";

export function useFileActions(fileId: number) {
  const router = useRouter();
  const { setFileDeleting, isFileDeleting, removeFile } = useFilesStore();

  const deleteFile = api.file.deleteFile.useMutation({
    onSuccess: () => {
      setFileDeleting(fileId, false);
    },
    onError: (error: any) => {
      console.error("Error deleting file:", error);
      setFileDeleting(fileId, false);
    },
  });

  const viewFile = () => {
    router.push(`/dashboard/pdf-viewer?fileId=${fileId}`);
  };

  const handleDelete = async () => {
    setFileDeleting(fileId, true);
    await deleteFile.mutateAsync(fileId);
    removeFile(fileId);
  };

  const isDeleting = isFileDeleting(fileId);

  return { viewFile, handleDelete, isDeleting };
}
