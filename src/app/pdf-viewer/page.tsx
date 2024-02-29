import { useRouter } from "next/router";
import PDFViewer from "../_components/pdf-viewer";
import { useEffect, useState } from "react";

export default function PDFViewerPage() {
  const router = useRouter();
  const { fileId } = router.query;
  const [blobUrl, setBlobUrl] = useState("");

  useEffect(() => {
    if (!fileId) return;

    // Function to fetch the PDF and create a blob URL
    const fetchPDF = async () => {
      const response = await fetch(`/api/pdf/${fileId}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
    };

    fetchPDF();

    return () => {
      // Cleanup the blob URL when the component unmounts or fileId changes
      URL.revokeObjectURL(blobUrl);
    };
  }, [fileId, blobUrl]);

  return <PDFViewer blobUrl={blobUrl} />;
}
