/*
  Warnings:

  - Added the required column `processingStatus` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "processingStatus" TEXT NOT NULL,
ADD COLUMN     "vectorProcessedAt" TIMESTAMP(3);
