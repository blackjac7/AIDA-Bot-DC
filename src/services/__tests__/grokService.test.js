import { generateResponse } from "../grokService.js";

// Mocking OpenAI class properly
jest.mock("openai", () => {
  return jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: jest.fn((params) => {
            if (params.messages[1].content === "What is AI?") {
              // Simulate a successful response
              return Promise.resolve({
                choices: [
                  {
                    message: {
                      content: "AI stands for Artificial Intelligence.",
                    },
                  },
                ],
              });
            } else if (params.messages[1].content === "Unknown topic") {
              // Simulate no valid content found (default response)
              return Promise.resolve({ choices: [{}] });
            } else {
              // Simulate failure case
              return Promise.reject(new Error("Mock API Error"));
            }
          }),
        },
      },
    };
  });
});

describe("generateResponse", () => {
  const originalError = console.error;

  beforeAll(() => {
    // Mock console.error to suppress error logs during tests
    console.error = jest.fn();
  });

  afterAll(() => {
    // Restore original console.error after tests
    console.error = originalError;
  });

  it("should return a valid response from Grok X API", async () => {
    const prompt = "What is AI?";
    const response = await generateResponse(prompt);
    expect(response).toBe("AI stands for Artificial Intelligence.");
  });

  it("should return default response if content is unavailable", async () => {
    const prompt = "Unknown topic";
    const response = await generateResponse(prompt);
    expect(response).toBe("No response available.");
  });

  it("should throw an error when the API fails", async () => {
    const prompt = "Invalid input causing failure";
    // Ensure the API throws an error
    await expect(generateResponse(prompt)).rejects.toThrow(
      "Failed to generate response."
    );
  });
});
