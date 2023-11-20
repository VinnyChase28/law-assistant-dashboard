"use client";


import { upload } from "@vercel/blob/client";
import { useRef } from "react";
import { api } from "src/trpc/react";
import { Input } from "@/components/ui/input";

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
        <Input name="file" ref={inputFileRef} type="file" required multiple />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}
