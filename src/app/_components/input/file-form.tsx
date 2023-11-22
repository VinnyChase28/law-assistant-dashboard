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
  const companyId = api.company.getUserCompany.useQuery().data?.id;
  const createFile = api.file.insertFileMetadata.useMutation({
    onSuccess: (data) => {
      console.log("Successful file upload to postgres");
      setProcessedFiles((prev) => prev + 1);
      if (data) {
        try {
          callProcessDocument(
            data.blobUrl,
            data.id,
            data.userId,
            `company-${companyId}-index`,
            data.name,
          );
          console.log("successfully sent file to cloud function");
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputFileRef.current || !inputFileRef.current.files) {
      throw new Error("No file selected");
    }

    const files = inputFileRef.current.files;
    setTotalFiles(files.length);
    setProcessedFiles(0);

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
