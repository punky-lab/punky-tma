import { getPrompt } from '@/lib/chat';
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const baseUrl = "https://ai-api.punky.app";
const gaiaNetLlamaBaseUrl = "https://llama.us.gaianet.network/v1";

const openai = createOpenAI({
  baseURL: gaiaNetLlamaBaseUrl,
  apiKey: "",
  compatibility: "compatible",
});

export async function getGaiaNetResponse(message: string) {
  const prompt = getPrompt(message);
  const { text } = await generateText({
    model: openai("llama"),
    prompt: prompt,
  });
  console.log(text);
  return text;
}

export async function getChatResponse(message: string) {
  const res = await fetch(`/api/ai`, {
    method: "post",
    body: JSON.stringify({
      message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.message as string;
}

export async function getResponse(message: string) {
  return getGaiaNetResponse(message);
}
