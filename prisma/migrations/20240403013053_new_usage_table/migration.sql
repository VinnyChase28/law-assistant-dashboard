/*
  Warnings:

  - You are about to drop the column `priceId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the `UsageCost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsageCost" DROP CONSTRAINT "UsageCost_userId_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "priceId",
ADD COLUMN     "priceIds" TEXT[];

-- DropTable
DROP TABLE "UsageCost";
