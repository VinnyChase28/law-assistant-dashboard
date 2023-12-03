export const callProcessDocument = (
  blobUrl: string,
  fileId: number,
  companyId: string,
) => {
  return new Promise((resolve, reject) => {
    const url = "/api/file/process-document";
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
        resolve(responseData); // Resolve the promise with the response data
      })
      .catch((error) => {
        console.error("Error calling process_document:", error);
        reject(error); // Reject the promise with the error
      });
  });
};
