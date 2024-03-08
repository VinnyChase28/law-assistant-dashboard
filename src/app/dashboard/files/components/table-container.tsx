"use client";
import { useEffect } from "react";
import { useFilesStore } from "src/store/store";
import { DataTable } from "src/app/dashboard/files/components/data-table";
import { columns } from "src/app/dashboard/files/components/columns";
import { api } from "src/trpc/react";
import { DocumentType } from "@prisma/client";

export default function TableContainer({
  documentType,
}: {
  documentType: DocumentType;
}) {
  const { setFiles } = useFilesStore();

  const { data: files } = api.file.getMyFiles.useQuery(
    {
      documentTypes: [documentType],
    },
    {
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchInterval: 10000,
    },
  );

  useEffect(() => {
    if (files) {
      setFiles(files);
    }
  }, [files, setFiles]);

  return (
    <DataTable data={useFilesStore((state) => state.files)} columns={columns} />
  );
}