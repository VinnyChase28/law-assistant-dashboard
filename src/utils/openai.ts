import { OpenAIApi, Configuration } from "openai-edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const MODEL = "text-embedding-ada-002";

export async function createEmbedding(text: string) {
  const response = await openai.createEmbedding({
    model: MODEL,
    input: text,
  });

  return response.text;
}
