"use client";

import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";
import { api } from "src/trpc/react";

export default function UploadFiles() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const createFile = api.file.insertFileMetadata.useMutation({
    onSuccess: () => {
      console.log("successful file upload to postgres");
    },
  });

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          // Check if the input file is not null and has files
          if (
            !inputFileRef.current ||
            !inputFileRef.current.files ||
            inputFileRef.current.files.length === 0
          ) {
            throw new Error("No file selected");
          }

          const files = inputFileRef.current.files;

          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            // Ensure that the file is defined
            if (file) {
              const newBlob = await upload(file.name, file, {
                access: "public",
                handleUploadUrl: "/api/file/upload",
              });
              console.log(newBlob);
              createFile.mutate({
                name: file.name,
                fileSize: file.size.toString(),
                fileType: file.type,
                blobUrl: newBlob.url,
              });
            }
          }
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required multiple />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}
