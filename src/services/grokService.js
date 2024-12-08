import OpenAI from "openai";
import { config } from "../config.js";

const openai = new OpenAI({
  apiKey: config.grok.apiKey,
  baseURL: config.grok.baseURL,
});

export async function generateResponse(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: config.grok.model,
      messages: [
        {
          role: "system",
          content:
            "You are AIDA, a helpful assistant. Your maximum answer length is less than 1999 characters",
        },
        { role: "user", content: prompt },
      ],
    });
    return completion.choices[0]?.message?.content || "No response available.";
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("Failed to generate response.");
  }
}
