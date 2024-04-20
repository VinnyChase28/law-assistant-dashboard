"use client";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import PDFViewer from "@/components/pdf-viewer";
import Markdown from "src/app/_components/markdown";
import { api } from "src/trpc/react";

export default function FileViewerPage() {
  const searchParams = useSearchParams();
  const fileId = searchParams.get("fileId");
  const [fileContent, setFileContent] = useState({
    blobUrl: "",
    markdownText: "",
  });

  const { data, isLoading, error } = api.file.getFile.useQuery(Number(fileId), {
    enabled: !!fileId,
  });

  useEffect(() => {
    if (data) {
      if (data.documentType === "COMPLIANCE_REPORT") {
        // Assuming markdown content is stored in data.finalReport
        setFileContent({ markdownText: data.finalReport ?? "", blobUrl: "" });
      } else {
        // For other document types, assuming blobUrl is used
        setFileContent({ blobUrl: data.blobUrl ?? "", markdownText: "" });
      }
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  // Render based on documentType
  return data?.documentType === "COMPLIANCE_REPORT" ? (
    <Markdown markdownText={fileContent.markdownText} />
  ) : (
    <PDFViewer blobUrl={fileContent.blobUrl} />
  );
}
