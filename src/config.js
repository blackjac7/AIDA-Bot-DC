import dotenv from "dotenv";
dotenv.config();

export const config = {
  discord: {
    token: process.env.DISCORD_TOKEN,
    prefix: "!ask",
    imagePrefix: "!image",
  },
  grok: {
    apiKey: process.env.GROK_API_KEY,
    model: "grok-beta",
    baseURL: "https://api.x.ai/v1",
  },
  image: {
    baseURL: "https://image.pollinations.ai/prompt",
    model: "flux",
    width: 1024,
    height: 1024,
  },
};
