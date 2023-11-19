/*
  Warnings:

  - You are about to drop the column `folder` on the `File` table. All the data in the column will be lost.
  - Added the required column `userId` to the `FileTaskHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Account_providerAccountId_key";

-- DropIndex
DROP INDEX "FileTaskHistory_fileId_taskId_idx";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "folder";

-- AlterTable
ALTER TABLE "FileTaskHistory" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "FileTaskHistory_fileId_taskId_userId_idx" ON "FileTaskHistory"("fileId", "taskId", "userId");

-- AddForeignKey
ALTER TABLE "FileTaskHistory" ADD CONSTRAINT "FileTaskHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
