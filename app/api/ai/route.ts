import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
    "X-Title": process.env.YOUR_SITE_NAME, // Optional. Shows in rankings on openrouter.ai.
  }
})

export async function POST(req: Request) {
    const { messages } = await req.json();
    
    const completion = await openai.chat.completions.create({
      model: "google/gemini-flash-1.5-8b-exp",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": messages
            },
          ]
        }
      ]
    })

    const messageContent = completion.choices[0].message;
    console.log(messageContent);

    // 返回一个新的 Response 对象，包含响应体和头部
    return new Response(JSON.stringify({ message: messageContent }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } 
  

