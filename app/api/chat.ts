import { getPrompt } from '@/lib/chat';
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { addmemory } from "@/app/api/memory";
import { searchmemory } from "@/app/api/memory";

const baseURL = "https://openrouter.ai/api/v1";
const gaiaNetLlamaBaseUrl = "https://llama.us.gaianet.network/v1";

const openai = createOpenAI({
  baseURL,
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  compatibility: "compatible",
})

const mem0msg = [
  {"role": "user", "content": "" },
  {"role": "assistant", "content": ""}
];

export async function getGaiaNetResponse(message: string) {
  const user_name = "punky-test";
  const prompt = getPrompt(user_name, message);
  const memory_prev = searchmemory(user_name, message);
  const { text } = await generateText({
    model: openai("google/gemini-flash-1.5-8b-exp"),
    prompt: prompt+memory_prev,
  });
  console.log(text);
  return text;
}

export async function getChatResponse(req: string) {
  const user_name = "punky-test";
  const promptText = getPrompt(user_name, req);
  const memory_prev = searchmemory(user_name, req);
  const {text} = await generateText({
    model: openai("neversleep/llama-3-lumimaid-8b"),// change model here
    prompt: promptText+memory_prev,
  });
  mem0msg[0].content = req;
  mem0msg[1].content = text;
  addmemory(user_name, mem0msg);
  console.log(text);
  return text;
}

export async function getResponse(message: string) {
  return getChatResponse(message);
}
