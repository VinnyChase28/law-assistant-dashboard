"use client";

import { useSearchParams } from "next/navigation";
import PDFViewer from "@/components/pdf-viewer";
import { useEffect, useState } from "react";
import { api } from "src/trpc/react";

export default function PDFViewerPage() {
  const searchParams = useSearchParams();
  const fileId = searchParams.get("fileId");
  const [blobUrl, setBlobUrl] = useState("");

  // Initialize the TRPC hook outside of any function
  const { data, isLoading, error } = api.file.getBlobUrl.useQuery(
    Number(fileId),
    {
      enabled: !!fileId,
    },
  );

  useEffect(() => {
    if (data) {
      setBlobUrl(data);
    }
  }, [data]);

  // Optional: Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return <PDFViewer blobUrl={blobUrl} />;
}
