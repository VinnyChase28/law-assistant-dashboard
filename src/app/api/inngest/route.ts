import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import complianceReports from "src/inngest/functions/compliance-reports";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [complianceReports],
  streaming: "allow",
});

