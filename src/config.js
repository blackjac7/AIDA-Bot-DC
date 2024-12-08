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
  together: {
    apiKey: process.env.TOGETHER_API_KEY,
    model: "black-forest-labs/FLUX.1-schnell-Free",
    width: 1024,
    height: 768,
    steps: 4,
  },
};
