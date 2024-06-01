import { OpenAIStream, StreamingTextResponse } from "ai";
import { type ChatCompletionMessageParam } from "openai/resources/chat/completions";

import { openai } from "src/utils/openai";

export const runtime = "edge";

export async function POST(req: Request) {
  const data = (await req.json()) as { messages: ChatCompletionMessageParam[] };

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    stream: true,
    messages: data.messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
