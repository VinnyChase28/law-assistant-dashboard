import { Pinecone } from "@pinecone-database/pinecone";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

// Initialize Pinecone client and index
const pineconeClient = new Pinecone();
const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX || "");

export const pineconeRouter = createTRPCRouter({
  indexDocuments: protectedProcedure
    .input(
      z.array(
        z.object({
          metadata: z.record(z.string()),
          pageContent: z.string(),
        }),
      ),
    )
    .mutation(async ({ input }) => {
      // Indexing logic
      const docs = input.map((doc) => new Document(doc));
      const embeddings = new OpenAIEmbeddings();
      const pineconeStore = new PineconeStore(embeddings, { pineconeIndex });
      await pineconeStore.addDocuments(docs);
      return { success: true, message: "Documents indexed" };
    }),

  searchDocuments: protectedProcedure
    .input(
      z.object({
        query: z.string(),
        filter: z.record(z.string()).optional(),
      }),
    )
    .query(async ({ input }) => {
      // Searching logic
      const embeddings = new OpenAIEmbeddings();
      const vectorStore = new PineconeStore(embeddings, { pineconeIndex });
      const results = await vectorStore.similaritySearch(
        input.query,
        10, // Adjust the number of results as needed
        input.filter,
      );
      return results;
    }),

  deleteDocuments: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      // Deletion logic
      const embeddings = new OpenAIEmbeddings();
      const pineconeStore = new PineconeStore(embeddings, { pineconeIndex });
      await pineconeStore.delete({ ids: input });
      return { success: true, message: "Documents deleted" };
    }),

  // Additional operations as needed
});
