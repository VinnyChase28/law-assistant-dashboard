/*
  Warnings:

  - You are about to drop the column `reportText` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "reportText",
ADD COLUMN     "reportData" JSONB;
