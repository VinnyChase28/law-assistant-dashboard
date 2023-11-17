import { Pezzo, PezzoOpenAI } from "@pezzo/client";

// Initialize the Pezzo client and export it
export const pezzo = new Pezzo({
  projectId: "law-assistant-ai",
  environment: "Production",
  apiKey: process.env.PEZZO_API_KEY,
});

// Initialize PezzoOpenAI and export it
export const openai = new PezzoOpenAI(pezzo);
