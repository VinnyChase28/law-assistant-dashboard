"use client";

import { useEffect } from "react";
import { useFilesStore } from "src/store/store";
import { DataTable } from "../../_components/tables/data-table";
import { columns } from "../../_components/tables/columns";
import { api } from "src/trpc/react";

export default function FilesClientComponent() {
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
