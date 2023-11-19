/*
  Warnings:

  - A unique constraint covering the columns `[providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Label" ADD VALUE 'DRAFTING';
ALTER TYPE "Label" ADD VALUE 'REVIEW';
ALTER TYPE "Label" ADD VALUE 'NEGOTIATION';
ALTER TYPE "Label" ADD VALUE 'LITIGATION_PREPARATION';
ALTER TYPE "Label" ADD VALUE 'DUE_DILIGENCE';
ALTER TYPE "Label" ADD VALUE 'CASE_ANALYSIS';
ALTER TYPE "Label" ADD VALUE 'CLIENT_CONSULTATION';
ALTER TYPE "Label" ADD VALUE 'REGULATORY_ANALYSIS';
ALTER TYPE "Label" ADD VALUE 'DOCUMENT_FILING';
ALTER TYPE "Label" ADD VALUE 'INTELLECTUAL_PROPERTY';

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerAccountId_key" ON "Account"("providerAccountId");
