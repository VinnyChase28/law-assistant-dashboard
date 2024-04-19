/*
  Warnings:

  - You are about to drop the column `taskId` on the `FileTaskHistory` table. All the data in the column will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `documentType` to the `FileTaskHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relatedDocument` to the `FileTaskHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FileTaskHistory" DROP CONSTRAINT "FileTaskHistory_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropIndex
DROP INDEX "FileTaskHistory_fileId_taskId_userId_idx";

-- AlterTable
ALTER TABLE "FileTaskHistory" DROP COLUMN "taskId",
ADD COLUMN     "documentType" "DocumentType" NOT NULL,
ADD COLUMN     "relatedDocument" TEXT NOT NULL;

-- DropTable
DROP TABLE "Task";

-- CreateIndex
CREATE INDEX "FileTaskHistory_fileId_userId_idx" ON "FileTaskHistory"("fileId", "userId");
