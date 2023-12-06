import { OpenAIEmbeddings } from "langchain/embeddings/openai";

async function convertToVector(text: string) {
  try {
    const embeddings = new OpenAIEmbeddings({
      modelName: "text-embedding-ada-002",
    });

    const res = await embeddings.embedQuery(text);
    return res; // This will be an array of numbers (embedding vector)
  } catch (error) {
    console.error("Error generating embeddings:", error);
    return null;
  }
}

export default convertToVector;
