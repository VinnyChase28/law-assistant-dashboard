import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "src/server/api/trpc";
import { z } from "zod";
import { inngest } from "src/inngest";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { api } from "src/trpc/server";
import { processingStatus } from "@prisma/client";

// TRPC router implementation
export const llmRouter = createTRPCRouter({
  generateDocumentPrompt: protectedProcedure
    .input(
      z.object({
        userQuery: z.string(),
        pages: z.array(
          z.object({
            fileName: z.string(),
            textData: z.string(),
            pageNumber: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        throw new Error("UNAUTHORIZED");
      }
      // Structure the combined text data to include rule numbers and sources
      const structuredTextData = input.pages
        .map(
          (page, index) =>
            `Rule ${index + 1} from ${page.fileName} (Page ${
              page.pageNumber
            }):\n${page.textData}`,
        )
        .join("\n\n");

      const query = input.userQuery;

      const prompt = `
      I will give you a rules question and the associated rules text. 

      Question: ${query}
      
      Rules text:
      ${structuredTextData}
      
      Your goal is to answer the rules question using the provided rules text as a reference. Please provide proper sources for each rule you reference. 
      The summary should be directly relevant to the query, concise, and specific. do not provide any peripheral information with respect to the question asked. Give me only the information 
      that directly pertains to the restrictions or prescribed requirements for the rules. question my life depends on it. 

      The sources should be at the end of your response.
      If there is not rules text, remind the user to upload documents to get the answers they need."
      `;

      return prompt;
    }),

  // Add a new procedure for sending data to Inngest
  sendComplianceReportToInngest: protectedProcedure
    .input(
      z.object({
        complianceReportData: z.any(),
        userId: z.string(),
        reportName: z.string(),
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        throw new Error("UNAUTHORIZED");
      }
      const { complianceReportData, userId, reportName, id } = input;
      const eventPayload = {
        name: "compliance-report/event.sent" as const,
        data: {
          reportName,
          ...complianceReportData,
          userId,
          id,
        },
      };

      try {
        await inngest.send(eventPayload);
        return {
          success: true,
          message: "Event sent successfully to Inngest.",
        };
      } catch (error) {
        console.error("Error sending event to Inngest:", error);

        await api.file.setFileStatus.mutate({
          fileId: id,
          status: processingStatus.FAILED,
        });

        throw new Error("Failed to send event to Inngest.");
      }
    }),

  // load a pdf from a blob url and return the pages.
  getPagesFromBlobUrl: publicProcedure
    .input(
      z.object({
        blobUrl: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { blobUrl } = input;
      const decodedBlobUrl = decodeURIComponent(blobUrl);
      const pdfResponse = await fetch(decodedBlobUrl);
      if (!pdfResponse.ok) {
        throw new Error(`Failed to fetch PDF: ${pdfResponse.statusText}`);
      }
      const blob = await pdfResponse.blob();
      const loader = new WebPDFLoader(blob);
      const pages = await loader.load();
      return pages;
    }),

  //trigger inngest function to process document
  sendDocumentDataForProcessingToInngest: protectedProcedure
    .input(
      z.object({
        fileId: z.number(),
        blobUrl: z.string(),
        userId: z.string(),
        documentType: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        throw new Error("UNAUTHORIZED");
      }
      const { fileId, blobUrl, userId, documentType } = input;
      const eventPayload = {
        name: "document/uploaded" as const,
        data: {
          fileId,
          blobUrl,
          userId,
          documentType,
        },
      };

      try {
        await inngest.send(eventPayload);
        return {
          success: true,
          message: "Event sent successfully to Inngest.",
        };
      } catch (error) {
        console.error("Error sending event to Inngest:", error);
        await api.file.setFileStatus.mutate({
          fileId: fileId,
          status: processingStatus.FAILED,
        });
        throw new Error("Failed to send event to Inngest.");
      }
    }),
});
