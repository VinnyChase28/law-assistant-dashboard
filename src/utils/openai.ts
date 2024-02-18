import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  organization: "org-GH4CsWFtvXYPCa030fJ3hSFk",
  timeout: 30000,
  maxRetries: 3,
});
