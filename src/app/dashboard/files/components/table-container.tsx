"use client";
import { useEffect } from "react";
import { DataTable } from "src/app/dashboard/files/components/data-table";
import { columns } from "src/app/dashboard/files/components/columns";
import { api } from "src/trpc/react";
import { DocumentType } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilesStore } from "src/store/store";
import { IconSpinner } from "src/app/_components/ui/icons";

export default function TableContainer({
  documentType,
}: {
  documentType: DocumentType;
}) {
  const { files, setFiles } = useFilesStore();
  const { data, isLoading } = api.file.getMyFiles.useQuery(
    {},
    {
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchInterval: 10000,
    },
  );

  useEffect(() => {
    // Set files in store on component mount or when data changes
    if (data) {
      setFiles(data);
    }
  }, [data, setFiles]);

  const filteredFiles = files.filter(
    (file: any) => file.documentType === documentType,
  );

  if (isLoading) {
    return (
      <div className="items-center">
        <IconSpinner />
      </div>
    );
  }

  return <DataTable data={filteredFiles} columns={columns} />;
}

