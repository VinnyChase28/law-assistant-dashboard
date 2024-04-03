import { openai } from "src/utils/openai";
import { prisma } from "src/utils/prisma";

export async function openaiWrapper(
  userId: string,
  apiCall: () => Promise<any>,
) {
  const startTime = Date.now();

  try {
    const response = await apiCall();

    const endTime = Date.now();
    const duration = endTime - startTime;

    const usage = response.data.usage;

    await prisma.usage.create({
      data: {
        userId,
        inputTokens: usage.prompt_tokens,
        outputTokens: usage.completion_tokens,
        timestamp: new Date(),
      },
    });

    return response;
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    throw error;
  }
}
