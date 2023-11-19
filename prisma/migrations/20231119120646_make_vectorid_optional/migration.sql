/*
  Warnings:

  - Made the column `projectId` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_projectId_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "vectorId" DROP NOT NULL,
ALTER COLUMN "projectId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
