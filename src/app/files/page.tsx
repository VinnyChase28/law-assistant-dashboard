import { Metadata } from "next";


import { Text } from "@tremor/react";
import AddFiles from "@/components/input/add-files-button";
import { api } from "src/trpc/server";
import FilesClientComponent from "./components/files";

export const metadata: Metadata = {
  title: "Add Files",
  description: "Add files to your account",
};

export interface UserFile {
  id: number;
  name: string;
  blobUrl: string;
  fileType: string;
  fileSize: string;
  processingStatus: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  userId: string;
  access: string;
  documentType: string | null;
}
async function getFiles() {
  const files = await api.file.getUserFiles.query();
  if (!files) {
    return [];
  }
  return files;
}

export default async function Files() {
  const files: UserFile[] = await getFiles(); // Use the custom UserFile type
  console.debug(files);
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
