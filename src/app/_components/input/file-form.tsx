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
  const [progressPercentage, setProgressPercentage] = useState(0); // Updated
  const inputFileRef = useRef<HTMLInputElement>(null);
  const companyId = api.company.getUserCompany.useQuery().data?.id;

  const createFile = api.file.insertFileMetadata.useMutation();

  const processFile = async (file, index, files) => {
    const newBlob = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/file/upload",
    });

    createFile.mutate(
      {
        name: file.name,
        fileSize: file.size.toString(),
        fileType: file.type,
        blobUrl: newBlob.url,
      },
      {
        onSuccess: async (data) => {
          console.log("Successful file upload to postgres");

          setProcessedFiles((prevProcessed) => {
            const newProcessedCount = prevProcessed + 1;

            // Update progress percentage
            const newProgress = (newProcessedCount / totalFiles) * 100;
            setProgressPercentage(newProgress);

            return newProcessedCount;
          });

          if (data) {
            try {
              await callProcessDocument(
                data.blobUrl,
                data.id,
                companyId as string,
              );

              // After successful processing of the current file, process the next file
              if (index + 1 < files.length) {
                await processFile(files[index + 1], index + 1, files);
              } else {
                // All files processed
                console.log("All files have been processed");
              }
            } catch (error) {
              console.log(error);
            }
          }
        },
      },
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputFileRef.current || !inputFileRef.current.files) {
      throw new Error("No file selected");
    }

    const files = inputFileRef.current.files;
    setTotalFiles(files.length);
    setProcessedFiles(0);
    setProgressPercentage(0); // Reset progress when new upload starts

    if (files.length > 0) {
      processFile(files[0], 0, files); // Start processing the first file
    }
  };

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
        {progressPercentage > 0 && <Progress value={progressPercentage} />}
      </form>
    </>
  );
}
