'use client'
import { Text } from "@tremor/react";
import AddFiles from "@/components/input/add-files-button";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { useFilesStore } from "src/store/store";


export default async function Files() {
  const { files } = useFilesStore();
  return (
    <main>
      <Text className="ml-10 pt-5 text-3xl font-bold">My Files</Text>
      <div className="my-5 flex justify-center">
        <AddFiles />
      </div>
      <DataTable data={files} columns={columns} />
    </main>
  );
}
