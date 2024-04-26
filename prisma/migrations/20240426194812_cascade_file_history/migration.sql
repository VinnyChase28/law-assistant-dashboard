-- DropForeignKey
ALTER TABLE "FileTaskDocument" DROP CONSTRAINT "FileTaskDocument_fileId_fkey";

-- AddForeignKey
ALTER TABLE "FileTaskDocument" ADD CONSTRAINT "FileTaskDocument_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
