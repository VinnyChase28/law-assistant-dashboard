import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema } from "./data/schema";
import Charts from "./components/charts/charts";
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
      <div
        className="main-container"
        style={{
          paddingTop:
            "64px" /* Adjust this value based on your Navbar height */,
          paddingLeft:
            "64px" /* Adjust this value based on your Sidebar width */,
        }}
      >
        <Text className="p-3 text-3xl font-bold">Dashboard</Text>
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="border-b-2 border-gray-300">
            <TabsTrigger value="notifications">Control Center</TabsTrigger>
            <TabsTrigger value="genaiDocs">GenAi Docs</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications">
            <Charts />
          </TabsContent>

          <TabsContent value="genaiDocs">
            {/* Display GenAi docs in a table */}
            <DataTable data={tasks} columns={columns} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
