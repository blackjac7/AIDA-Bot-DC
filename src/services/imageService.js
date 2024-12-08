import Together from "together-ai";
import { config } from "../config.js";

const together = new Together({ apiKey: config.together.apiKey });

export async function generateImage(prompt) {
  try {
    const response = await together.images.create({
      model: config.together.model,
      prompt,
      width: config.together.width,
      height: config.together.height,
      steps: config.together.steps,
      n: 1,
      response_format: "b64_json",
    });
    return response.data[0].b64_json;
  } catch (error) {
    console.error("Together AI Error:", error);
    throw new Error("Failed to generate image.");
  }
}
