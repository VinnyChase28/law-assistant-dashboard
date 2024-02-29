"use client";

import { useEffect } from "react";
import { useFilesStore } from "src/store/store";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { api } from "src/trpc/react";

export default function FilesClientComponent() {
  const { setFiles } = useFilesStore();

  // Use the useQuery hook to fetch files. Assuming 'api.file.getMyFiles' is your tRPC query.
  const { data: files } = api.file.getMyFiles.useQuery(
    {
      documentTypes: ["REGULATORY_FRAMEWORK", "COMPLIANCE_SUBMISSION"],
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
