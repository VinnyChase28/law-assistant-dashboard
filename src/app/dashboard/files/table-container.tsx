"use client";

import { useEffect } from "react";
import { useFilesStore } from "src/store/store";
import { DataTable } from "src/app/dashboard/files/components/data-table";
import { columns } from "src/app/dashboard/files/components/columns";
import { api } from "src/trpc/react";

export default function TableContainer() {
  const { setFiles } = useFilesStore();

  // TODO: move retching to websockets when we scalead
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
