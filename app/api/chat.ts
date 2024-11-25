/*import { getPrompt } from "@/lib/chat";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";*/

/*const baseUrl = "https://ai-api.punky.app";
const gaiaNetLlamaBaseUrl = "https://llama.us.gaianet.network/v1";*/

/*const openai = createOpenAI({
  baseURL: gaiaNetLlamaBaseUrl,
  apiKey: "",
  compatibility: "compatible",
});*/

export async function getGaiaNetResponse(message: string) {
  /*const prompt = getPrompt(message);
>>>>>>> main
  const { text } = await generateText({
    model: openai("google/gemini-flash-1.5-8b-exp"),
    prompt: prompt+memory_prev,
  });
  console.log(text);
  return text;*/
  return "This chat api is deprecated"
}


export async function getChatResponse(message: string) {
  /*const res = await fetch(`/api/ai`, {
    method: "post",
    body: JSON.stringify({
      message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.message as string;*/
  return "This chat api is deprecated"
}

export async function getResponse(message: string) {
  // return getGaiaNetResponse(message);
  return "This chat api is deprecated"

}
