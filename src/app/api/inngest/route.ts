import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { complianceReport } from "src/inngest/functions/compliance-reports";
import { calculateDailyUsage } from "src/inngest/functions/usage";

export const runtime = "edge";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [complianceReport, calculateDailyUsage],
  streaming: "allow",
});
