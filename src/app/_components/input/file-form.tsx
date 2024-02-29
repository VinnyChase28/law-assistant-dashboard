"use client";

import React, { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";
import { api } from "src/trpc/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "../ui/select";
import AlertComponent from "../alert";
import { useToast } from "../ui/use-toast";

type DocumentType = "REGULATORY_FRAMEWORK" | "COMPLIANCE_SUBMISSION";

interface UploadFilesProps {
  setIsDialogOpen: (isOpen: boolean) => void;
}

export default function UploadFiles({ setIsDialogOpen }: UploadFilesProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const [documentType, setDocumentType] = useState<DocumentType>(
    "REGULATORY_FRAMEWORK",
  );
  const inputFileRef = useRef<HTMLInputElement>(null);
  const insertFileMetadata = api.file.insertFileMetadata.useMutation();
  const sendDocumentDataForProcessingToInngest =
    api.llm.sendDocumentDataForProcessingToInngest.useMutation();

  const uploadFiles = async (files: FileList) => {
    const uploadPromises = Array.from(files).map(async (file) => {
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload-file",
      });

      // Insert file metadata for each file
      return insertFileMetadata.mutateAsync({
        name: file.name,
        fileSize: file.size.toString(),
        fileType: file.type,
        blobUrl: newBlob.url,
        documentType,
      });
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputFileRef.current?.files?.length || !documentType) {
      toast({
        title: "No files selected",
        description: `No files selected or document type not specified`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const uploadedFiles = await uploadFiles(inputFileRef.current.files);
      uploadedFiles.forEach(async (fileMetadata) => {
        sendDocumentDataForProcessingToInngest.mutateAsync({
          fileId: fileMetadata.id,
          blobUrl: fileMetadata.blobUrl!,
          userId: fileMetadata.userId,
          documentType,
        });
      });
      toast({
        title: "Files sent for processing",
        description: "Please wait while your files are memorized and processed",
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Error",
        description: "Error uploading one or more files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        {isUploading ? (
          <p>Uploading...</p>
        ) : (
          <>
            <Select
              onValueChange={(value) => setDocumentType(value as DocumentType)}
              value={documentType}
            >
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
            <AlertComponent
              title="Note"
              description="Please only upload documents of the same type at a time."
              iconType="info"
            />
            <input
              className="pt-2"
              name="file"
              ref={inputFileRef}
              type="file"
              required
              multiple
            />
            <Button type="submit" disabled={!documentType || isUploading}>
              Upload Files
            </Button>
          </>
        )}
      </form>
    </>
  );
}
