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
      enabled: !!fileId, // This ensures the query runs only if fileId is available
    },
  );

  useEffect(() => {
    if (data) {
      // Assuming the data returned directly contains the blob URL or the logic to derive it
      setBlobUrl(data);
    }
  }, [data]);

  // Optional: Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return <PDFViewer blobUrl={blobUrl} />;
}
