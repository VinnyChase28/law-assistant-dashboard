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
      // Combine all pages textData into a single string
      const combinedTextData = input.pages
        .map((page) => page.textData)
        .join("\n");
      const query = input.userQuery;

      const prompt = `Query: ${query}\n\nText to query:\n${combinedTextData}\n\n respond in markdown. information and source should be clearly outlined and separated. add two newlines between each source. The summary should be only relevant to the query, and contain no other information. Be Specific and consice. my life depends on it.`;
      return prompt;
    }),

  // Add a new procedure for sending data to Inngest
  sendComplianceReportToInngest: protectedProcedure
    .input(
      z.object({
        complianceReportData: z.any(), // Adjust the type according to your actual data structure
        userId: z.string(), // Assuming you need the userId for the Inngest event
        reportName: z.string(), // Name of the report for metadata purposes
        id: z.number(), // ID of the report for metadata purposes
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { complianceReportData, userId, reportName, id } = input;

      // Construct the event payload
      const eventPayload = {
        name: "demo/event.sent" as const, // Ensuring the event name matches exactly
        data: {
          reportName, // Including report name in the event data for reference
          ...complianceReportData, // Spreading complianceReportData into the payload
          userId, // Including userId in the event data if needed
          id, // Including report ID in the event data if needed
        },
      };

      try {
        // Send the event to Inngest
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
