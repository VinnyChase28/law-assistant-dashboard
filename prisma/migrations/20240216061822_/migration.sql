/*
  Warnings:

  - The values [LEGAL_CONTRACTS,LITIGATION_DOCUMENTS,CORPORATE_GOVERNANCE,REGULATORY_COMPLIANCE,INTELLECTUAL_PROPERTY,CLIENT_CORRESPONDENCE,LEGAL_RESEARCH,TRANSACTIONAL_DOCUMENTS,ESTATE_PLANNING,EMPLOYMENT_LAW,REAL_ESTATE_LAW,CONSTRUCTION_PROPOSALS,DISCOVERY_DOCUMENTS] on the enum `DocumentType` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `label` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DocumentType_new" AS ENUM ('REGULATORY_FRAMEWORK', 'COMPLIANCE_SUBMISSION', 'COMPLIANCE_REPORT');
ALTER TABLE "File" ALTER COLUMN "documentType" TYPE "DocumentType_new" USING ("documentType"::text::"DocumentType_new");
ALTER TYPE "DocumentType" RENAME TO "DocumentType_old";
ALTER TYPE "DocumentType_new" RENAME TO "DocumentType";
DROP TYPE "DocumentType_old";
COMMIT;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "label" TEXT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "label",
ADD COLUMN     "label" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Label";
