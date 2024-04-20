import { serve } from "inngest/next";

import { complianceReport } from "src/inngest/functions/compliance-reports";
import { processDocument } from "src/inngest/functions/subsections-embeddings";
import { calculateDailyUsage } from "src/inngest/functions/usage";

import { inngest } from "../../../inngest/client";

export const maxDuration = 300;
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [complianceReport, calculateDailyUsage, processDocument],
  streaming: "allow",
});
