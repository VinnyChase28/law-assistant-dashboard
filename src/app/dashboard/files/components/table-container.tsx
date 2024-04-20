"use client";
import { useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
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
      <div
        role="status"
        className="w-full animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-10  shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
      >
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="mb-2.5 h-2.5 w-3/4 rounded-full"></div>
            <div className="h-2 w-11/12 rounded-full "></div>
          </div>
        </div>
        {/* Duplicate the skeleton rows as needed */}
        <div className="flex items-center justify-between pt-4">
          <div className="w-full">
            <div className="mb-2.5 h-2.5 w-3/4 rounded-full"></div>
            <div className="rounded-full0 h-2 w-11/12"></div>
          </div>
        </div>
        {/* Add more skeleton rows as needed */}
        <div className="flex items-center justify-between pt-4">
          <div className="w-full">
            <div className="mb-2.5 h-2.5 w-3/4 rounded-full"></div>
            <div className="h-2 w-11/12 rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="w-full">
            <div className="mb-2.5 h-2.5 w-3/4 rounded-full"></div>
            <div className="h-2 w-11/12 rounded-full"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return <DataTable data={filteredFiles} columns={columns} />;
}
