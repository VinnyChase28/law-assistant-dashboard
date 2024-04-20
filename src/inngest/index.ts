import { complianceReport } from "./functions/compliance-reports";
import { processDocument } from "./functions/subsections-embeddings";
import { calculateDailyUsage } from "./functions/usage";


export const functions = [
  complianceReport,
  calculateDailyUsage,
  processDocument,
];

export { inngest } from "./client";
