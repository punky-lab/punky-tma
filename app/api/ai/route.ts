import { getPrompt } from '@/lib/chat';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const baseURL = "https://openrouter.ai/api/v1";

const openai = createOpenAI({
  baseURL,
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  compatibility: "compatible",
})

export async function POST(req: Request) {
  const user_name = "punky-test";
  const { message } = await req.json();
  console.log(message);

  const promptText = getPrompt(user_name, message);

  const {text} = await generateText({
    model: openai("google/gemini-pro-1.5-exp"),
    prompt: promptText,
  });

  // 返回一个新的 Response 对象，包含响应体和头部
  return new Response(JSON.stringify({ message: text }), {
    headers: { "Content-Type": "application/json" },
  });
}
