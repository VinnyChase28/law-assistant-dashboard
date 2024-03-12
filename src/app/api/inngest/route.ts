import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { complianceReport } from "src/inngest/functions/compliance-reports";
import { calculateDailyUsage } from "src/inngest/functions/usage";
import { processDocument } from "src/inngest/functions/subsections-embeddings";

export const maxDuration = 900;
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [complianceReport, calculateDailyUsage, processDocument],
  streaming: "allow",
});
