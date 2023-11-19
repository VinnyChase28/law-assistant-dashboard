import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { myFilesSchema } from "./data/schema";
import { Text } from "@tremor/react";
import AddFiles from "@/components/input/add-files-button";

export const metadata: Metadata = {
  title: "CaseyAI",
  description: "An assistant for the legal industry.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/files/data/files.json"),
  );
  const tasks = JSON.parse(data.toString());
  return z.array(myFilesSchema).parse(tasks);
}

export default async function Files() {
  const tasks = await getTasks();
  return (
    <main className="">
      <Text className="ml-10 pt-5 text-3xl font-bold">My Files</Text>
      <div className="my-5 flex justify-center">
        <AddFiles />
      </div>
      <DataTable data={tasks} columns={columns} />
    </main>
  );
}
