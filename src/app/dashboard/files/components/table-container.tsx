"use client";
import { useEffect } from "react";
import { DataTable } from "src/app/dashboard/files/components/data-table";
import { columns } from "src/app/dashboard/files/components/columns";
import { api } from "src/trpc/react";
import { DocumentType } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilesStore } from "src/store/store";


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
      <div className="flex max-w-7xl flex-col items-center justify-center space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    );
  }

  return <DataTable data={filteredFiles} columns={columns} />;
}

