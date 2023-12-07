/*
  Warnings:

  - A unique constraint covering the columns `[fileId,pageNumber]` on the table `TextSubsection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pageNumber` to the `TextSubsection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DataSubsection" DROP CONSTRAINT "DataSubsection_fileId_fkey";

-- DropForeignKey
ALTER TABLE "TextSubsection" DROP CONSTRAINT "TextSubsection_fileId_fkey";

-- DropIndex
DROP INDEX "TextSubsection_fileId_idx";

-- AlterTable
ALTER TABLE "TextSubsection" ADD COLUMN     "pageNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TextSubsection_fileId_pageNumber_key" ON "TextSubsection"("fileId", "pageNumber");

-- AddForeignKey
ALTER TABLE "TextSubsection" ADD CONSTRAINT "TextSubsection_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataSubsection" ADD CONSTRAINT "DataSubsection_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
