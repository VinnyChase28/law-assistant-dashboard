export const callProcessDocument = (
  blobUrl: string,
  fileId: number,
  companyId: string,
) => {
  const url = "/api/file/process-document"; //nextjs route
  const encodedBlobUrl = encodeURIComponent(blobUrl);
  const data = {
    fileId: fileId,
    blobUrl: encodedBlobUrl,
    companyId: companyId,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.text();
    })
    .then((responseData) => {
      console.log("Response from process_document:", responseData);
    })
    .catch((error) => {
      console.error("Error calling process_document:", error);
    });
};
