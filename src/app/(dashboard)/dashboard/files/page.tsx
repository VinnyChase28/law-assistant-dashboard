import { type Metadata } from "next";
import { Text } from "@tremor/react";
import TabbedTables from "./components/tabbed-tables";

export const metadata: Metadata = {
  title: "Add Files",
  description: "Add files to your account",
};

export default async function FilesPage() {
  return (
    <main>
      <Text className="ml-10 pt-5 text-3xl font-bold">My Files</Text>
      <TabbedTables />
    </main>
  );
}
