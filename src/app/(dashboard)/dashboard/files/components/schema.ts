import { FileAccess, DocumentType, processingStatus } from "@prisma/client";
import { z } from "zod";

export const myFilesSchema = z.object({
  id: z.number(),
  name: z.string(),
  blobUrl: z.string().optional(),
  fileType: z.string().optional(),
  fileSize: z.string().optional(),
  vectorId: z.string().nullable().optional(),
  processingStatus: z.nativeEnum(processingStatus),
  vectorProcessedAt: z.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  access: z.nativeEnum(FileAccess).optional(),
  documentType: z.nativeEnum(DocumentType).nullable().optional(),
  labelId: z.string().optional(),
  label: z
    .object({
      id: z.string(),
      text: z.string(),
    })
    .optional(),
});

export type File = z.infer<typeof myFilesSchema>;