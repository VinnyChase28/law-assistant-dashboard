// Function to call the process_document cloud function as a background task
export const callProcessDocument = (
  blobUrl: string,
  fileId: number,
  userId: string,
  pineconeIndexName: string,
) => {
  console.log(blobUrl);
  const url = "http://127.0.0.1:8080"; // URL of your Flask server
  const data = {
    fileId: fileId,
    blobUrl: blobUrl,
    pineconeIndexName: pineconeIndexName,
    userId: userId,
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
