import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";
import { columns } from "@/components/tables/columns";
import { DataTable } from "@/components/tables/data-table";
import { taskSchema } from "./data/schema";
import { Text } from "@tremor/react";
export const metadata: Metadata = {
  title: "CaseyAI",
  description: "An assistant for the legal industry.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/dashboard-data/tasks.json"),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function Files() {
  const tasks = await getTasks();
  return (
    <main className="">
      <Text className="ml-10 pt-5 text-3xl font-bold">My Files</Text>
      <DataTable data={tasks} columns={columns} />
    </main>
  );
}
