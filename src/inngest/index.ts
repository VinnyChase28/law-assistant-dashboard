import { complianceReport } from "./functions/compliance-reports";
import { calculateDailyUsage } from "./functions/usage";
import { processDocument } from "./functions/subsections-embeddings";


export const functions = [
  complianceReport,
  calculateDailyUsage,
  processDocument,
];

export { inngest } from "./client";
