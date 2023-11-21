import { Metadata } from "next";
import { z } from "zod";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

import { Text } from "@tremor/react";
import AddFiles from "@/components/input/add-files-button";
import { api } from "src/trpc/server";
import { getServerAuthSession } from "src/server/auth";
export const metadata: Metadata = {
  title: "CaseyAI",
  description: "An assistant for the legal industry.",
};

async function getFiles() {
  const files = await api.file.getUserFiles.query();
  if (!files) {
    return [];
  }
  console.log(files);
  return files;
}

export default async function Files() {
  const session = await getServerAuthSession();
  if (!session?.user) return <h1>Loading...</h1>;
  else {
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
}
