/*
  Warnings:

  - You are about to drop the column `vectorRepresentation` on the `Subsection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subsection" DROP COLUMN "vectorRepresentation",
ADD COLUMN     "pineconeVectorId" TEXT;
