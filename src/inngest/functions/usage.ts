import { inngest } from "../client";
import { prisma } from "src/utils/prisma";

export const calculateDailyUsage = inngest.createFunction(
  { id: "calculate-daily-usage" },
  { cron: "0 0 * * *" }, // Runs at midnight every day
  async () => {
    // Calculate the start and end of the previous day in UTC
    const startOfPreviousDay = new Date(new Date().setUTCHours(0, 0, 0, 0));
    startOfPreviousDay.setUTCDate(startOfPreviousDay.getUTCDate() - 1);
    const endOfPreviousDay = new Date(new Date().setUTCHours(23, 59, 59, 999));
    endOfPreviousDay.setUTCDate(endOfPreviousDay.getUTCDate() - 1);

    // Fetch all users
    const users = await prisma.user.findMany();

    // Loop through each user and calculate their usage
    for (const user of users) {
      // Fetch usage records from the previous day for the current user
      const usageRecords = await prisma.usage.findMany({
        where: {
          userId: user.id,
          timestamp: {
            gte: startOfPreviousDay,
            lte: endOfPreviousDay,
          },
        },
      });

      // Calculate total input and output tokens for the current user
      const totalInputTokens = usageRecords.reduce(
        (sum, record) => sum + record.inputTokens,
        0,
      );
      const totalOutputTokens = usageRecords.reduce(
        (sum, record) => sum + record.outputTokens,
        0,
      );

      // Calculate total cost based on the simplified pricing
      const costPerToken = 0.06 / 1000; // $0.06 per 1000 tokens
      const totalCost = (totalInputTokens + totalOutputTokens) * costPerToken;

      // Create a new Usage record for the current user
      await prisma.usage.create({
        data: {
          userId: user.id,
          inputTokens: totalInputTokens,
          outputTokens: totalOutputTokens,
          timestamp: startOfPreviousDay,
        },
      });
    }

    return `Daily usage calculated and updated for all users.`;
  },
);