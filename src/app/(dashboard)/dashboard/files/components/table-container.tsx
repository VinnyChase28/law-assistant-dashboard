"use client";
import { useEffect } from "react";

import { type DocumentType, type File } from "@prisma/client";

import { useFilesStore } from "src/store/store";
import { api } from "src/trpc/react";

import { columns } from "./columns";
import { DataTable } from "./data-table";

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
    if (data) {
      setFiles(data);
    }
  }, [data, setFiles]);

  const filteredFiles = files
    .filter((file: File) => file.documentType === documentType)
    .map((file) => ({
      ...file,
      fileType: file.fileType || "", // Provide default empty string if null
      blobUrl: file.blobUrl || "", // Provide default empty string if null
      fileSize: file.fileSize || "", // Provide default empty string if null
      finalReport: file.finalReport || "", // Provide default empty string if null
    }));
    
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
