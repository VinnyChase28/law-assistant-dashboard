"use client";

import React, { useState, useRef } from "react";

import { upload } from "@vercel/blob/client";

import { Button } from "@components/ui/button";
import { api } from "src/trpc/react";

import AlertComponent from "../alert";
import { IconSpinner } from "../ui/icons";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "../ui/select";
import { useToast } from "../ui/use-toast";


type DocumentType = "REGULATORY_FRAMEWORK" | "COMPLIANCE_SUBMISSION";

interface UploadFilesProps {
  setIsDialogOpen: (isOpen: boolean) => void;
}

export default function UploadFiles({ setIsDialogOpen }: UploadFilesProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [filesSelected, setFilesSelected] = useState(false); 
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setFilesSelected(!!files && files.length > 0);
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
      for (const fileMetadata of uploadedFiles) {
        await sendDocumentDataForProcessingToInngest.mutateAsync({
          fileId: fileMetadata.id,
          blobUrl: fileMetadata.blobUrl!,
          userId: fileMetadata.userId,
          documentType,
        });
      }
      toast({
        title: "Files sent for processing",
        description:
          "Once your files are finished processing, they will be marked as done.",
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Error",
        description: "Error uploading one or more files",
        variant: "destructive",
      });
    } finally {
      setIsDialogOpen(false);
      setTimeout(() => setIsUploading(false), 1000);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col gap-4 p-4"
      >
        {isUploading ? (
          <div className="flex h-full w-full items-center justify-center">
            <p>Please wait...</p>
            <IconSpinner />
          </div>
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
                  <SelectLabel>Type</SelectLabel>
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
              description="Please only upload documents of the same type at a time. You can upload regulatory documents, which contain the rules text, or compliance submissions, which contain the documents that are being submitted for compliance."
              iconType="info"
            />
            <input
              className="pt-2"
              name="file"
              ref={inputFileRef}
              type="file"
              required
              multiple
              onChange={handleFileChange}
            />
            <Button
              type="submit"
              disabled={!documentType || isUploading || !filesSelected}
            >
              Upload Files
            </Button>
          </>
        )}
      </form>
    </>
  );
}
