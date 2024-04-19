/*
  Warnings:

  - You are about to drop the column `relatedDocument` on the `FileTaskHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FileTaskHistory" DROP COLUMN "relatedDocument";

-- CreateTable
CREATE TABLE "FileTaskDocument" (
    "taskHistoryId" TEXT NOT NULL,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "FileTaskDocument_pkey" PRIMARY KEY ("taskHistoryId","fileId")
);

-- AddForeignKey
ALTER TABLE "FileTaskDocument" ADD CONSTRAINT "FileTaskDocument_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileTaskDocument" ADD CONSTRAINT "FileTaskDocument_taskHistoryId_fkey" FOREIGN KEY ("taskHistoryId") REFERENCES "FileTaskHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
