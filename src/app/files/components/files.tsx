"use client";
import { useFilesStore } from "src/store/store";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { UserFile } from "../page";
import { useEffect } from "react";

interface FilesClientComponentProps {
  initialFiles: UserFile[];
}

export default function FilesClientComponent({
  initialFiles,
}: FilesClientComponentProps) {
  const { files, setFiles } = useFilesStore();

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles, setFiles]);

  return <DataTable data={files} columns={columns} />;
}
