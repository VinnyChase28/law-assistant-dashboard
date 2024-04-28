import { z } from "zod";

const complianceSubmissionSchema = z.object({
  fileId: z.number(),
  documentName: z.string(),
  textData: z.string(),
  pageNumber: z.number(),
});

const regulatoryFrameworkSchema = z.object({
  fileId: z.number(),
  documentName: z.string(),
  textData: z.string(),
  pageNumber: z.number(),
});

export const similarDocsDataSchema = z.array(
  z.object({
    complianceSubmission: complianceSubmissionSchema,
    regulatoryFramework: z.array(regulatoryFrameworkSchema),
  }),
);
