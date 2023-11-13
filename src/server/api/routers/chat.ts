import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { kv } from "@vercel/kv";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

import { nanoid } from "@/lib/utils";

enum ChatRole {
  System = "system",
  User = "user",
  Assistant = "assistant",
}

const messageSchema = z.object({
  content: z.string(),
  role: z.nativeEnum(ChatRole),
});

const startChatSchema = z.object({
  messages: z.array(messageSchema),
  previewToken: z.string().optional(),
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const chatRouter = createTRPCRouter({
  startChat: protectedProcedure
    .input(startChatSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      if (input.previewToken) {
        configuration.apiKey = input.previewToken;
      }

      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: input.messages,
        temperature: 0.7,
        stream: true,
      });

      const stream = OpenAIStream(res, {
        async onCompletion(completion) {
          // Check if the first message exists before accessing its content
          const firstMessage = input.messages[0];
          const title = firstMessage
            ? firstMessage.content.substring(0, 100)
            : "Chat Session";

          const id = nanoid();
          const createdAt = Date.now();
          const path = `/chat/${id}`;
          const payload = {
            id,
            title,
            userId,
            createdAt,
            path,
            messages: [
              ...input.messages,
              {
                content: completion,
                role: "assistant",
              },
            ],
          };
          await kv.hmset(`chat:${id}`, payload);
          await kv.zadd(`user:chat:${userId}`, {
            score: createdAt,
            member: `chat:${id}`,
          });
        },
      });

      return new StreamingTextResponse(stream);
    }),
});

export default chatRouter;
