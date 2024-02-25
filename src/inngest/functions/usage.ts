import { inngest } from "../client";
import { prisma } from "src/utils/prisma";

export default inngest.createFunction(
  { id: "calculate-daily-usage" },
  { event: "usage-report/event.sent" }, // Runs at midnight every day
  async () => {
    // Fetch chat messages from the last day
    const messages = await prisma.chatMessage.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
      include: {
        chatSession: true, // Assuming chatSession includes the user
      },
    });

    // Initialize total cost
    let totalCost = 0;

    messages.forEach((message) => {
      // Calculate tokens for content and prompt
      const contentTokens = Math.ceil(message.content.length / 4);
      const promptTokens = Math.ceil((message.prompt?.length ?? 0) / 4);

      // Determine cost per token based on the message role
      const costPerTokenInput = 0.015 / 1000; // $0.015 per 1K tokens for input
      const costPerTokenOutput = 0.045 / 1000; // $0.045 per 1K tokens for output

      // Calculate cost based on role
      let messageCost = 0;
      if (message.role === "USER") {
        // User input or prompt
        messageCost = (contentTokens + promptTokens) * costPerTokenInput;
      } else if (message.role === "AI") {
        // AI output
        messageCost = contentTokens * costPerTokenOutput;
      }

      // Accumulate total cost
      totalCost += messageCost;
    });

    // Update the database or generate a report with the total cost

    return `Calculated daily usage cost: ${totalCost.toFixed(2)}`;
  },
);
