'use client'
import React, { useState, useRef } from 'react';
import { upload } from "@vercel/blob/client";
import { api } from "src/trpc/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "../spinner";
import { callProcessDocument } from "./helpers";

export default function UploadFiles() {
  const [totalFiles, setTotalFiles] = useState(0);
  const [processedFiles, setProcessedFiles] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false); // New state to track processing
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

          setProcessedFiles((prevProcessed) => prevProcessed + 1);

          if (data) {
            try {
              await callProcessDocument(
                data.blobUrl,
                data.id,
                companyId as string,
              );

              if (index + 1 < files.length) {
                await processFile(files[index + 1], index + 1, files);
              } else {
                console.log("All files have been processed");
                setIsProcessing(false); // Stop showing the spinner
                window.location.reload();
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
    setIsProcessing(true); // Start showing the spinner

    if (files.length > 0) {
      processFile(files[0], 0, files);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center">
            <Icons.spinner className="h-8 w-8 animate-spin" />
            <p>Please wait. Memorizing your documents...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            <Input
              className="pt-2"
              name="file"
              ref={inputFileRef}
              type="file"
              required
              multiple
            />
            <Button type="submit">Upload</Button>
          </div>
        )}
      </form>
    </>
  );
}
