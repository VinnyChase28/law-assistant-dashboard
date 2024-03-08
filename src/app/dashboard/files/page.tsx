import { type Metadata } from "next";

import { Text } from "@tremor/react";
import AddFiles from "@/components/input/add-files";
import TableContainer from "./table-container";

export const metadata: Metadata = {
  title: "Add Files",
  description: "Add files to your account",
};

export default async function Files() {
  return (
    <main>
      <Text className="ml-10 pt-5 text-3xl font-bold">My Files</Text>
      <div className="my-5 flex justify-center">
        <AddFiles />
      </div>
      <TableContainer />
    </main>
  );
}
