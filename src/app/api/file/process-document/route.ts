import { NextResponse } from "next/server";
import fetch from "node-fetch";
import { PrismaClient } from "@prisma/client";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import nlp from "compromise";

interface ProcessDocumentRequest {
  fileId: number;
  blobUrl: string;
  companyId: string;
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
  environment: process.env.PINECONE_ENVIRONMENT as string,
});

const prisma = new PrismaClient();

let fileId: number;

function preprocessText(text: string) {
  let doc = nlp(text);
  doc.normalize({
    whitespace: true,
    case: true,
    punctuation: true,
    unicode: true,
    contractions: true,
    acronyms: true,
  });
  return doc.text();
}

export async function POST(request: Request) {
  console.log();
  try {
    const body = (await request.json()) as ProcessDocumentRequest;
    console.log("Processing document:", body);
    fileId = body.fileId;
    console.log("File ID:", fileId);
    const { blobUrl, companyId } = body;

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

    let pageNumber = 0;
    for (const doc of docs) {
      pageNumber++;
      if (typeof doc.pageContent !== "string") {
        console.error("Page content is not a string:", doc.pageContent);
        continue;
      }

      const processedText = preprocessText(doc.pageContent);
      const embedding = await embeddings.embedQuery(processedText);
      const index = pinecone.index("law-assistant-ai");
      const companyNamespace = index.namespace(companyId);
      const vectorId = `${fileId}-${pageNumber}`;
      await companyNamespace.upsert([{ id: vectorId, values: embedding }]);
      console.log(`Upserted vector ${vectorId} for company ${companyId} and file ${fileId}`)
      await prisma.textSubsection.upsert({
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
    }

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
    console.error("Error in processing:", error);

    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    await prisma.file.update({
      where: { id: fileId },
      data: { processingStatus: "FAILED" },
    });

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
