"use client";
import { useFilesStore } from "src/store/store";
import { DataTable } from "./data-table";
import { columns } from "./columns";

import { useEffect } from "react";


export default function FilesClientComponent({ initialFiles }: any) {
  const { files, setFiles } = useFilesStore();

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles, setFiles]);

  return <DataTable data={files} columns={columns} />;
}
