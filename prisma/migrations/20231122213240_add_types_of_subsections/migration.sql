/*
  Warnings:

  - You are about to drop the `Subsection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subsection" DROP CONSTRAINT "Subsection_fileId_fkey";

-- DropTable
DROP TABLE "Subsection";

-- CreateTable
CREATE TABLE "TextSubsection" (
    "id" SERIAL NOT NULL,
    "fileId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "pineconeVectorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TextSubsection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSubsection" (
    "id" SERIAL NOT NULL,
    "fileId" INTEGER NOT NULL,
    "dataContent" JSONB NOT NULL,
    "pineconeVectorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataSubsection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TextSubsection_fileId_idx" ON "TextSubsection"("fileId");

-- CreateIndex
CREATE INDEX "DataSubsection_fileId_idx" ON "DataSubsection"("fileId");

-- AddForeignKey
ALTER TABLE "TextSubsection" ADD CONSTRAINT "TextSubsection_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataSubsection" ADD CONSTRAINT "DataSubsection_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
