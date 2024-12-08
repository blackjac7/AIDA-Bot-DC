import {
  Client,
  GatewayIntentBits,
  Events,
  AttachmentBuilder,
} from "discord.js";
import { config } from "./config.js";
import { generateResponse } from "./services/grokService.js";
import { generateImage } from "./services/imageService.js";
import { splitMessage, extractQuestion } from "./utils/messageHandler.js";

export class AIDABot {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
      ],
    });

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.client.once(Events.ClientReady, () => {
      console.log(`AIDA is ready! Logged in as ${this.client.user.tag}`);
    });

    this.client.on(Events.MessageCreate, async (message) => {
      if (message.author.bot) return;

      try {
        if (message.content.startsWith(config.discord.imagePrefix)) {
          await this.handleImageCommand(message);
        } else if (message.content.startsWith(config.discord.prefix)) {
          await this.handleTextCommand(message);
        }
      } catch (error) {
        console.error("Error handling message:", error);
        await message.reply("Oops! Something went wrong.");
      }
    });
  }

  async handleTextCommand(message) {
    const question = extractQuestion(message.content, config.discord.prefix);
    if (!question) return;

    await message.channel.sendTyping();
    const response = await generateResponse(question);
    const chunks = splitMessage(response);
    for (const chunk of chunks) {
      await message.reply(chunk);
    }
  }

  async handleImageCommand(message) {
    const prompt = message.content
      .slice(config.discord.imagePrefix.length)
      .trim();
    if (!prompt) {
      return message.reply("Please provide a prompt for the image.");
    }

    await message.channel.sendTyping();
    const imageBase64 = await generateImage(prompt);
    const buffer = Buffer.from(imageBase64, "base64");
    const attachment = new AttachmentBuilder(buffer, { name: "image.png" });

    await message.reply({ files: [attachment] });
  }

  async start() {
    await this.client.login(config.discord.token);
  }
}
