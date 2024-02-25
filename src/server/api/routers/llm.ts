import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { z } from "zod";
import { inngest } from "src/inngest";

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
    .mutation(async ({ input }) => {
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
        throw new Error("Failed to send event to Inngest.");
      }
    }),
});
