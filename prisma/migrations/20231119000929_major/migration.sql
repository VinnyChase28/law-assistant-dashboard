/*
  Warnings:

  - You are about to drop the `_FileTasks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `label` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('LEGAL_CONTRACTS', 'LITIGATION_DOCUMENTS', 'CORPORATE_GOVERNANCE', 'REGULATORY_COMPLIANCE', 'INTELLECTUAL_PROPERTY', 'CLIENT_CORRESPONDENCE', 'LEGAL_RESEARCH', 'TRANSACTIONAL_DOCUMENTS', 'ESTATE_PLANNING', 'EMPLOYMENT_LAW', 'REAL_ESTATE_LAW', 'CONSTRUCTION_PROPOSALS', 'DISCOVERY_DOCUMENTS');

-- CreateEnum
CREATE TYPE "Label" AS ENUM ('RESEARCH', 'COMPLIANCE', 'SUMMARY', 'EXTRACTION', 'CONTRACT');

-- DropForeignKey
ALTER TABLE "_FileTasks" DROP CONSTRAINT "_FileTasks_A_fkey";

-- DropForeignKey
ALTER TABLE "_FileTasks" DROP CONSTRAINT "_FileTasks_B_fkey";

-- DropIndex
DROP INDEX "File_name_idx";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "documentType" "DocumentType",
ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "category" TEXT NOT NULL,
DROP COLUMN "label",
ADD COLUMN     "label" "Label" NOT NULL;

-- DropTable
DROP TABLE "_FileTasks";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "status" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileTaskHistory" (
    "id" TEXT NOT NULL,
    "fileId" INTEGER NOT NULL,
    "taskId" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileTaskHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Project_companyId_idx" ON "Project"("companyId");

-- CreateIndex
CREATE INDEX "FileTaskHistory_fileId_taskId_idx" ON "FileTaskHistory"("fileId", "taskId");

-- CreateIndex
CREATE INDEX "File_userId_projectId_idx" ON "File"("userId", "projectId");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileTaskHistory" ADD CONSTRAINT "FileTaskHistory_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileTaskHistory" ADD CONSTRAINT "FileTaskHistory_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
