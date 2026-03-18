import { config } from "../config.js";

/**
 * Generates an image using Pollinations.ai free API.
 * @param {string} prompt - The description of the image to generate.
 * @returns {Promise<Buffer>} A Promise that resolves to the image Buffer.
 */
export async function generateImage(prompt) {
  try {
    const encodedPrompt = encodeURIComponent(prompt);
    // Add parameters to the URL like width, height, and model to customize generation
    const url = `${config.image.baseURL}/${encodedPrompt}?width=${config.image.width}&height=${config.image.height}&model=${config.image.model}&nologo=true`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Pollinations.ai Image Service Error:", error);
    throw new Error("Failed to generate image.");
  }
}
