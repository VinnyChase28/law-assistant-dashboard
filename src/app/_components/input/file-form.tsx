"use client";
import React, { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";
import { api } from "src/trpc/react";
import { Button } from "@/components/ui/button";
import { Icons } from "../spinner";
import { callProcessDocument } from "./helpers";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "../ui/select"; // Adjust the import path as needed

export default function UploadFiles() {
  const [totalFiles, setTotalFiles] = useState(0);
  const [processedFiles, setProcessedFiles] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [documentType, setDocumentType] = useState<any>("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const userId = api.company.getUserId.useQuery().data;
  const createFile = api.file.insertFileMetadata.useMutation();

  const processFile = async (file: File, index: number, files: FileList) => {
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
        documentType,
      },
      {
        onSuccess: async (data) => {
          console.log("Successful file metadata upload to postgres");
          setProcessedFiles((prevProcessed) => prevProcessed + 1);

          if (data) {
            try {
              await callProcessDocument(
                data.blobUrl,
                data.id,
                userId as string,
                documentType, // Pass documentType here
              );
              if (index + 1 < files.length) {
                const nextFile = files.item(index + 1);
                if (nextFile) {
                  await processFile(nextFile, index + 1, files);
                } else {
                  console.log("No more files to process");
                }
              } else {
                console.log("All files have been processed");
                window.location.reload();
              }
            } catch (error) {
              console.error(error);
            }
          }
        },
      },
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputFileRef.current || !inputFileRef.current.files || !documentType) {
      throw new Error("No file selected or document type not specified");
    }

    const files = inputFileRef.current.files;
    setTotalFiles(files.length);
    setProcessedFiles(0);
    setIsProcessing(true);

    if (files.length > 0) {
      const firstFile = files.item(0);
      if (firstFile) {
        processFile(firstFile, 0, files);
      } else {
        console.error("First file is not available");
      }
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
            <Select onValueChange={setDocumentType} value={documentType}>
              <SelectTrigger aria-label="Document type">
                <SelectValue placeholder="Select Document Type" />
              </SelectTrigger>
              <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Document Type</SelectLabel>
                    <SelectItem value="REGULATORY_FRAMEWORK">
                      Regulatory Framework
                    </SelectItem>
                    <SelectItem value="COMPLIANCE_SUBMISSION">
                      Compliance Submission
                    </SelectItem>
                  </SelectGroup>
              </SelectContent>
            </Select>
            <input
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
