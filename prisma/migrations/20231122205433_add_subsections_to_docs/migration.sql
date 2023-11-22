/*
  Warnings:

  - You are about to drop the column `vectorId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `vectorProcessedAt` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "vectorId",
DROP COLUMN "vectorProcessedAt";

-- CreateTable
CREATE TABLE "Subsection" (
    "id" SERIAL NOT NULL,
    "fileId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "vectorRepresentation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subsection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Subsection_fileId_idx" ON "Subsection"("fileId");

-- AddForeignKey
ALTER TABLE "Subsection" ADD CONSTRAINT "Subsection_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
