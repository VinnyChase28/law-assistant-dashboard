import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";
import { columns } from "./dashboard/components/columns";
import { DataTable } from "./dashboard/components/data-table";
import { taskSchema } from "./dashboard/data/schema";
import Charts from "./dashboard/components/charts/charts";
import { Text } from "@tremor/react";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/dashboard/data/tasks.json"),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function DashboardPage() {
  const tasks = await getTasks();

  return (
    <>
      <Text className="ml-10 pt-5 text-3xl font-bold">Dashboard</Text>
      <Tabs defaultValue="overview" className="w-full p-5">
        <TabsList className="ml-8 border-b-2 border-gray-300">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="genaiDocs">GenAi Docs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Charts />
        </TabsContent>

        <TabsContent value="genaiDocs">
          {/* Display GenAi docs in a table */}
          <DataTable data={tasks} columns={columns} />
        </TabsContent>
      </Tabs>
    </>
  );
}
