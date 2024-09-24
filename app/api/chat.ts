const baseUrl = "https://ai-api.punky.app";

export async function getChatResponse(message: string) {
  const res = await fetch(`${baseUrl}/ai_response`, {
    method: "post",
    body: JSON.stringify({
      content: message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.reply as string;
}
