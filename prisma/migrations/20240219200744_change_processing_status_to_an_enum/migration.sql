/*
  Warnings:

  - Changed the type of `processingStatus` on the `File` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "processingStatus" AS ENUM ('IN_PROGRESS', 'DONE', 'FAILED');

-- AlterTable
ALTER TABLE "File" DROP COLUMN "processingStatus",
ADD COLUMN     "processingStatus" "processingStatus" NOT NULL;
