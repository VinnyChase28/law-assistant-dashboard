"use client";

export default function PDFViewer({ blobUrl }: { blobUrl: string }) {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <iframe
        src={blobUrl}
        style={{ width: "100%", height: "100%", border: "none" }}
        allow="fullscreen"
      />
    </div>
  );
}
