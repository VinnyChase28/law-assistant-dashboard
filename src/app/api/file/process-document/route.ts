import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { getServerAuthSession } from "src/server/auth";
import nlp from "compromise";

let fileId: number;

interface ProcessDocumentRequest {
  fileId: number;
  blobUrl: string;
  userId: string;
  documentType: string;
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
  environment: "us-west1-gcp",
});

const prisma = new PrismaClient();

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

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as ProcessDocumentRequest;
    const { blobUrl, userId, documentType, fileId } = body;

    const metadata = {
      documentType: documentType,
      userId: userId,
    };

    const decodedBlobUrl = decodeURIComponent(blobUrl);
    const pdfResponse = await fetch(decodedBlobUrl);
    if (!pdfResponse.ok) {
      throw new Error(`Failed to fetch PDF: ${pdfResponse.statusText}`);
    }
    const blob = await pdfResponse.blob();

    const loader = new WebPDFLoader(blob);
    const docs = await loader.load();

    const embeddings = new OpenAIEmbeddings({
      modelName: "text-embedding-ada-002",
    });

    const index = pinecone.index("law-assistant-ai");
    const companyNamespace = index.namespace(userId);

    const upsertPromises = docs.map(async (doc, i) => {
      if (typeof doc.pageContent !== "string") {
        throw new Error("Page content is not a string");
      }

      const pageNumber = i + 1;
      const processedText = preprocessText(doc.pageContent);
      const embedding = await embeddings.embedQuery(processedText);
      const vectorId = `${fileId}-${pageNumber}`;

      // Pinecone upsert
      await companyNamespace.upsert([
        { id: vectorId, values: embedding, metadata: metadata },
      ]);

      // Database upsert operation
      return prisma.textSubsection.upsert({
        where: {
          fileId_pageNumber: { fileId: fileId, pageNumber: pageNumber },
        },
        update: { text: processedText, pineconeVectorId: vectorId },
        create: {
          fileId: fileId,
          pageNumber: pageNumber,
          text: processedText,
          pineconeVectorId: vectorId,
        },
      });
    });

    // Wait for all upserts to complete
    await Promise.all(upsertPromises);

    // Update processing status to DONE after successful processing
    await prisma.file.update({
      where: { id: fileId },
      data: { processingStatus: "DONE" },
    });

    return NextResponse.json(
      { message: "Document processed successfully" },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    // Update file status to FAILED
    await prisma.file.update({
      where: { id: fileId },
      data: { processingStatus: "FAILED" },
    });

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
