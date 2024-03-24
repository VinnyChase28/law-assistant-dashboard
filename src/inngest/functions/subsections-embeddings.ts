import { inngest } from "../client";
import nlp from "compromise";
import { OpenAIEmbeddings } from "@langchain/openai";
import { prisma } from "src/utils/prisma";
import { pinecone } from "src/utils/pinecone";
import { api } from "src/trpc/server";

interface ProcessDocumentEventData {
  fileId: number;
  blobUrl: string;
  userId: string;
  documentType: DocumentType;
}

interface PineconeMetadata {
  documentType: DocumentType;
  pageNumber: number;
  fileId: number;
}

enum DocumentType {
  REGULATORY_FRAMEWORK = "REGULATORY_FRAMEWORK",
  COMPLIANCE_SUBMISSION = "COMPLIANCE_SUBMISSION",
  COMPLIANCE_REPORT = "COMPLIANCE_REPORT",
}

function preprocessText(text: string) {
  const doc = nlp(text);
  doc.normalize({
    whitespace: true,
    case: false,
    punctuation: false,
    unicode: false,
    contractions: false,
    acronyms: false,
  });
  return doc.text();
}

async function pineconeUpsert(
  userId: string,
  vectorId: string,
  embedding: number[],
  metadata: PineconeMetadata,
) {
  const recordMetadata: Record<string, any> = {
    documentType: metadata.documentType.toString(),
    pageNumber: metadata.pageNumber.toString(),
  };

  // Specify the index and namespace
  const index = pinecone.index(process.env.PINECONE_INDEX ?? "");
  const namespace = index.namespace(userId);

  // Upsert the vector
  await namespace.upsert([
    { id: vectorId, values: embedding, metadata: recordMetadata },
  ]);
}

export const processDocument = inngest.createFunction(
  { id: "process-document-content" },
  { event: "document/uploaded" },
  async ({ event }: { event: { data: ProcessDocumentEventData } }) => {
    const { fileId, blobUrl, userId, documentType } = event.data;

    // Load the document content
    const pages = await api.llm.getPagesFromBlobUrl.mutate({ blobUrl });

    // Process each page
    for (const [i, page] of pages.entries()) {
      if (typeof page.pageContent !== "string") {
        throw new Error("Page content is not a string");
      }

      const pageNumber = i + 1;
      const processedText = preprocessText(page.pageContent);

      // Generate embedding
      const embeddings = new OpenAIEmbeddings({
        modelName: "text-embedding-ada-002",
      });
      const embedding = await embeddings.embedQuery(processedText);

      const vectorId = `${fileId}-${pageNumber}`;

      try {
        // Insert into Pinecone and the database
        await prisma.textSubsection.upsert({
          where: { fileId_pageNumber: { fileId, pageNumber } },
          update: { text: processedText, pineconeVectorId: vectorId },
          create: {
            fileId,
            pageNumber,
            text: processedText,
            pineconeVectorId: vectorId,
          },
        });

        await pineconeUpsert(userId, vectorId, embedding, {
          documentType,
          pageNumber,
          fileId,
        });
      } catch (error) {
        console.error("Error processing page:", pageNumber, error);
      }
    }

    try {
      await prisma.file.update({
        where: { id: fileId },
        data: { processingStatus: "DONE" },
      });
    } catch (error) {
      console.error("Error updating document status to DONE:", error);
    }
  },
);
