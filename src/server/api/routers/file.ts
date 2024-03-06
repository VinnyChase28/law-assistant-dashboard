import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "src/server/api/trpc";
import { pinecone } from "src/utils/pinecone";
import { mdToPdf } from "md-to-pdf";


export const fileRouter = createTRPCRouter({
  //insert file metadata on upload to my files
  insertFileMetadata: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        fileType: z.string(),
        fileSize: z.string(),
        blobUrl: z.string(),
        documentType: z.enum(["REGULATORY_FRAMEWORK", "COMPLIANCE_SUBMISSION"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.file.create({
        data: {
          name: input.name,
          blobUrl: input.blobUrl,
          fileType: input.fileType,
          fileSize: input.fileSize,
          userId: ctx.session.user.id,
          processingStatus: "IN_PROGRESS",
          documentType: input.documentType,
        },
      });
    }),

  // fetch my own uploaded files
  getMyFiles: protectedProcedure
    .input(
      z.object({
        documentTypes: z
          .array(
            z.enum([
              "REGULATORY_FRAMEWORK",
              "COMPLIANCE_SUBMISSION",
              "COMPLIANCE_REPORT",
            ]),
          )
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { documentTypes } = input;
      return ctx.db.file.findMany({
        where: {
          userId: ctx.session.user.id,
          documentType: documentTypes ? { in: documentTypes } : undefined,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  // fetch generated compliance reports
  getMyComplianceReports: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.file.findMany({
      where: {
        userId: ctx.session.user.id,
        documentType: "COMPLIANCE_SUBMISSION",
      },
    });
  }),

  // delete a specific file, and its associated vectors
  //TODO: change this to delete all subsections and vectors at once
  deleteFile: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const index = pinecone.Index(process.env.PINECONE_INDEX ?? "");
      const fileId = input;
      const fileSubsections = await ctx.db.textSubsection.findMany({
        where: { fileId: fileId },
      });

      fileSubsections.forEach(async (subsection) => {
        await index.deleteOne(subsection.pineconeVectorId);
      });

      await ctx.db.file.delete({ where: { id: fileId } });

      return {
        success: true,
        message: "File and associated vectors deleted successfully.",
      };
    }),

  // create the compliance report metadata
  createComplianceReportMetadata: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.file.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          processingStatus: "IN_PROGRESS",
          documentType: "COMPLIANCE_REPORT",
        },
      });
    }),

  // update compliance report with the generated report data and set status to done
  updateComplianceReport: publicProcedure
    .input(
      z.object({
        id: z.number(),
        reportData: z.any(), // TODO: adjust with a real type
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx?.session?.user) {
        throw new Error("Unauthorized");
      }
      return ctx.db.file.update({
        where: { id: input.id },
        data: {
          processingStatus: "DONE",
          reportData: input.reportData,
        },
      });
    }),

  //fetch blob url based on file id
  getBlobUrl: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        throw new Error("Unauthorized");
      }
      const fileId = input;
      const file = await ctx.db.file.findUnique({
        where: { id: fileId },
      });

      return file?.blobUrl;
    }),

  // Convert markdown to PDF and upload it
  convertMarkdownToPdfAndUpload: protectedProcedure
    .input(
      z.object({
        markdown: z.string(),
        fileId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { markdown } = input;

      try {
        // Convert markdown to PDF
        const pdf = await mdToPdf({ content: markdown }).catch(console.error);

        if (pdf && pdf.content) {
          // Convert PDF content to a Blob
          const blob = new Blob([pdf.content], { type: "application/pdf" });

          // Prepare the form data to include the PDF blob
          const formData = new FormData();
          formData.append("file", blob, "document.pdf");

          // Send the Blob to your upload route
          const uploadResponse = await fetch("/api/upload-file", {
            method: "POST",
            body: formData,
            headers: {},
          });

          if (!uploadResponse.ok) {
            throw new Error(
              `Failed to upload PDF: ${uploadResponse.statusText}`,
            );
          }

          const uploadResult = await uploadResponse.json();
          //save the blob url to the database by
          await ctx.db.file.create({
            data: {
              name: "Compliance Report",
              blobUrl: uploadResult.url,
              fileType: "application/pdf",
              fileSize: blob.size.toString(),
              userId: ctx.session.user.id,
              processingStatus: "DONE",
              documentType: "COMPLIANCE_REPORT",
            },
          });

          return {
            success: true,
            message: "PDF generated and uploaded successfully.",
            uploadResult,
          };
        } else {
          return { success: false, message: "Failed to generate PDF." };
        }
      } catch (error) {
        console.error(error);
        return {
          success: false,
          message: "An error occurred during PDF generation or upload.",
        };
      }
    }),
});
