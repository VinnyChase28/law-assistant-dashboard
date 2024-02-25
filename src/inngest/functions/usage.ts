import { inngest } from "../client";
import { prisma } from "src/utils/prisma";

export const calculateDailyUsage = inngest.createFunction(
  { id: "calculate-daily-usage" },
  { cron: "0 0 * * *" }, // Runs at midnight every day
  async () => {
    // Calculate the start of the previous day in UTC
    const startOfPreviousDay = new Date(new Date().setUTCHours(0, 0, 0, 0));
    startOfPreviousDay.setUTCDate(startOfPreviousDay.getUTCDate() - 1);

    // Fetch all users
    const users = await prisma.user.findMany();

    // Loop through each user and calculate their usage
    for (const user of users) {
      // Fetch chat messages from the previous day for the current user
      const messages = await prisma.chatMessage.findMany({
        where: {
          createdAt: {
            gte: startOfPreviousDay,
          },
          chatSession: {
            userId: user.id,
          },
        },
      });

      // Initialize total cost for the current user
      let totalCost = 0;

      // Calculate cost for each message
      messages.forEach((message) => {
        const contentTokens = Math.ceil(message.content.length / 4);
        const promptTokens = Math.ceil((message.prompt?.length ?? 0) / 4);

        const costPerTokenInput = 0.015 / 1000; // $0.015 per 1K tokens for input
        const costPerTokenOutput = 0.045 / 1000; // $0.045 per 1K tokens for output

        let messageCost = 0;
        if (message.role === "USER") {
          messageCost = promptTokens * costPerTokenInput;
        } else if (message.role === "AI") {
          messageCost = contentTokens * costPerTokenOutput;
        }

        totalCost += messageCost;
      });

      // Log the calculated cost for auditing or debugging purposes
      console.log(
        `Calculated daily usage cost for user ${user.id}: ${totalCost.toFixed(
          2,
        )}`,
      );

      // Update the database with the total cost for the current user
      await prisma.usageCost.create({
        data: {
          totalCost: totalCost,
          date: startOfPreviousDay,
          userId: user.id,
        },
      });
    }

    return `Daily usage costs calculated and updated for all users.`;
  },
);
