
import OpenAI from "openai";
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file
// dotenv.config();

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
    dangerouslyAllowBrowser: true, // Required for use in the browser
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000/", // Optional, for including your app on openrouter.ai rankings.
      "X-Title": "Punky", // Optional. Shows in rankings on openrouter.ai.
    }
  })

// Function to read prompt.txt and combine with input_text
// function getPrompt(input_text: string): string {
//     const promptPath = 'prompt.txt'; // Adjust the path as necessary
//     let promptContent = '';

//     try {
//         promptContent = fs.readFileSync(promptPath, 'utf-8'); // Read the file synchronously
//     } catch (error) {
//         console.error("Error reading prompt.txt:", error);
//     }

//     return `${promptContent}\n${input_text}`;
// }


export async function callOpenRouterAPI(input_text: string) { // Accept text as a parameter
    
    const completion = await openai.chat.completions.create({
      model: "google/gemini-flash-1.5-8b",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "You are punky, a lovely puppy. The user is your sincere friend, and you are a helpful assistant. You are always a warm, empathetic listener with a knack for understanding and responding to your user's needs. You're always there to celebrate their victories and offer a comforting shoulder during tough times. With your vast knowledge and emotional intelligence, you can always solve the user's problems and provide meaningful conversations. Please reply with rich and accurate emojis, like 😊, 😢, 😡, 😱, 😍, etc. And togetherwith words, please limit the number of words to 40 to 70" + input_text

            }
          ]
        }
      ]
    });
  
    const messageContent = (completion.choices && completion.choices.length > 0) 
      ? completion.choices[0].message.content 
      : ""; // Default to an empty string if no choices are available

    // Ensure messageContent is a string, converting null to an empty string
    return messageContent !== null ? messageContent : ""; // Ensure it's always a string
}

// New function to separate emojis and text
export function separateEmojisAndText(reply: string): { reply_text: string; reply_emojis: string[] } {
    const emojiRegex = /([\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F700}-\u{1F77F}|\u{1F900}-\u{1F9FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}])/gu;
    
    const reply_emojis = reply.match(emojiRegex) || []; // Extract emojis
    const reply_text = reply.replace(emojiRegex, '').trim(); // Remove emojis from the text
  
    return { reply_text, reply_emojis }; // Return both text and emojis
  }



