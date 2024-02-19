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
  blobUrl: string | null;
  fileType: string | null;
  fileSize: string | null;
  processingStatus: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  access: "PRIVATE" | "PUBLIC" | "SHARED" | undefined;
  documentType: string | null;
}

async function getFiles() {
  const files = await api.file.getMyFiles.query();
  if (!files) {
    return [];
  }
  return files;
}

export default async function Files() {
  const files: UserFile[] = await getFiles();
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
