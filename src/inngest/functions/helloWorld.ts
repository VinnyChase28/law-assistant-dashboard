import { inngest } from "../client";

export default inngest.createFunction(
  { id: "hello-world" },
  { event: "demo/event.sent" },
  async ({ event, step }) => {
    await step.sleep("1s", 1000);
    return {
      message: `Hello ${event.name}!`,
    };
  },
);
