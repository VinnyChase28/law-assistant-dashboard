import { Metadata } from "next";


import { Text } from "@tremor/react";
import AddFiles from "@/components/input/add-files-button";
import { api } from "src/trpc/server";
import FilesClientComponent from "./components/files";

export const metadata: Metadata = {
  title: "Add Files",
  description: "Add files to your account",
};



async function getFiles() {
  const files = await api.file.getMyFiles.query({
    documentTypes: ["REGULATORY_FRAMEWORK", "COMPLIANCE_SUBMISSION"],
  });
  if (!files) {
    return [];
  }
  return files;
}

export default async function Files() {
  const files = await getFiles();
  return (
    <main>
      <Text className="ml-10 pt-5 text-3xl font-bold">My Files</Text>
      <div className="my-5 flex justify-center">
        <AddFiles />
      </div>
      <FilesClientComponent initialFiles={files} />
    </main>
  );
}
