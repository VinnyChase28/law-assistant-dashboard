import { z } from "zod";

export const myFilesSchema = z.object({
  id: z.number(),
  name: z.string(),
  blobUrl: z.string(),
  fileType: z.string(),
  fileSize: z.string(),
  vectorId: z.string().nullable().optional(), // Allow null and optional
  processingStatus: z.string(),
  vectorProcessedAt: z.date().nullable().optional(), // Allow null and optional
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  access: z.enum(["PRIVATE", "PUBLIC", "SHARED"]).optional(), // Adjusted based on your file access types
  documentType: z.string().nullable().optional(), // Allow null and optional
  // Include other fields if they are part of your model
});

export type File = z.infer<typeof myFilesSchema>;
