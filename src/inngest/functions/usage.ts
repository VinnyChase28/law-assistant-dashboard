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
      // Fetch chat messages from the previous day for the current user
      const chatMessages = await prisma.chatMessage.findMany({
        where: {
          createdAt: {
            gte: startOfPreviousDay,
            lte: endOfPreviousDay,
          },
          chatSession: {
            userId: user.id,
          },
        },
      });

      // Calculate total word count for chat messages
      const chatWordCount = chatMessages.reduce((sum, message) => {
        const contentWords = message.content.trim().split(/\s+/).length;
        const promptWords = message.prompt?.trim().split(/\s+/).length ?? 0;
        return sum + contentWords + promptWords;
      }, 0);

      // Fetch reports from the previous day for the current user
      const reports = await prisma.file.findMany({
        where: {
          createdAt: {
            gte: startOfPreviousDay,
            lte: endOfPreviousDay,
          },
          userId: user.id,
          finalReport: {
            not: null,
          },
        },
      });

      // Calculate total word count for reports
      const reportWordCount = reports.reduce((sum, report) => {
        const words = report.finalReport?.trim().split(/\s+/).length ?? 0;
        return sum + words;
      }, 0);

      // Calculate total tokens based on the word count
      const totalWords = chatWordCount + reportWordCount;
      const totalTokens = Math.ceil(totalWords / 0.75); // Assuming 1 token ~= ¾ words

      // Calculate input and output tokens (you can adjust the ratio as needed)
      const inputTokens = Math.ceil(totalTokens * 0.4);
      const outputTokens = Math.ceil(totalTokens * 0.6);

      // Store the usage data for the user in the Usage model
      await prisma.usage.create({
        data: {
          userId: user.id,
          inputTokens,
          outputTokens,
          timestamp: startOfPreviousDay,
        },
      });
    }

    return `Daily usage calculated and updated for all users.`;
  },
);