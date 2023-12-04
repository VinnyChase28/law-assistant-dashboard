import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

import { Text } from "@tremor/react";
import AddFiles from "@/components/input/add-files-button";
import { api } from "src/trpc/server";

export const metadata: Metadata = {
  title: "Law Assistant AI",
  description: "Your own legal assistant",
};

async function getFiles() {
  const files = await api.file.getUserFiles.query();
  if (!files) {
    return [];
  }
  return files;
}

export default async function Files() {
  const files = await getFiles();
  return (
    <main className="">
      <Text className="ml-10 pt-5 text-3xl font-bold">My Files</Text>
      <div className="my-5 flex justify-center">
        <AddFiles />
      </div>
      <DataTable data={files} columns={columns} />
    </main>
  );
}
