import { Pinecone } from "@pinecone-database/pinecone";

export type Metadata = { userId: string; text: string; title: string };

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "",
  environment: process.env.PINECONE_ENVIRONMENT || "",
  projectId: process.env.PINECONE_PROJECT_ID || "",
});
