"use client";
import { useFilesStore } from "src/store/store";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { UserFile } from "../page";

interface FilesClientComponentProps {
  initialFiles: UserFile[];
}

export default function FilesClientComponent({
  initialFiles,
}: FilesClientComponentProps) {
  const { files, setFiles } = useFilesStore();
  if (files.length === 0 && initialFiles.length > 0) {
    setFiles(initialFiles);
  }

  return <DataTable data={files} columns={columns} />;
}
