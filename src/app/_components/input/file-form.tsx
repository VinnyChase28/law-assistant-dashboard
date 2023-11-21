'use client'
import React, { useState, useRef } from 'react';
import { upload } from "@vercel/blob/client";
import { api } from "src/trpc/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { callProcessDocument } from "./helpers";

export default function UploadFiles() {
  const [totalFiles, setTotalFiles] = useState(0);
  const [processedFiles, setProcessedFiles] = useState(0);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const createFile = api.file.insertFileMetadata.useMutation({
    onSuccess: (data) => {
      console.log("Successful file upload to postgres");
      setProcessedFiles((prev) => prev + 1); // Increment the count of processed files
      // Trigger the process_document function as a background task

      data && callProcessDocument(data.blobUrl, data.id); // Assuming 'data' has 'blobUrl' and 'id'
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputFileRef.current || !inputFileRef.current.files) {
      throw new Error("No file selected");
    }

    const files = inputFileRef.current.files;
    setTotalFiles(files.length); // Set the total number of files
    setProcessedFiles(0); // Reset processed files count for new upload

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const newBlob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/file/upload",
        });
        createFile.mutate({
          name: file.name,
          fileSize: file.size.toString(),
          fileType: file.type,
          blobUrl: newBlob.url,
        });
      }
    }
  };

  const progressPercentage =
    totalFiles > 0 ? (processedFiles / totalFiles) * 100 : 0;

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <Input
          className="pt-2"
          name="file"
          ref={inputFileRef}
          type="file"
          required
          multiple
        />
        <Button type="submit">Upload</Button>
        {progressPercentage > 0 ? (
          <Progress value={progressPercentage} />
        ) : null}
      </form>
    </>
  );
}
