import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import helloWorld from "src/inngest/functions/compliance-reports";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld],
});
