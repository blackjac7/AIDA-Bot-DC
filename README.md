# AIDA Bot DC

AI-Enhanced Discord Assistant (AIDA)

![Node.js CI](https://github.com/blackjac7/AIDA-Bot-DC/actions/workflows/test.yml/badge.svg)

## Description

AIDA Bot DC is an AI-enhanced Discord bot that can handle text and image commands. It uses Grok X for generating text responses and Together AI for generating images.

## Features

- Responds to text commands with AI-generated responses.
- Generates images based on user prompts.
- Supports custom prefixes for text and image commands.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/blackjac7/AIDA-Bot-DC.git
   cd AIDA-Bot-DC
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your configuration:
   ```env
   DISCORD_TOKEN=your_discord_token
   GROK_API_KEY=your_grok_api_key
   TOGETHER_API_KEY=your_together_api_key
   ```

## Usage

1. Start the bot:

   ```sh
   npm start
   ```

2. Interact with the bot on your Discord server using the configured prefixes.

## Running Tests

To run tests, use the following command:

```sh
npm test
```

## Configuration

The bot configuration is managed through the `src/config.js` file and environment variables. The following environment variables are required:

- `DISCORD_TOKEN`: Your Discord bot token.
- `GROK_API_KEY`: Your Grok API key.
- `TOGETHER_API_KEY`: Your Together AI API key.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.

```

```
